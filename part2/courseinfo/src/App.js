import { useState } from "react";
import Course from "./Course";
import Note from "./Note";



const App = (props) => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        } 
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  const [notes, setNotes ] = useState([]);
  const [newNote, setNewNote] = useState("Add a new note");
  const [showAll, setShowAll] = useState(true);


  const notesToShow = showAll ? notes : notes.filter ( note => note.isImportant );


  const handleInputChange = (event) => {
    console.log ( event.target.value );
    setNewNote(event.target.value);
  };


  const addNote = (event) => {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
      isImportant: Math.random() < 0.5,
      id: notes.length + 1
    }
    console.log (newNoteObject);
    setNotes ( notes.concat(newNoteObject) );
    setNewNote(`Add anther note`);
  };

  return (
    <div>
      {courses.map ((course) => <Course key={course.id} course={course} />)}




      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleInputChange} />
        <input type="submit" value="add Note" />
      </form>
      <button onClick={ () => setShowAll(!showAll) } > Show { showAll ? `Important` : `All` } </button>

      {notesToShow.map ( (note) => <Note key={note.id} note={note}/> )} 

    </div>
  )
}


export default App; 