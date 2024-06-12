import Person from "./Person";

const PersonsList = ({persons, deleteName}) => {
    return (
        <div>
            <h2>Persons:</h2>
            <ul>
                { persons.map ( (person) => <Person key={person.id} person={person} deleteName={deleteName} /> ) }
            </ul>
        </div>
    )
}

export default PersonsList; 