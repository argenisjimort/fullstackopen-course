import { Link, useParams } from "react-router-dom"
import { useBlogsStore } from "../store/blogsStore"
import { useEffect } from "react"
import { useField } from "../hooks/useField"

const SingleBlogPage = () => {

    const { id } = useParams()
    const blogs = useBlogsStore(state => state.blogs)
    const getBlogs = useBlogsStore(state => state.getBlogs)
    const likeBlog = useBlogsStore(state => state.likeBlog)
    const commentBlog = useBlogsStore(state => state.commentBlog)
    const commentField = useField('')

    const blog = blogs.find(blog => blog.id === id)


    useEffect(() => {
        getBlogs()
    }, [])

    return (
        <div className='general-content-wrapper'>

            <div className='content'>

                {blog && //if blog exists
                    <div>
                        <h2> {blog.title} </h2>
                        <h5> by: {blog.author} </h5>
                        <Link to={blog.url}>{blog.url}</Link>
                        <p> {blog.likes} LIKES </p>
                        <button className='button' onClick={() => likeBlog(blog.id)} >LIKE</button>
                        <br />
                        <h4>Comments:</h4>
                        <input {...commentField} />
                        <button className='button' onClick={() => commentBlog(blog.id, commentField.value)}>Add Comment</button>
                        
                        <ul>
                            {blog.comments.map((comment, index) => <li key={index} > {comment} </li>)}
                        </ul>
                    </div>}

            </div>
        </div>
    )
}


export default SingleBlogPage