import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #6294ed;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  font-size: 1.3rem;
`;

const Temp = styled.h2`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const Tags = styled.p`
  padding: 0.5rem 0;
`;

const Info = props => {
  const { degreeUnit, info, tempF, tempC } = props;
  return (
    <div>
      <Container>
        <Temp>{degreeUnit ? tempF.liveTemp : tempC.liveTemp}&#176;</Temp>
        <Tags>
          Feels Like: {degreeUnit ? tempF.feelsLike : tempC.feelsLike}&#176;
        </Tags>
        <Tags>{info.desc}</Tags>
        <Tags>
          {info.city} {info.country}
        </Tags>
      </Container>
    </div>
  );
};

export default Info;
