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

  const [tempC, setTempC] = useState({
    liveTemp: '',
    feelsLike: ''
  });

  const [tempF, setTempF] = useState({
    liveTemp: '',
    feelsLike: ''
  });

  function getData() {
    return axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=Edmonton&units=metric&appid=ad009ed73a94496b7f9a281574c70ea4'
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

    setTempC({
      liveTemp: Math.round(res.main.temp),
      feelsLike: Math.round(res.main.feels_like)
    });

    setTempF({
      liveTemp: Math.round(convertC(res.main.temp)),
      feelsLike: Math.round(convertC(res.main.feels_like))
    });
  }

  function changeDegreeUnit() {
    if (degreeUnit === false) {
      setDegreeUnit(true);
    } else {
      setDegreeUnit(false);
    }
  }

  function convertC(degrees) {
    return degrees * (9 / 5) + 32;
  }

  return (
    <div>
      <button onClick={getData}>Button</button>
      <h2>{degreeUnit ? tempF.liveTemp : tempC.liveTemp}&#176;</h2>
      <p>{info.desc}</p>
      <p>{degreeUnit ? tempF.feelsLike : tempC.feelsLike}</p>
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
    </div>
  );
};

export default WeatherContainer;
