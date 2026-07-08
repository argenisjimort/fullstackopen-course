import axios from 'axios'
import { usersApiUrl } from '../utils/config'


const getAll = async () => {
    const response = await axios.get(usersApiUrl)
    return response.data
}

const getOne = async () => {
    
}


export default { getAll }