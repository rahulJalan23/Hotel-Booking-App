import axios from 'axios';
// import the activeToken and refreshToken headers from the redux state
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 1000,
  headers: null,
});

export default instance;
