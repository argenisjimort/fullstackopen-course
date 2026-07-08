const { test, describe, after, beforeEach } = require(`node:test`);
const assert = require(`node:assert`);
const User = require(`../../models/User`);
const mongoose = require(`mongoose`);
const testsHelper = require(`../tests-helper`);
const usersApiURl = testsHelper.usersApiURl;

const app = require(`../../app`);
const supertest = require("supertest");
const testApi = supertest(app);

console.log(`AT users-api.test.js`)


const [creationTemplate, ...usersToAdd] = testsHelper.usersToAddBeforeTests;


describe(`TESTs FOR users ON API`, () => {

    beforeEach(async () => {
        await User.deleteMany({});
        // await testsHelper.usersToAddBeforeTests.forEach( (user) => {
        //     testApi.post(usersApiURl).send(user);
        // }) this doesnt work bc await doesnt work with forEach

        //it has to be with map() instead of forEach, because forEach doesnt return anything by default
        //map returns an item. and in this case it return the response of que request
        //and adds it onto an array of promises that then promise.all check if its fulfilled
        await Promise.all(usersToAdd.map(user => testApi.post(usersApiURl).send(user)))
        //it needs to has the password (the hashing is made on the router)
        //so I didnt use sUser.insertMany(since that byPasses the hashing of the password)


        await Promise.all(testsHelper.dummyBlogs.map(blog => testApi.post(testsHelper.blogsApiUrl).send({
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        })))
    })


    test(`get Users`, async () => {
        const response = await testApi.get(usersApiURl).expect(200);
        
        //show the response and nested blogs
        //console.log(JSON.stringify(response.body, null, 2))
    })

    test(`test Creating a user`, async () => {
        const response = await testApi
            .post(usersApiURl)
            .send(creationTemplate);

        assert.strictEqual(response.status, 201);

    })

    test(`add a user and then confirm user its indeed on the collection making a get request`, async () => {
        await testApi.post(usersApiURl).send(creationTemplate);
        const response = await testApi.get(usersApiURl);

        //console.log(response.body)

        const usersInfo = response.body.map(user => ({ name: user.name, username: user.username }));
        //console.log(usersInfo)

        //just confirm the on the users on the databse
        //if there is one with the same username
        //as the one created on the test.
        assert(usersInfo.some(user => user.username === creationTemplate.username));
        //(since usernames are unique there shouldnt be one beforehand)
    })


    test(`missing username should return error 400`, async () => {
        const { username, ...remainingInfo } = creationTemplate;
        //console.log(remainingInfo);
        const response = await testApi
            .post(usersApiURl)
            .send(remainingInfo)

        assert.strictEqual(response.status, 400);
    })



    test(`missing name should return error 400`, async () => {
        const { name, ...remainingInfo } = creationTemplate;
        //console.log(remainingInfo);
        const response = await testApi
            .post(usersApiURl)
            .send(remainingInfo)

        assert.strictEqual(response.status, 400);
    })


    test(`creating user with username length < 3 should return error 400`, async () => {
        const { username, ...infoToInclude } = creationTemplate;
        const response = await testApi
            .post(usersApiURl)
            .send({ ...infoToInclude, username: `j2` })

        assert.strictEqual(response.status, 400);
    })

    test(`creating user with password length < 3 should return error 400`, async () => {
        const { password, ...infoToInclude } = creationTemplate;
        const response = await testApi
            .post(usersApiURl)
            .send({ ...infoToInclude, password: `j2` })

        assert.strictEqual(response.status, 400); //you can do more that 1 assertion per test :O
        assert.strictEqual(response.body.error, `password needs be at least 3 characters long`);


    })



})

after(async () => {
    await mongoose.connection.close();
})