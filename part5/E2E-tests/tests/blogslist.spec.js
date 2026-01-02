const { test, expect, beforeEach, describe } = require('@playwright/test')
import { login, createNewBlog, likeBlog } from './tests-helper'

describe('Blog app', () => {

    describe.configure({ mode: 'serial' })

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Just Name',
                username: 'justAnUsername',
                password: 'justAPassword'
            }
        })

        await request.post('/api/users', {
            data: {
                name: 'Just Name',
                username: 'justAnUsername2',
                password: 'justAPassword2'
            }
        })


        await page.goto('/')
    })



    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    test('Can login with right credentials', async ({ page }) => {
        await login(page, 'justAnUsername', 'justAPassword')
        // console.log('Page text:', await page.textContent('body'))
        await expect(page.getByText('is logged in')).toBeVisible()
    })


    test('fails login with wrong credentials (password)', async ({ page }) => {
        await login(page, 'justAnUsername', 'wrongpassword')
        // console.log('Page text:', await page.textContent('body'))
        await expect(page.getByText('could Not authenticate User')).toBeVisible()
    })


    describe('after being logged in', () => {

        beforeEach(async ({ page }) => {
            await login(page, 'justAnUsername', 'justAPassword')
            const blogInfo = {
                title: "example title",
                author: "example author"
            }
            await createNewBlog(page, blogInfo)
        })


        test('logged user can create a blog', async ({ page }) => {
            //it should be logged-in already
            await expect(page.getByText("example title - example author")).toBeVisible()
        })


        test('blog can be liked', async ({ page }) => {
            // await page.getByRole('button', { name: 'view' }).click()
            // await page.getByRole('button', { name: 'Like' }).click()
            await likeBlog(page, 'example title')
            // console.log('Page text:', await page.textContent('body'))
            await expect(page.getByText('Likes: 1')).toBeVisible()
        })



        test('USEr can delete blog', async ({ page }) => {
            page.once('dialog', dialog => dialog.accept())

            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'DELETE' }).click()
            // console.log('Page text:', await page.textContent('body'))

            await expect(page.getByText('example title - example author')).not.toBeVisible()
        })

        test('another user cant delete the blog', async ({ page }) => {
            page.once('dialog', dialog => dialog.accept())

            await page.getByRole('button', { name: 'Log Out' }).click()
            await login(page, 'justAnUsername2', 'justAPassword2')


            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'DELETE' }).click()
            // console.log('Page text:', await page.textContent('body'))

            await expect(page.getByText('User not owner of BLOG')).toBeVisible()
        })


        test('check the blogs are ordered by likes', async ({page}) => {
            await createNewBlog(page, {
                title: 'should be #2',
                author: 'author'
            })
            await createNewBlog(page, {
                title: 'should be #1',
                author: 'author'
            })
            await createNewBlog(page, {
                title: 'should be #3',
                author: 'author'
            })


            await expect(page.locator('.blog')).toHaveCount(4)
            await likeBlog(page, 'should be #1')
            await likeBlog(page, 'should be #1')
            await likeBlog(page, 'should be #1')

            await likeBlog(page, 'should be #2')
            await likeBlog(page, 'should be #2')

            await likeBlog(page, 'should be #3')



            await expect(page.locator('.blog').nth(0)).toContainText('should be #1')

            // const blogs = await page.locator('.title-author').allTextContents()
            // console.log(blogs)
            // await expect(blogs[0]).toContain('#1')

        })
    })
})