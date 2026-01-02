import { useState } from 'react'
import loginService from '../services/login'





const LoginForm = ({ setLoggedUser, handleStatusMessagePrint }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            //username and password are the ones from the useState (updated by the form)
            const loginResponse = await loginService.login({ username, password }) //also the .login already return the 'body' of the request
            window.localStorage.setItem('loggedUser', JSON.stringify(loginResponse))
            //also if axios gets a status over 400. it will throw an error. ans it will go to the catch instead. no response on that case
            setLoggedUser(loginResponse)
        } catch (error) {
            const message = error.response?.data?.error || error.message || 'Login failed'
            handleStatusMessagePrint(message)
            setTimeout(() => handleStatusMessagePrint(''), 7000)
            console.error(message)
        }
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <label> username <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} /></label>
            {/* here im destructuring so that is not event.target.value, but only, target.value*/}
            <label> password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /></label>
            <button type="submit">Log-In</button>
        </form>
    )
}



export default LoginForm