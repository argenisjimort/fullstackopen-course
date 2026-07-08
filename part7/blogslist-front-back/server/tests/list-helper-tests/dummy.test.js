const {test, describe} = require(`node:test`);
const assert = require(`node:assert`);

const list_helper = require(`../../utils/list_helper`)

describe(`TESTING OF: 'dummy'`, () => {
    test( `Empty arrary should return 1`, () => {
        const blogs = [];
        assert.strictEqual( list_helper.dummy(blogs), 1)
        //.trying to assert dummy([]) to 1
    } )
})