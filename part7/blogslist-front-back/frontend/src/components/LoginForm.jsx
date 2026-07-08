import { useState } from 'react'
import { useMessagePrintStore } from '../store/messagePrintStore'
import { useLoggedUserStore } from '../store/loggedUserStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const LoginForm = ({ }) => {

    //const [username, setUsername] = useState('')
    //const [password, setPassword] = useState('')

    const username = useField('text')
    const password  = useField('password')

    const printStatusMessage = useMessagePrintStore(state => state.printStatusMessage)
    const navigate = useNavigate()
    const logIn = useLoggedUserStore(state => state.logIn)
    const location = useLocation()
    const from = location.state?.from?.pathname || '/blogs'


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await logIn(username.value, password.value)
            navigate(from, { replace: true })
        } catch (error) {
            const message = error.response?.data?.error || error.message || 'Login failed'
            printStatusMessage(message, 7)
            console.error(message)
            setUsername('')
            setPassword('')
        }

    }

    return (
        <form onSubmit={handleLogin}>
            <label > Username <input {...username} /> </label>
            <label > Password <input {...password} /> </label>
            <button className='button' type="submit">Log-In</button>

            
            {/* <label> username <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} /></label> */}
            {/* here im destructuring so that is not event.target.value, but only, target.value*/}
            {/* <label> password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /></label> */}
            {/* <button className='button' type="submit">Log-In</button> */}
        </form>
    )
}



export default LoginForm