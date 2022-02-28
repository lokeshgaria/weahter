import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchWeather, fetchWithcoordinates } from "./api/fetchweather.api";

function App() {
  const [query, setquery] = useState(``);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position", position.coords);
      location(position);
    });
  }, []);

  const location = async (position) => {
    const response = await fetchWithcoordinates(
      position.coords.latitude,
      position.coords.longitude
    );
    console.log("weather app", response);
    setWeather(response);
    // setCoorWeather(response.current)
    // setWeather({
    //   name : response.timezone,
    //   country : response.
    // })
  };
  const search = async (e) => {
    setquery(e.target.value);
    if (e.key === "Enter") {
      const data = await fetchWeather(e.target.value);
      console.log("data", data);
      setWeather(data);
    }
  };
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="search..."
        value={query}
        onKeyPress={search}
        onChange={(e) => setquery(e.target.value)}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>

          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
