import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherContainer = () => {
  const [info, setInfo] = useState({
    city: '',
    temp: '',
    feelsLike: '',
    desc: '',
    country: ''
  });

  function getData() {
    return axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=Edmonton&appid=ad009ed73a94496b7f9a281574c70ea4'
      )
      .then(res => {
        showOutput(res.data);
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function showOutput(res) {
    setInfo({
      city: res.name,
      temp: res.main.temp,
      feelsLike: res.main.feels_like,
      desc: res.weather[0].main,
      country: res.sys.country
    });
  }

  return (
    <div>
      <button onClick={getData}>Button</button>
      <h2>{info.temp}&#176;</h2>
      <p>{info.desc}</p>
      <p>{info.feelsLike}</p>
      <p>
        {info.city} {info.country}
      </p>

      <ul>
        <li>
          <h3>Saturday</h3>
          <img src='' alt='' />
          <p>13&#176; - 7&#176;</p>
        </li>
        <li>
          <h3>Saturday</h3>
          <img src='' alt='' />
          <p>13&#176; - 7&#176;</p>
        </li>
        <li>
          <h3>Saturday</h3>
          <img src='' alt='' />
          <p>13&#176; - 7&#176;</p>
        </li>
        <li>
          <h3>Saturday</h3>
          <img src='' alt='' />
          <p>13&#176; - 7&#176;</p>
        </li>
      </ul>
    </div>
  );
};

export default WeatherContainer;
