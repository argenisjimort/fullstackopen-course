import phoneNumbers from "../services/phoneNumbers";
import { /*useEffect,*/ useState } from "react";

const SubmitPersonForm = ({ persons, setPersons, setNotificationMessage }) => {

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");


  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    //check if the current name is on the persons list
    if (persons.map((person) => person.name.toUpperCase()).includes(newName.toUpperCase())) {
      
      //wanna update number? yes/no
      if (window.confirm(`'${newName}' is already on the list, wanna update the number?`)) {

        //get person that has same name
        const personToUpdate = persons.find(person => person.name.toUpperCase() === newName.toUpperCase());

        //create an oject with same info, but update number
        const updatedPerson = { ...personToUpdate, number: newNumber }

        //console.log( personToUpdate );
        //console.log ( updatedPerson );

        //updatethat person in the server, sending updated object
        phoneNumbers.updatePhoneNumber(personToUpdate.id, updatedPerson).then( response => {
          setPersons( persons.map( person => person.id === response.id ? response : person ) );
          setNotificationMessage(`'${updatedPerson.name}' Number Updated`);
          setTimeout( () => setNotificationMessage(""), 3000 );
        }).catch( error => {
          setNotificationMessage(`ERROR IT SEEMS '${personToUpdate.name}' WAS ALREADY removed`);
          setTimeout( () => setNotificationMessage(""), 3000 );
          setPersons( persons.filter( person => person.id !== personToUpdate.id ) );
        } );
      }



    } else {

      const personToAdd = { name: newName, number: newNumber }
      //setPersons( persons.concat(personToAdd) );
      setNewName("");
      setNewNumber("");

      phoneNumbers.addPhoneNumber(personToAdd).then( response => {
        setPersons( [ ...persons, response ] )
        setNotificationMessage(`'${personToAdd.name}' Number added`);
        setTimeout( () => setNotificationMessage(""), 3000 );
      });
    }
  }


  /* Component */
  return (
    <form onSubmit={handleSubmit}>
      <label> Name: <input placeholder="Add name here" required value={newName} onChange={handleNameInputChange} /> </label>
      <label> Phone #: <input placeholder="Add number here" required value={newNumber} onChange={handleNumberInputChange} /> </label>
      <button type='submit'  > Add </button>
    </form>
  )
}

export default SubmitPersonForm;  