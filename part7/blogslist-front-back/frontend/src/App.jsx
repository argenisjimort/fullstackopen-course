import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import StatusMessage from './components/StatusMessage'
import ErrorBoundary from './components/ErrorBoundary'
import { useBlogsStore } from './store/blogsStore'
import { useLoggedUserStore } from './store/loggedUserStore'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import BlogsPage from './pages/BlogsPage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth'
import UsersPage from './pages/UsersPage'
import SingleUserPage from './pages/SingleUserPage'
import SingleBlogPage from './pages/SingleBlogPage'
import Header from './components/Header'
import { useThemeStore } from './store/themeStore'

const App = () => {

    const theme = useThemeStore(state => state.theme)
    const checkTheme = useThemeStore(state => state.checkTheme)
    console.log(theme)

    //STORES
    const blogs = useBlogsStore(state => state.blogs)
    //const getBlogs = useBlogsStore(state => state.getBlogs)

    const checkForLogin = useLoggedUserStore(state => state.checkForLogin)
    const isLoggedIn = useLoggedUserStore(state => state.isLoggedIn)
    const logOut = useLoggedUserStore(state => state.logOut)


    useEffect(() => {
        checkForLogin()
        checkTheme()
        document.body.className = theme
    }, [theme])

    return (
        <div>
            <ErrorBoundary>
                <Header />
                <StatusMessage />
            </ErrorBoundary>

            <ErrorBoundary>
                <Routes>

                    <Route path='/login' element={<Login />} />

                    <Route element={<RequireAuth />} >
                        {/* <Route path='/' element={<Home />} /> */}
                        <Route path='/' element={<Navigate to={`/blogs`} replace />} >  </Route>
                        <Route path='/users' element={<UsersPage />} />

                        <Route path='/blogs' element={<BlogsPage />} />
                        <Route path='/blogs/:id' element={<SingleBlogPage />} />
                        <Route path='/users/:id' element={<SingleUserPage />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ErrorBoundary >
        </div>
    )
}

export default App