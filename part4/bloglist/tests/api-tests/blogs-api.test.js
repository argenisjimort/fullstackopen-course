const { test, describe, after, beforeEach } = require(`node:test`);
const assert = require(`node:assert`);

const mongoose = require("mongoose");
const testsHelper = require(`../tests-helper`);
const Blog = require(`../../models/Blog`);
const User = require(`../../models/User`)
const testHelper = require(`../tests-helper`)

const supertest = require(`supertest`);
const app = require(`../../app`);

const testApi = supertest(app);


const usersApiURl = testHelper.usersApiURl;
const blogsApiUrl = testHelper.blogsApiUrl; //in oder not to the repeat the url too much
//also, if at one point you gotta change it, this will be easier
//also It could be asined to an external variable is thats needed in the future

const blogCreationTemplate = {
    "title": "Libro nuevo",
    "author": "Capitan de Navio",
    "url": "https://google.com",
    "likes": 800
}


describe(`TESTS FOR blogs onAPI: `, () => {

    beforeEach(async () => { //initialize the database
        await Blog.deleteMany({})//clear the database
        await Promise.all( testHelper.usersToAddBeforeTests.map(user => testApi.post(usersApiURl).send(user) ))

        //await Blog.insertMany(testsHelper.dummyBlogs)//same as iterating over the array and doing .save() for each item
        await Promise.all(testsHelper.dummyBlogs.map( blog => testApi.post(blogsApiUrl).send({
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        }) ))




    })
    
    
    test(`GET to API should return peoper amount of notes, and JSON format`, async () => {
        const response = await testApi
        .get(blogsApiUrl)
        .expect(200)
        .expect('Content-type', /application\/json/)


        //console.log(response.body)
        assert.strictEqual(response.body.length, testsHelper.dummyBlogs.length);
    })
    
    test(`returned object has 'id' and  not '_id'`, async () => {
        const response = await testApi.get(blogsApiUrl);
        const oneBlog = response.body[0]; //this is already JSON, since the blogRouter returns JSON  when you make a GET petition
        //console.log( 'RESPONSE body object #1:\n', oneBlog ) //just to check the item

        
        //assert.strictEqual(Object.hasOwn(oneBlog, 'id'), true);
        //assert.strictEqual(Object.hasOwn(oneBlog, '_id'), false);

        assert(Object.hasOwn(oneBlog, `id`));
        assert(!Object.hasOwn(oneBlog, `_id`)); //the same as above, with without comparing to true
    })
    
    test(`ensure making post request makes the items amount be +1 of the original length`, async () => {
        const addResponse = await testApi
            .post(blogsApiUrl)
            .send(blogCreationTemplate)
            .expect(201) //to confirm its added

        //console.log(addResponse)
        
        const getResponse = await testApi.get(blogsApiUrl);
        
        //console.log( getResponse.body );
        //console.log( getResponse.body.length );
        assert.strictEqual(getResponse.body.length, testsHelper.dummyBlogs.length + 1);
        
        
    })
    
    
    test(`make sure if likes property is missing, the likes will default to 0`, async () => {
        const postResponse = await testApi
        .post(blogsApiUrl)
        .send({
            "title": "Libro nuevo",
            "author": "Capitan de Navio",
            "url": "https://google.com"
        })
        .expect(201)

        //console.log(postResponse.body)
        assert.strictEqual(postResponse.body.likes, 0);
        
    })
    
    test(`ensure missing 'title' propery will throw error 400`, async () => {
        const response = await testApi
        .post(blogsApiUrl)
        .send({
            "author": "Capitan de Navio",
            "url": "https://google.com"
        })
        
        assert.strictEqual( response.status, 400 )
        
    } )
    
    
    test(`Delete by ID should return status 204, and confirm length`, async () => {
        await testApi
        .delete(`${blogsApiUrl}/${testsHelper.dummyBlogs[0]._id}`)
        .expect(204)
        
        const response = await testApi.get(blogsApiUrl);
        assert(response.body.length, testsHelper.dummyBlogs.length -1 )
    })
    
    test(`editing 'likes' on a blog, expect 200 and compare likes`, async () => {
        const oneBlog = await Blog.findOne({});

        const response = await testApi
        .put(`${blogsApiUrl}/${oneBlog._id}`)
        .send({likes: 776})
        .expect(200)
        
        assert.strictEqual( response.body.likes, 776 )
        
        //this doesnt work bc the item return was transformed to JSON,
        //therefore doesnt have _id but id, and doesnt have __v
        //assert.deepStrictEqual(response.body, {...testsHelper.dummyBlogs[5], likes: 776})
    })

    test(`adding a blog will give it an ID`, async () => {
        const response = await testApi.post(blogsApiUrl).send(blogCreationTemplate);
        assert(response.body.user)
    })
    
})


//gotta comment it out, otherwise the connection will be closed for the next tests
after(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    // await Blog.create({ //deleting everything and adding just one blog (just because)
    //     "title": "El único libro",
    //     "author": "Capitan de Navio",
    //     "url": "https://google.com",
    //     "likes": 800
    // })

    await testApi
        .post(blogsApiUrl)
        .send({ //deleting everything and adding just one blog (just because)
                "title": "El único libro",
                "author": "Capitan de Navio",
                "url": "https://google.com",
                "likes": 800
            })
    await mongoose.connection.close();
})


