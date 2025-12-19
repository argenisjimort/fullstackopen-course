const { test, describe } = require(`node:test`);
const assert = require(`node:assert`);

const favoriteBlog = require(`../../utils/list_helper`).favoriteBlog;

const blogs = require(`../tests-helper.js`).dummyBlogs;


describe(`TESTS FOR 'favoriteBlog'`, () => {
    test(`for empty array return null`, () => {
        assert.strictEqual(favoriteBlog([]), null);
    })

    test(`for one blog return that one blog`, () => {

        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]


        assert.deepStrictEqual(favoriteBlog(blogs), blogs[0]);
    })


    test(`for several, should return the one with most likes`, () => {

        const mostLikedblog =
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        assert.deepStrictEqual(favoriteBlog(blogs), mostLikedblog);
    })
})



