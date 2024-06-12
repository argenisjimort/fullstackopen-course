import { useState, useEffect } from "react";

//services
import phoneNumbers from "./services/phoneNumbers";

//components
import PersonsList from "./components/PersonsList";
import SubmitPersonForm from "./components/SubmitPersonForm";
import FilterTextInput from "./components/FilterTextInput";
import Notification from "./components/Notification";

import "./index.css";



const App = ( props ) => {
    const [persons, setPersons] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState("");
    


    useEffect( () => { //Effect
        phoneNumbers.getPhoneNumbers().then( response => setPersons(response) );
    }, [] );



    
    const [ filterName, setFilterName ] = useState("");

    //get only names that include what is on "filterName"
    const personsToShow = persons.filter( (person) => person.name.toUpperCase().includes( filterName.toUpperCase() )  );

    

    const handleDeleteName = (id, name) => {
        if ( window.confirm(`DELETE ${name}?`) ) {
            phoneNumbers.deletePhoneNumber( id ).then( response =>  {
                setPersons(persons.filter( person => person.id !== id ) );
                setNotificationMessage(`'${name}' REMOVED`);
                setTimeout( () => setNotificationMessage(""), 3000 );
            }).catch ( error => {
                setNotificationMessage(`${name} was already deleted`);
                setTimeout( () => setNotificationMessage(""), 3000 );
                setPersons(persons.filter( person => person.id !== id ) );

            });
        }
    }


    return (
        <div>
            <h1> PhoneBook </h1>
            <Notification message={notificationMessage}/>
            <SubmitPersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage}/>
            <FilterTextInput filter={filterName} setFilter={setFilterName}/>
            <PersonsList persons={personsToShow} deleteName={handleDeleteName} />
        </div>
    )
}

export default App;