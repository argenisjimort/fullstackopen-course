const login = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)

    page.getByRole('button', { name: 'Log-In' }).click()



    // await Promise.all([
    //     page.waitForResponse(response => response.url().includes('/api/login')),
    //     page.getByRole('button', { name: 'Log-In' }).click()
    // ])

}

const createNewBlog = async (page, { title, author, url = '' }) => {
    await page.getByRole('button', { name: 'Create New Blog' }).click()
    await page.getByLabel('Title').fill(title)
    await page.getByLabel('Author').fill(author)
    await page.getByLabel('Url').fill(url)
    await page.getByRole('button', { name: 'Submit Blog' }).click()
}

const likeBlog = async (page, titleOfBlog) => {
    const blog = page.locator('.blog').filter({ hasText: titleOfBlog })
    const viewButton = blog.getByRole('button', { name: 'view' })
    const likeButton = blog.getByRole('button', { name: 'Like' })

    if ( !(await likeButton.isVisible()) ) await viewButton.click()
    await likeButton.click()
    // console.log('Page text:', await page.textContent('body'))
}

export { login, createNewBlog, likeBlog }