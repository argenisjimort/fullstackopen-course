import notesServices from "../services/notes";


const toggleNoteImportance = (note) => {
    //axios.put( `http://localhost:3001/notes/${note.id}`, { ...note, isImportant: !note.isImportant } ).then( response => console.log(response));
    notesServices.updateNote( note.id, {...note, isImportant: !note.isImportant } );
}

const Note = ({note}) => {
    return(
        <div>
            <p>{note.content}</p>
            <button onClick={ () => toggleNoteImportance(note) } > { note.isImportant ? "Remove" : "Make" } Important </button>
        </div>
    )
}

export default Note;