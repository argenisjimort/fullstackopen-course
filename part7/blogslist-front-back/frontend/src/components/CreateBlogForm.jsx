import { useState } from 'react'
import blogService from '../services/blogs'
import { useMessagePrintStore } from '../store/messagePrintStore'
import { useBlogsStore } from '../store/blogsStore'
import { useLoggedUserStore } from '../store/loggedUserStore'

const CreateBlogForm = () => {


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const printStatusMessage = useMessagePrintStore(status => status.printStatusMessage )
    const addBlog = useBlogsStore(state => state.addBlog)
    const loggedUser = useLoggedUserStore(state => state.loggedUser)

    const handleBlogCreation = async (event) => {
        event.preventDefault()

        try {
            await addBlog(title, author, url, loggedUser)
            printStatusMessage("added, I think")
        } catch (error) {
            printStatusMessage(error.message)
        }


        // try {
        //     //const response = await blogService.create({ title, author, url }, loggedUser.loginToken)
        //     //the service will already return the response.data (body) so the response is only the body on the response
        //     //console.log(`this shoudl print only it gets past the post request`)
        //     printStatusMessage(`New blog '${title}' Created`)
        //     //setBlogs( blogs.concat( response ) )
            
        //     setTitle('')
        //     setAuthor('')
        //     setUrl('')
        //     toggleVisibility()
        // } catch (error) {
        //     const message = error.response?.data?.error || error.message || 'Login failed'
        //     printStatusMessage(message)
        //     console.error(message)
        // }
    }

    return (
        <form onSubmit={handleBlogCreation}>
            <label>Title<input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
            <label>Author<input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></label>
            <label>Url<input type="text" value={url} onChange={e => setUrl(e.target.value)} /></label>
            <button className='button' type="submit">Submit Blog</button>
        </form>
    )
}

export default CreateBlogForm