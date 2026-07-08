import axios from 'axios'
import { blogsApiUrl } from '../utils/config'




// const getAll = () => { //this function doesnt need async
//     const request = axios.get(blogsApiUrl)
//     return request.then(response => response.data)
// } //bc it uses .then

const getAll = async () => {
    const request = await axios.get(blogsApiUrl)
    return request.data
}

const create = async (blogToCreate, loginToken) => {
    console.log('login token', loginToken)
    const config = {
        headers: {
            Authorization: `Bearer ${loginToken}`
        }
    }

    //console.log(config)


    const response = await axios.post(blogsApiUrl, blogToCreate, config) //if status >= 400 it throws an error and stops executing the rest of the function
    return response.data
}


const addLike = async (blog, receivedLikes) => {
    //console.log(receivedLikes)
    const response = await axios.put(`${blogsApiUrl}/${blog.id}`, { likes: receivedLikes+1 })
    return response.data
}

const addComment = async (blog,  comment) => {
    //POST api/blogs/:id/comments
    const response = await axios.post(`${blogsApiUrl}/${blog.id}/comments`, {comment: comment})
    //console.log(response)
    return response.data
}

const deleteBlog = async (blog, loginToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${loginToken}`
        }
    }
    const response = await axios.delete(`${blogsApiUrl}/${blog.id}`, config)
    return response
}



export default { getAll, create, addLike, addComment, deleteBlog }