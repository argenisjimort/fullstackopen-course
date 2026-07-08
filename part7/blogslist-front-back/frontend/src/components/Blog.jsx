import { useState, useImperativeHandle } from 'react'
import TogglableVisibility from './TogglableVisibility'
import blogService from './../services/blogs'
import { useBlogsStore } from '../store/blogsStore'
import { useMessagePrintStore } from '../store/messagePrintStore'
import { Link } from 'react-router-dom'

const Blog = ({ blog, loggedUser, blogs, }) => {
    //console.log(blog)
    const [isAllInfoVisible, setIsAllInfoVisible] = useState(false)
    //const [likes, setLikes] = useState(blog.likes)
    //const likes = useBlogsStore(state => state.blogs)
    const likeBlog = useBlogsStore(state => state.likeBlog)
    const printStatusMessage = useMessagePrintStore( status => status.printStatusMessage )


    const toggleShowAllInfo = () => {
        setIsAllInfoVisible(!isAllInfoVisible)
    }


    const handleLike = async () => {

        try {
            // const response = await blogService.addLike(blog, likes)
            // console.log(response)
            // console.log('LIKE GIVEN')
            // setLikes(response.likes)


            //this checks for the blog passed as a parameter to this component
            // if its not the one (id is different) it returns the same object
            //If it is the same ID (same blog then), it returns the response received
            //by the service called to submit a like
            
            // setBlogs(blogs.map(b =>
            //     b.id === blog.id ? response : b
            // ))


            likeBlog(blog.id)



        } catch (error) {
            const message = error.response?.data?.error || error.message || 'error when adding like'
            printStatusMessage(message)
            console.error(message)
        }
    }


    const handleDelete = async () => {

        if (!window.confirm(`are you sure that you wanna delete the blog "${blog.title}" ? `)) return


        try {
            await blogService.deleteBlog(blog, loggedUser.loginToken)
            setBlogs(blogs.filter(currentBlog => currentBlog.id !== blog.id))
        } catch (error) {
            const message = error.response?.data?.error || error.message || 'error when adding like'
            printStatusMessage(message)
            console.error(message)
        }
    }



    // useImperativeHandle(props.ref, () => ({likes}))



    return (
        <div className='blog'>

            <p className='title'>{blog.title}</p>
            <p className='author' >{blog.author}</p>
            <button className='button tertiary-button' onClick={toggleShowAllInfo}> { isAllInfoVisible ? 'Hide' : 'View' } </button>

            {isAllInfoVisible && (
                <div className='seconday-info'>

                    <p>Url: {blog.url}</p>
                    <p>Likes: {blog.likes}</p>
                    <button className='button like-button' onClick={handleLike}>Like</button>
                    <button className='button secondary-button' onClick={handleDelete}>DELETE</button>
                    <Link to={`./${blog.id}`} className='button secondary-button'>Go to Blog</Link>
                </div>
            )}
        </div>
    )
}

export default Blog