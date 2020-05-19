import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    const baseUrl =
      "http://api.weatherstack.com/current?access_key=" + api_key + "&query=";

    let forecastCity = country.capital;
    let fullUrl = baseUrl + forecastCity;

    axios.get(fullUrl).then((response) => {
      console.log("from the weather boy", response.data);
      setData(response.data);
    });
  }, [country]);
  console.log("data.current", data);

  return (
    <div>
      {data ? (
        <>
          <h3>Weather in {country.name}</h3>
          <p>
            <strong>temperature:</strong>
            {data.current.temperature} celsius
          </p>
          <img src={data.current.weather_icons[0]} alt="weather icon" />
          <p>
            <strong>wind:</strong>
            {data.current.wind_speed}km direction {data.current.wind_dir}
          </p>
        </>
      ) : (
        <p>Currently loading data</p>
      )}
    </div>
  );
};

export default Weather;
