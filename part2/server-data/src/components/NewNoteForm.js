import { useState } from "react";
//import axios from "axios";
import notesServices from "../services/notes";

const NewNoteform = () => {

    const [note, setNote] = useState(``);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const noteToSubmit = {
            content: note,
            isImportant: Math.random() < 0.5
        }
        /*
        axios
            .post(`http://localhost:3001/notes`, noteToSubmit)
            .then( (response) => console.log(response) );
            */

        notesServices.addNote(noteToSubmit);

    }

    return (
        <form onSubmit={handleFormSubmit} >
            <input onChange={(event) => setNote(event.target.value)  }/>
            <button type="submit">Submit</button>
        </form>
    ); 
}

export default NewNoteform;