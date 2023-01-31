import axios from 'axios'

const backAxios = axios.create({
    baseURL: 'http://localhost:3065',
    timeout: 5000,
    withCredentials : true,
  });

export default backAxios