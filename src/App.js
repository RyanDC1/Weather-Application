import React, {useState} from 'react';
import logo from './Assets/weather.png'

const api ={
  key: "960ddf559e6b1a10af635dc31c5490ed",
  base: "https://api.openweathermap.org/data/2.5/"    //API call
}

// This function will constitute the main home page of the weather app.
// Note: className is used instead of class as class is a keyword in JS.
function App() {
  var date = new Date();
  date = date.toDateString();

  /* React hook: useState() returns a tuple where the first parameter is 
  the current state and second parameter is the method that will allow us
  to update the state.*/ 
  const [loc, setLocation] = useState('');             //Location
  const [weather, setWeather] = useState({});   // Weather forecast

  //search Function will fetch weather details from API and store it in a sate.
  const search = event => {
    if (event.key === "Enter")
    {
      fetch(`${api.base}weather?q=${loc}&units=metric&APPID=${api.key}`)    //Fetch returns a promise object whose value will be produced in the future.
      .then(result => result.json())
      .then(content => {
        setWeather(content);
        setLocation('');
      });
    }
  }

  return (
    <div id="condition" className={
      (typeof weather.main != "undefined") ? 
        ((weather.weather[0].main === "Rain") 
            ? 'App rainy' : (weather.weather[0].main === "Clear")
            ? 'App sunny' : (weather.weather[0].main === "Clouds")
            ? 'App clouds' : (weather.weather[0].main === "Mist")
            ? 'App misty' : (weather.weather[0].main === "Snow")
            ? 'App snowy' : (weather.weather[0].main === "Haze")
            ? 'App haze' :"App") :'App'}>
      <main>
      <img className="Logo" src={ logo } width="60" height="55" alt=""></img>
        <div className="Search">
          <input 
              type="text" 
              className="SearchBox" 
              placeholder="Search..."
              onChange={ q => setLocation(q.target.value) }
              value={ loc }
              onKeyPress={ search }
          />
          <i id="icon" className="fas fa-search fa-lg"></i>
        </div>
        {(typeof weather.main != "undefined") ? (     //ternary operator to display data only when available
        <div> 
          <div className="Location-search">
            <div className="Location">{weather.name}, {weather.sys.country}</div>
            <div className="Date">{date}</div>
          </div>
          <div className="Weather-forecast">
            <div className="Temp">
            <i id="icon" className="fas fa-temperature-low fa-sm"></i>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="Forecast">
            <i id="icon" className={
      (typeof weather.main != "undefined") ? 
        ((weather.weather[0].main === "Rain") 
            ? 'fas fa-cloud-showers-heavy fa-sm' : (weather.weather[0].main === "Clear")
            ? 'fas fa-sun fa-sm' : (weather.weather[0].main === "Clouds")
            ? 'fas fa-cloud fa-sm' : (weather.weather[0].main === "Mist")
            ? 'fas fa-smog fa-sm' : (weather.weather[0].main === "Snow")
            ? 'fas fa-snowflake fa-sm' : (weather.weather[0].main === "Haze")
            ? 'fas fa-smog fa-sm' :" ") :' '}></i>
              {weather.weather[0].main}
              <br/>
              {weather.weather[0].description}
            </div>
          </div>
        </div> 
        ) :('')}
      </main>  
    </div>
  );
}

export default App;

