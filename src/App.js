import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data);
    console.log(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    }))
  }, []) // vazio vai ser apenas executado quando montar

  
  if (location === false) {
    return (
      <h2>Você precisa habilitar a sua localização !</h2>
    )
  } else if (weather === false) {
    return (
      <h2>Carregando o clima...</h2>
    )
    
  } else {
    return (
      <div>
        <h2>{weather['name']} <br/> {weather['weather'][0]['description']}</h2>
        <ul>
          <li>Temperatura Atual: {weather['main']['temp']}°</li>
          <li>Temperatura Máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura Mínima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
          <li>Latitude: {weather['coord']['lat']}</li>
          <li>Longitude: {weather['coord']['lon']}</li>
        </ul>
      </div>
    );
  }
}

export default App;
