//import { useState } from "react";


const FilterTextInput  = ({filter, setFilter}) => {
    //const [ filterName, setFilterName ] = useState("")

    const handleFilterNameChange = (event) => {
        setFilter( event.target.value );
        //setFilterName( event.target.value );
    }
    return (
        <label> Filter by name: <input placeholder=" Filter by..." value={filter} onChange={handleFilterNameChange}/> </label>
        //<label> Filter by name: <input placeholder=" Filter by..." value={filterName} onChange={handleFilterNameChange}/> </label>
    )
}
;

export default FilterTextInput;