import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import { expect } from 'vitest'

const dummyBlog = {
    title: 'dummy title',
    author: 'dummy author',
    url: 'dummy url',
    likes: 777
}


test('blog shoudl render title and author, but not url nor likes', () => {
    const {container} = render( <Blog blog={dummyBlog}/> )
    const blog = container.querySelector('.blog')
    const titleAndAuthor = blog.querySelector('.title-author')
    const secondayInfo = blog.querySelector('.seconday-info')

    expect(titleAndAuthor).toBeVisible()
    expect(secondayInfo).not.toBeInTheDocument()

})



// Make a test, which checks that the blog's URL
// and number of likes are shown when the button controlling
// the shown details has been clicked.


test('likes and url should be visible when it is toggled', async () => {
    
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    
    const {container} = render( <Blog blog={dummyBlog}/> )
    const blog = container.querySelector('.blog')
    const titleAndAuthor = blog.querySelector('.title-author')
    const button = container.querySelector('button')

    await user.click(button)
    const secondayInfo = blog.querySelector('.seconday-info')


    expect(titleAndAuthor).toBeVisible()
    expect(secondayInfo).toBeVisible()

})




// Make a test, which ensures that if the like button is clicked twice,
// the event handler the component received as props is called twice.

//on this componenr I dont pass the like funciton. (it is on the component itself)
// but the like function calls the
// handleStatusMessagePrint whihc is passed by app.js
//so this is the best way I have to test it without changing the structure of
//the component
test('clikc like button calls the funfciton twice', async () => {
    
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    
    const {container} = render( <Blog blog={dummyBlog} handleStatusMessagePrint={mockHandler}/> )
    const blog = container.querySelector('.blog')
    const titleAndAuthor = blog.querySelector('.title-author')
    const button = container.querySelector('button')

    await user.click(button)
    const secondayInfo = blog.querySelector('.seconday-info')

    const likeButton = secondayInfo.querySelector('.like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})







//Make a test for the new blog form.
// The test should check, that the form calls the event handler it received
// as props with the right details when a new blog is created.


//on this componenr I dont pass the like funciton. (it is on the component itself)
// but the like function calls the
// handleStatusMessagePrint whihc is passed by app.js
//so this is the best way I have to test it without changing the structure of
//the component
test('cliking submit button calls the function', async () => {
    
    const mockHandler = vi.fn()
    const user = userEvent.setup()
    
    const {container} = render( <CreateBlogForm handleStatusMessagePrint={mockHandler}/> )
    const button = container.querySelector('button')

    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)

})