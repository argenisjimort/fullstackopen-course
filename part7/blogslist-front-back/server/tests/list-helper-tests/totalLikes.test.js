const {test, describe} = require(`node:test`);
const assert = require(`node:assert`);

const totalLikes = require(`../../utils/list_helper`).totalLikes;

describe(`TESTING of 'totalLikes`, () => {


    test(`for an empty array, return 0`, ()=>{
        assert.strictEqual( totalLikes([]), 0 );
    })
    
    
    test(`for one blog, return its likes (777)`, ()=>{
        const blog = {likes: 777}
        assert.strictEqual( totalLikes( [blog] ), 777 );
    })


    test(`sum and return all likes (777)`, ()=>{
        const blogs = [
            {likes:7}, {likes:70}, {likes:700}
        ] //array of 'blogs', with 3 items, with likes each
        
        assert.strictEqual( totalLikes(blogs), 777 );
    })
})