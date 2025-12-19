const {test, describe} = require(`node:test`);
const assert = require(`node:assert`);
const mostBlogs = require(`../../utils/list_helper`).mostBlogs;

const dummyBlogs = require(`../tests-helper`).dummyBlogs;

describe(`TESTS FOR 'mostBLogs'`, ()=>{
    test(`empty array should return null`, ()=>{
        assert.strictEqual( mostBlogs([]), null )
    });


    test(`one item should return info of that one item`, ()=> {
        assert.deepStrictEqual(mostBlogs([dummyBlogs[0]]), {author: `Michael Chan`, blogs:1})
    })
    test(`whole should return Robert C`, ()=> {
        assert.deepStrictEqual( mostBlogs(dummyBlogs), {author: `Robert C. Martin`, blogs: 3} );
    });
})