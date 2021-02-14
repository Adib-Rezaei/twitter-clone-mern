import axios from 'axios'
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:5000";

const instance = axios.create({
    baseURL,
})

export default instance;