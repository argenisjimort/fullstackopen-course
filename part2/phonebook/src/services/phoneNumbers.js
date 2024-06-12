import axios from "axios";


const NUMBERS_URL = `http://localhost:3001/persons`;

const getPhoneNumbers = () => axios.get( NUMBERS_URL ).then(response => response.data);
const addPhoneNumber = ( newNumber ) => axios.post( NUMBERS_URL, newNumber ).then( response => response.data );
const deletePhoneNumber = (id) => axios.delete( `${NUMBERS_URL}/${id}` ).then( response => response.data );
const updatePhoneNumber = (id ,updatedPerson) => axios.put( `${NUMBERS_URL}/${id}`, updatedPerson ).then( response => response.data );

const refreshPersonsList = () => {
    
}


// eslint-disable-next-line 
export default {getPhoneNumbers, addPhoneNumber, deletePhoneNumber, updatePhoneNumber, refreshPersonsList};