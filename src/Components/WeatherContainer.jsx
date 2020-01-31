import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// STYLE
const Container = styled.div`
  width: 60%;
  margin: 5rem auto;
`;

const Info = styled.div`
  background: #6294ed;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
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

const CelciusButton = styled.button`
  background: blue;
  color: white;
  font-size: 1.5rem;
  border: none;
`;

const FarhenButton = styled(CelciusButton)`
  background: red;
`;

const WeatherContainer = () => {
  const [searchString, setSearchString] = useState('');
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
        `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&units=metric&appid=ad009ed73a94496b7f9a281574c70ea4`
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

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  return (
    <Container>
      <SearchContainer>
        <SearchBar type='text' placeholder='City' onChange={handleChange} />
        <Submit onClick={getData}>Submit</Submit>
        <div>
          {degreeUnit ? (
            <FarhenButton onClick={changeDegreeUnit}>F</FarhenButton>
          ) : (
            <CelciusButton onClick={changeDegreeUnit}>C</CelciusButton>
          )}
        </div>
      </SearchContainer>
      <Info>
        <h2>{degreeUnit ? tempF.liveTemp : tempC.liveTemp}&#176;</h2>
        <p>{info.desc}</p>
        <p>{degreeUnit ? tempF.feelsLike : tempC.feelsLike}</p>
        <p>
          {info.city} {info.country}
        </p>
      </Info>
    </Container>
  );
};

export default WeatherContainer;
