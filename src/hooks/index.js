import { useState, useEffect } from 'react'
import axios from 'axios'

const _ = require('lodash')

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

export const useField = (type) => {
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

export const useCountry = () => {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    console.log('useEffect')
    axios.get(`${baseUrl}/all`)
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
      axios.get(`${baseUrl}/name/${match[0]}`)
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