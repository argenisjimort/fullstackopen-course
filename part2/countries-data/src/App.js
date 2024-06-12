import { useState, useEffect } from "react";
import axios from "axios";

function App() {


  const BASE_API = `https://studies.cs.helsinki.fi/restcountries/api/all`;
  const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?`;
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_KEY;


  const [countriesList, setCountriesList] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect ( () => {

    if ( countriesList.length === 0) {
      axios.get(BASE_API).then( response => setCountriesList( response.data ) );
    }

    if ( matchingCountries.length === 1 ) {
      const country = matchingCountries[0];
      axios.get( `${WEATHER_API}lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${WEATHER_API_KEY}` )
        .then( response => setWeather(response.data) );
    }

    // eslint-disable-next-line
  }, [searchCountry] );


  const matchingCountries = countriesList.filter( country => country.name.common.toUpperCase().includes( searchCountry.toUpperCase() ) );


  const handleSearchInputChange = (event) => {
    console.log( `setting search, and render` );
    setSearchCountry( event.target.value );
  }


  const CountriesInfo = () => {
      if (matchingCountries.length > 10) return <p> Too many matches. please specify </p>
      if (matchingCountries.length <= 10 && matchingCountries.length > 1 ) return <SimilarCountriesList countries={ matchingCountries } />
      if (matchingCountries.length === 1) return <Country country={ countriesList.filter( country => country.cca3 === matchingCountries[0].cca3 )[0] } />
  } 
  

  const SimilarCountriesList = ({countries}) => {
    return (
      <ul>
        { countries.map( country => <li key={country.cca3} > {country.name.common}  <button onClick={ () => setSearchCountry( country.name.common ) } >show</button> </li> ) }
      </ul>
    )
  }

  const Country = ({country}) => {    
    return (
      <div>
        <h2> {country.name.common} </h2>
        <img alt="Country-Flag" src={country.flags.png} />
        <p> <b>Capital: </b> {country.capital[0]} </p>
        <p> <b>Area: </b> {country.area} </p>
        <p> <b>Languages: </b> </p>
        <ul>
          { Object.values( country.languages ).map ( (language, index) => <li key={index} > {language} </li> ) }
        </ul>
        <hr></hr>
        { weather !== null &&
        <div>
          <h3>Weather in capital "{country.capital[0]}":</h3> 
          <p> <b>Weather:</b> {weather.weather[0].main}/{weather.weather[0].description}</p>
          <img alt="Weather-Icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p> <b>Temperature:</b> {weather.main.temp}°C</p>
          <p> <b>Wind:</b> {weather.wind.speed} meters/sec</p>

        </div>
        }


      </div>
    )
  }


  return (
    <div className="App">
      <h1 style={{textDecoration: "underline"}}>WEATHER APP</h1>
      <input onChange={handleSearchInputChange} />
      { countriesList.length === 0 && <p> Getting Info... </p>}
      <CountriesInfo />
    </div>
  );
}

export default App;
