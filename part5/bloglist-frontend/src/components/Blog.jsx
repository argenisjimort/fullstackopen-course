import { useState, useImperativeHandle } from 'react'
import TogglableVisibility from './TogglableVisibility'
import blogService from './../services/blogs'


const Blog = ({ handleStatusMessagePrint, blog, loggedUser, blogs, setBlogs }) => {
    //console.log(blog)
    const [isAllInfoVisible, setIsAllInfoVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)




    const toggleShowAllInfo = () => {
        setIsAllInfoVisible(!isAllInfoVisible)
    }


    const handleLike = async () => {

        try {
            const response = await blogService.addLike(blog, likes)
            console.log(response)
            console.log('LIKE GIVEN')
            setLikes(response.likes)


            //this checks for the blog passed as a parameter to this component
            // if its not the one (id is different) it returns the same object
            //If it is the same ID (same blog then), it returns the response received
            //by the service called to submit a like
            
            setBlogs(blogs.map(b =>
                b.id === blog.id ? response : b
            ))




        } catch (error) {
            const message = error.response?.data?.error || error.message || 'error when adding like'
            handleStatusMessagePrint(message)
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
            handleStatusMessagePrint(message)
            console.error(message)
        }
    }



    // useImperativeHandle(props.ref, () => ({likes}))



    return (
        <div className='blog'>

            <p className='title-author'>{blog.title} - {blog.author}</p>
            <button onClick={toggleShowAllInfo}>view</button>

            {isAllInfoVisible && (
                <div className='seconday-info'>

                    <p>Url: {blog.url}</p>
                    <p>Likes: {likes}</p>
                    <button className='like-button' onClick={handleLike}>Like</button>
                    <button onClick={handleDelete}>DELETE</button>
                </div>
            )}
        </div>
    )
}

export default Blog