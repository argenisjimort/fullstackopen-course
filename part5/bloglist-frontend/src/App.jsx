import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import TogglableVisibility from './components/TogglableVisibility'



const App = () => {
    const [blogs, setBlogs] = useState([])
    const [loggedUser, setLoggedUser] = useState(null)
    const [statusMessage, setStatusMessage] = useState('')


    const handleStatusMessagePrint = (message) => {
        setStatusMessage(message)
        setTimeout(() => setStatusMessage(''), 5000)
    }



    const handleLogOut = () => {
        setLoggedUser(null)
        window.localStorage.removeItem('loggedUser')
    }


    const toggleVisibilityRef = useRef()
    const likeRef = useRef()


    useEffect(() => {
        blogService.getAll().then(blogs => {
            // blogs.sort((a, b) =>  b.likes - a.likes)
            setBlogs(blogs)
        })

        const localStorageUser = window.localStorage.getItem('loggedUser')
        if (localStorageUser) setLoggedUser(JSON.parse(localStorageUser))

    }, [])


    const sortedBlogs = blogs.sort((a, b) =>  b.likes - a.likes)

    return (
        <div>
            {statusMessage && <p>{statusMessage}</p>}
            {!loggedUser && <LoginForm setLoggedUser={setLoggedUser} handleStatusMessagePrint={handleStatusMessagePrint} />}
            {loggedUser && (
                <div>


                    <TogglableVisibility buttonLabel='Create New Blog' ref={toggleVisibilityRef}>
                        <CreateBlogForm blogs={blogs} setBlogs={setBlogs} handleStatusMessagePrint={handleStatusMessagePrint} loggedUser={loggedUser} toggleVisibility={() => toggleVisibilityRef.current.toggleVisibility()} />
                    </TogglableVisibility>


                    <h2>blogs</h2>
                    <p>{loggedUser.name} is logged in</p>
                    <button onClick={handleLogOut}>Log Out</button>


                    {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} loggedUser={loggedUser} handleStatusMessagePrint={handleStatusMessagePrint} />)}

                </div>
            )}


        </div>
    )
}

export default App