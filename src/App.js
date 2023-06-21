import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCountry, useField } from './hooks'
import Country from './components/Country';

const _ = require('lodash')

/*
const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = () => {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    console.log('useEffect')
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => setCountries(res.data))
  }, []);

  const getCountry = (name) => {
    console.log('getCountry', name)
    // console.log(countries)
    const names = _.map(countries, v => v.name.common)
    // console.log(names)
    const match = _.filter(names, v => v.toLowerCase().indexOf(name.toLowerCase()) > -1
    )
    console.log(match)
    if (match.length > 1) {
      setCountry(null)
    }
    if (match.length === 1) {
      console.log('match found')
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${match[0]}`)
        .then(res => {
          console.log(res.data)
          console.log(res.data.flags.png)

          setCountry({
            name: res.data.name.common,
            capital: res.data.capital[0],
            population: res.data.population,
            flag: res.data.flags.png,
          })
        })
    }
  }

  return {
    country,
    getCountry
  }
};

const Country = ({ country }) => {
  console.log(country)
  if (country === null) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flag}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};
*/

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry();

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    country.getCountry(nameInput.value)
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country.country} />
    </div>
  );
};

export default App;
