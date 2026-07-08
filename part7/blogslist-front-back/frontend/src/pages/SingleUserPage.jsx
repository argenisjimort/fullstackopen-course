import { useParams } from 'react-router-dom'
import { useUsersStore } from '../store/usersStore'
import { useBlogsStore } from '../store/blogsStore'
import { useEffect, useState } from 'react'

const SingleUserPage = () => {

    const { id } = useParams()
    const users = useUsersStore(state => state.users)
    const getUsers = useUsersStore(state => state.getUsers)
    const blogs = useBlogsStore(state => state.blogs)
    const getBlogs = useBlogsStore(state => state.getBlogs)

    //const [userBlogs, setUserBlogs] = useState([])

    //console.log(users)
    //console.log(blogs)


    const theOneUser = users.find(users => users.id === id)
    //console.log(theOneUser)
    //if (theOneUser) console.log(theOneUser.blogs)
    //.blogs only contains the ID of the blogs
    //not the full blog themselves


    // if( blogs && theOneUser ) {
    //     const found = blogs.filter( blog => theOneUser.blogs.includes(blog.id) )
    //     setUserBlogs(found)
    // }

    useEffect(() => {
        getUsers()
        getBlogs()
    }, [])


    return (
        <div className='general-content-wrapper'>

            <div className='content'>
                {theOneUser && (<div>
                    <h2> {theOneUser.name} </h2>
                    <h3> added blogs: </h3>
                    <ul>
                        {blogs.map(blog => {
                            if (theOneUser.blogs.includes(blog.id)) return <li key={blog.id} > {blog.title} </li>
                        })}
                    </ul>
                </div>)}
            </div>
        </div>
    )
}


export default SingleUserPage