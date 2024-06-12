import { useState, useEffect } from 'react';
//import axios from 'axios';
import Note from './components/Note';
import NewNoteForm from './components/NewNoteForm';
import notesService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  //const [newNote, setNewNotes] = useState(``);
  const [isShowingAllNotes, setIsShowingAllNotes] = useState(true);
  const notesToShow = isShowingAllNotes ? notes : notes.filter( note => note.isImportant )


  //get notes from server
  useEffect(() => {
    /*
    axios
      .get(`http://localhost:3001/notes`)
      .then( response => {
        console.log(response.data);
        setNotes(response.data);
      });
      */


      notesService.getAllNotes().then( response => setNotes(response) );

  }, []);

  console.log(`page rendered, ${notes.length} Notes loaded`);  
  //



  return(
    <div>
      <NewNoteForm />
      <button onClick={ () => setIsShowingAllNotes(!isShowingAllNotes) }> Show { isShowingAllNotes ? `Important` : `All` } </button>
      { notesToShow.map( note => <Note key={note.id} note={note} /> ) }
    </div>
  )

}


export default App;