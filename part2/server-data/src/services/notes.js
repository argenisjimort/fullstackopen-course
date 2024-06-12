import axios from "axios";

const notesUrl = `http://localhost:3001/notes`; 


const getAllNotes = () => axios.get ( notesUrl ).then( response => response.data )  ;
const addNote = ( newNote ) => axios.post ( notesUrl, newNote );
const updateNote = ( id, updatedNote ) => axios.put ( `${notesUrl}/${id}`, updatedNote ).catch( alert( `ERROR: Could not edit note` ) );



export default {getAllNotes, addNote, updateNote};