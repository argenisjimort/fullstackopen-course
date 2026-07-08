import axios from 'axios'
import { loginApiUrl } from '../utils/config'

const login = async ({ username, password }) => {
    const response = await axios.post(loginApiUrl, { username, password })
    //if axios gets a response of >= 400 it throws an error instead
    return response.data //response.data is the axios equivalent of response.body

}


export default { login }