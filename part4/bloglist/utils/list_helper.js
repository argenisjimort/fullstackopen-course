const _ = require(`lodash`)

const dummy = (blogs) => {
    return 1;
}


const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0

    //const likesArray = blogs.map( (blog)=> blog.likes  );
    //return likesArray.reduce( (sum, item)=> sum+item, 0 );


    //'sum' its an 'accumulator'
    //'blog' is the instance of each 'blog' on the array 'blogs'
    //it will iterate in each one of them (like how .map() would)
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}



const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    //use reduce, then the nested function takes each item,
    //compares it to the current 'max' if bigger, return that blog
    //and that blog will be 'max' on the next iteration
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
    //also, there is no 'start' parameter defined. (like previously with the '0')
    //so max will be the 1st item, on the array,
    //and then it will start comparing it ot the second item
}

// Define a function called mostBlogs that receives an array of blogs as a parameter.
// The function returns the author who has the largest amount of blogs.
// The return value also contains the number of blogs the top author has:


// {
//     author: "Robert C. Martin",
//     blogs: 3
// }

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    //saves an array of the authors name, with the amount of times it appears
    //ex = counts = { robert: 3, pedro: 7, juan: 2 }
    const counts = _.countBy(blogs, (blog) => blog.author); //and it does so for this part (blog) => blog.author)
    //it it counts on the array blogs, how many certai thing the other function returns appears
    //since (blog) => blog.author return the authors name, on every iteration
    //it compares the instances the blog.author appears. and returns an object like so:

    // {
    //     'Michael Chan': 1,
    //     'Edsger W. Dijkstra': 2,
    //     'Robert C. Martin': 3
    //   }

    //Object.entries takes this object and turns it into an  array, with arrays inside
    //that countain the pairs of the obejcts contents [ ['AuthorName', 7], ['author2name'], 5, ...etc ]

    //then _.maxBy takes first an array (this is what Object.entries is for)
    //and then it just comapares what is returned by the function, in this case: ([_, blogs]) => blogs
    //it just de-structres the array into 2 variables [_, blogs]
    //it is done with '[]' to destructure arrays you put the variables in the other they are ex: [name, blogs]
    //with objects you do { parameterName, secondParameter }, the order doesnst matter
    const [maxAuthor, maxBlogs] = _.maxBy(Object.entries(counts), ([_, blogs]) => blogs)
    //so it returns an array possition (which is also an array) ex [author, nBLogs]
    //but we gotta return an object instead, not an array

    // thats why it was de-structed above, and just return a created object with that info
    return { author: maxAuthor, blogs: maxBlogs }; //also, gotta out the parameter name
    //otherwise it uses the variable name as the parameter name ex { maxAuthor: 'authorname' }
}



// Define a function called mostLikes that receives an array of blogs as its parameter.
// The function returns the author whose blog posts have the largest amount of likes.
// The return value also contains the total number of likes that the author has received:

// {
//     author: "Edsger W. Dijkstra",
//     likes: 17
// }

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    // const mostLikedPost = _.maxBy(blogs, (blog) => blog.likes ); //get the blog with most likes
    // return { author: mostLikedPost.author, likes: mostLikedPost.likes } //restructure it into an object

    //actually I think it needs to return the total of likes, on all blogs, otherwise its too easy

    /////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    ///////// TEMPLATE OF WHAT '_.groupBy() does ////////////
    // {
    //     'blue': [
    //       { name: 'jim', color: 'blue', age: 22 },
    //       { name: 'Sam', color: 'blue', age: 33 }
    //     ],
    //     'green': [
    //       { name: 'eddie', color: 'green', age: 77 }
    //     ]
    //   }

    const authorsGroups = _.groupBy(blogs, (blog) => blog.author);


    //Objct entries will turn in into an array with arrays' pairs
    //ex: [ ['blue', [{ name: 'jim', color: 'blue', age: 22 }] ]  ]
    const [mostLikedAuthorName, blogsList] = _.maxBy(Object.entries(authorsGroups), ([authorGroupName, blogs]) => _.sumBy(blogs, 'likes'))

    //since authorsGroup was turned with "object.entries" then the returned item is not in the original structure, but an array pair
    // [ 'authorName', [ {likes: 1}, {likes: 3}, {likes: 2} ] ]
    // first item on the array is the author name, the sond one the array of the blogs of the author
    //thats why it is de-strcuted into [mostLikedAuthorName, blogsList] 
    //its cleaner that referencing mostLikedAuthor[0], mostLikedAuthor[1]

    //console.log( `printing out mostLikedAuthor array pair goven by Object entries\n`, mostLikedAuthor );

    return { author: mostLikedAuthorName, likes: _.sumBy(blogsList, 'likes') }

}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }