import axios from 'axios'

const backAxios = axios.create({
    baseURL: 'http://localhost:3065',
    timeout: 1000,
    withCredentials : true,
  });

export default backAxios