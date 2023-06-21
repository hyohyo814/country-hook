import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

export const getAll = () => {
  const res = axios.get(`${baseUrl}/all`)
  return res.data
}

export const get = (name) => {
  const res = axios.get(`${baseUrl}/name/${name}`)
  return res.data
}