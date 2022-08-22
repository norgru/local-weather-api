import {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [geoloc, setGeoloc] = useState();
  const [weatherinfo, setWeatherinfo] = useState();


  useEffect(() => {
    console.log('helloLatLong');
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=09a24382d27b4679bb561c6d2c15fc32')
      .then(
        response => response.json()
      )
      .then(
        (data) => {
          console.log(data);
          setGeoloc(data);
        }
      )
  },[])



  useEffect(() => {

    if(geoloc !== undefined){

      console.log('helloLatLong');
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoloc.latitude}&lon=${geoloc.longitude}&appid=c68f6cb54ec3760d373e5be83f9cf907`)
        .then(
          response => response.json()
        )
        .then(
          (data) => {
            console.log(data);
            setWeatherinfo(data);
          }
        )
    }
  },[geoloc])
  

  const toCelsius = (kelvin) => {
    return (kelvin-273.15).toFixed(1);
  }

  return (
    <div className="App">
      {geoloc !== undefined & weatherinfo !== undefined && /*Checking to see if there's anything in the states before rendering them*/
        <>
        <h2>It's weather time!</h2>
        <h2>You are in {geoloc.city}, {geoloc.state_prov} <img src={geoloc.country_flag} alt="supposedToBeAFlagHere:(" /></h2>
        <h2>It is {toCelsius(weatherinfo.main.temp)}°C with {weatherinfo.weather[0].description}.</h2>
        </>
      } 

    </div>
  );
}

export default App;
