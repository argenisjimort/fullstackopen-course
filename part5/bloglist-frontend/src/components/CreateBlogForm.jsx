import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ handleStatusMessagePrint, loggedUser, toggleVisibility, blogs, setBlogs }) => {


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')



    const handleBlogCreation = async (event) => {
        event.preventDefault()
        try {
            const response = await blogService.create({ title, author, url }, loggedUser.loginToken)
            //the service will already return the response.data (body) so the response is only the body on the response
            //console.log(`this shoudl print only it gets past the post request`)
            handleStatusMessagePrint(`New blog '${title}' Created`)
            setBlogs( blogs.concat( response ) )
            setTitle('')
            setAuthor('')
            setUrl('')
            toggleVisibility()
        } catch (error) {
            const message = error.response?.data?.error || error.message || 'Login failed'
            handleStatusMessagePrint(message)
            console.error(message)
        }
    }

    return (
        <form onSubmit={handleBlogCreation}>
            <label>Title<input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
            <label>Author<input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></label>
            <label>Url<input type="text" value={url} onChange={e => setUrl(e.target.value)} /></label>
            <button type="submit">Submit Blog</button>
        </form>
    )
}

export default CreateBlogForm