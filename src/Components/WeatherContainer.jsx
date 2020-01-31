import React, { useState } from 'react';
import Info from './Info';

import axios from 'axios';
import styled from 'styled-components';

// STYLE
const Container = styled.div`
  width: 30%;
  margin: 5rem auto;
  font-family: 'Lato', sans-serif;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d5e6ff;
`;

const SearchBar = styled.input`
  background: #edf0ff;
  color: black;
  font-size: 1.4rem;
  padding: 0.7rem;
  border: none;
  user-select: none;
`;

const Submit = styled.button`
  background: gray;
  color: white;
  font-size: 1.4rem;
  border: none;
  margin-right: 1rem;
  padding: 0.7rem;
  cursor: pointer;
`;

const Clear = styled(Submit)`
  background: none;
  border: 1px solid gray;
  color: #333;
`;

const CelciusButton = styled.button`
  background: blue;
  color: white;
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
`;

const FarhenButton = styled(CelciusButton)`
  background: red;
`;

const WeatherContainer = () => {
  const [searchString, setSearchString] = useState('');
  const [degreeUnit, setDegreeUnit] = useState(false);
  const [dataFilled, setDataFilled] = useState(false);

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
        `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&units=metric&appid=ad009ed73a94496b7f9a281574c70ea4`
      )
      .then(res => {
        showOutput(res.data);
        setDataFilled(true);
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

  function clearData() {
    setInfo({
      city: '',
      desc: '',
      country: ''
    });

    setTempC({
      liveTemp: '',
      feelsLike: ''
    });

    setTempF({
      liveTemp: '',
      feelsLike: ''
    });

    setDataFilled(false);
    setSearchString('');
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

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  return (
    <Container>
      <SearchContainer>
        <SearchBar
          type='text'
          placeholder='City'
          onChange={handleChange}
          value={searchString}
        />
        <Submit onClick={getData}>Submit</Submit>
        <Clear onClick={clearData}>Clear</Clear>
        <div>
          {degreeUnit ? (
            <FarhenButton onClick={changeDegreeUnit}>F</FarhenButton>
          ) : (
            <CelciusButton onClick={changeDegreeUnit}>C</CelciusButton>
          )}
        </div>
      </SearchContainer>
      <div>
        {dataFilled ? (
          <Info
            degreeUnit={degreeUnit}
            tempC={tempC}
            tempF={tempF}
            info={info}
          />
        ) : (
          ''
        )}
      </div>
    </Container>
  );
};
//
export default WeatherContainer;
