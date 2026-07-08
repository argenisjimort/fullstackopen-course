//COMPONETS
import CreateBlogForm from '../components/CreateBlogForm'
import TogglableVisibility from '../components/TogglableVisibility'
import BlogList from '../components/BlogList'

import { useEffect, useRef } from 'react'

//STORES
import { useLoggedUserStore } from '../store/loggedUserStore'
import { useBlogsStore } from '../store/blogsStore'


const Home = () => {

    const toggleVisibilityRef = useRef()
    const likeRef = useRef()

    const loggedUser = useLoggedUserStore(state => state.loggedUser)
    const logOut = useLoggedUserStore(state => state.logOut)

    const blogs = useBlogsStore(state => state.blogs)
    const getBlogs = useBlogsStore(state => state.getBlogs)



    useEffect(() => {
        getBlogs()
    }, [])



    //discovered .sort mutates the original array, and I wanna keep the original
    //const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    //so I do [..blogs] I spread the array onto another array
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)




    return (
        <div className='general-content-wrapper' >
            <div className='content' >

                <p>{loggedUser.name} is logged in</p>
                <button className='button' onClick={logOut}>Log Out</button>
                <hr />
                
                <h2>blogs</h2>


                {/*sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} loggedUser={loggedUser} handleStatusMessagePrint={handleStatusMessagePrint} />)*/}
                <BlogList blogs={sortedBlogs} />

            </div>
        </div>
    )
}


export default Home