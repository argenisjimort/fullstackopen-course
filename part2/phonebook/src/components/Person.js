const Person = ({person, deleteName}) => {
    return(
        <li> <div> {person.name}: {person.number} </div> <button onClick={ () => deleteName(person.id, person.name)} >DELETE</button> </li>
    )
}

export default Person;