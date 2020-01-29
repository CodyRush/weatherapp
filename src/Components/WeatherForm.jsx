import React from 'react';

const WeatherForm = () => {
  function submitForm(e) {
    let city = document.querySelector('.city').value;
    let countryCode = document.querySelector('.country').value;
    e.preventDefault();
    console.log(city + ' ' + countryCode);
  }

  return (
    <div>
      <form>
        <input type='text' placeholder='City' className='city' />
        <input type='text' placeholder='Country Code' className='country' />
        <button type='submit' onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default WeatherForm;
