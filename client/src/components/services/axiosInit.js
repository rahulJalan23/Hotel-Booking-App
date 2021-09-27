import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 1000,
  headers: null,
});

export default instance;
