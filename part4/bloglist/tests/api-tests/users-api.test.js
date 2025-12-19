const { test, describe, after, beforeEach } = require(`node:test`);
const assert = require(`node:assert`);
const User = require(`../../models/User`);

const app = require(`../../app`);
const supertest = require("supertest");
const testApi = supertest(app);
const usersApiURl = `/api/users`;

console.log(`AT users-api.test.js`)

describe(`TESTs FOR users ON API`, () => {


    test(`test Creating a user`, async () => {
        const response = await testApi
            .post(usersApiURl)
            .send({
                username: `justAnUsername`,
                name: `Capitan de Navio`,
                password: `justAPassword`
        });

        console.log(response.status);
        console.log(response.body);

        assert.strictEqual(response.status, 201);

    })



})