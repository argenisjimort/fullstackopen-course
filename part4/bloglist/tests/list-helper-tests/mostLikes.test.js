const {test, describe} = require(`node:test`)
const assert = require(`node:assert`)

const blogs = require(`../tests-helper.js`).dummyBlogs;
const mostLikes = require(`../../utils/list_helper`).mostLikes;

describe(`TESTS for mostLikes function`, ()=> {
    test(`empty array should retun null`, ()=>{
        assert.strictEqual( mostLikes([]), null )
    })

    test(`one object should return same `, () => {
        assert.deepStrictEqual( mostLikes([blogs[0]]), { author: "Michael Chan", likes: 7})
    })

    test(`array of blogs should return sum all the blogs and check`, () => {
        assert.deepStrictEqual( mostLikes(blogs), {author: `Edsger W. Dijkstra`, likes: 17})
    })

})