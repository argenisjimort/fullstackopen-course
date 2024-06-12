const Note =  ({note}) => {
    return(
      <div>
        <p>{note.content}</p>
        <p>id: {note.id}</p>
      </div>
      )
}

export default Note;