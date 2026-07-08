import Blog from "./Blog"

const BlogList = ({blogs}) => {

    //console.log(blogs)

    return (
        <div>
            {blogs.map(blog => (
                //<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} loggedUser={loggedUser} handleStatusMessagePrint={handleStatusMessagePrint} />
                <Blog key={blog.id} blog={blog} blogs={blogs} />
            ))}
        </div>
    )
}


export default BlogList