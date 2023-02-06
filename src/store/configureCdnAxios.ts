import axios from 'axios'

const cdnAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL,
    timeout: 5000,
    withCredentials : true,
  });

export default cdnAxios