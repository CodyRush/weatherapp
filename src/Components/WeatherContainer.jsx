import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherContainer = () => {
  const [degreeUnit, setDegreeUnit] = useState(false);

  const [info, setInfo] = useState({
    city: '',
    desc: '',
    country: ''
  });

  const [temp, setTemp] = useState({
    liveTemp: '',
    feelsLike: ''
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
      desc: res.weather[0].main,
      country: res.sys.country
    });

    let convertedLiveTemp = convertKelvin(res.main.temp);
    let convertedFeelsLike = convertKelvin(res.main.feels_like);

    setTemp({
      liveTemp: convertedLiveTemp,
      feelsLike: convertedFeelsLike
    });
  }

  function changeDegreeUnit() {
    if (degreeUnit === false) {
      setDegreeUnit(true);
    } else {
      setDegreeUnit(false);
    }
  }

  function convertKelvin(degrees) {
    let convertedTemp;
    if (degreeUnit === false) {
      convertedTemp = degrees - 273.15;
      return Math.round(convertedTemp);
    } else {
      convertedTemp = (degrees - 273.15) * (9 / 5) + 32;
      return Math.round(convertedTemp);
    }
  }

  return (
    <div>
      <button onClick={getData}>Button</button>
      <h2>{temp.liveTemp}&#176;</h2>
      <p>{info.desc}</p>
      <p>{temp.feelsLike}</p>
      <p>
        {info.city} {info.country}
      </p>
      <div>
        <input
          type='checkbox'
          name='toggleSwitch'
          className='toggle-switch'
          onClick={changeDegreeUnit}
        />
        <label htmlFor='toggleSwitch'>&#176;F</label>
      </div>

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
