import { create } from 'zustand'
import blogService from '../services/blogs'
import blogs from '../services/blogs'



export const useBlogsStore = create( (set, get) => ({
    blogs: [],
    getBlogs: async () => {
        
        const blogsFromService = await blogService.getAll()
        set({ blogs: blogsFromService })

        //set({ blogs: blogsFromService }) //already uses shallow-merges
        //so its the same as:
        // set( state => ({
        //     ...state,
        //     blogs: sortedBlogs
        // }) )
    },
    likeBlog: async (id) => {
        const blogToLike = get().blogs.find( blog => blog.id === id )
        const res = await blogService.addLike(blogToLike, blogToLike.likes)

        const newArray = get().blogs.map( blog =>
            blog.id === res.id ? res : blog
        )

        set({ blogs: newArray })

    },
    addBlog: async (title, author, url, loggedUser) => {
        try {
            const response = await blogService.create({ title, author, url }, loggedUser.loginToken)
            set({ blogs: [...get().blogs, response] })
        } catch (error) {
            console.error(error)
            throw error
            
        }

        // const response = await blogService.create({ title, author, url }, loggedUser.loginToken)
        // set({ blogs: [...get().blogs, response] })
        
    },
    commentBlog: async (id, comment) => {
        console.log(id, comment);
        const blogToComment = get().blogs.find( blog => blog.id === id )
        console.log(blogToComment);
        const responseBlog = await blogService.addComment(blogToComment, comment)
        const newArray = get().blogs.map(
            blog => blog.id === responseBlog.id ? responseBlog : blog )
        
        set({ blogs: newArray })
    }
}) )