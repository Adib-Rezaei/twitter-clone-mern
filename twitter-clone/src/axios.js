import axios from 'axios'
axios.defaults.withCredentials = true;

const baseURL = "https://twitter-mern-pr.herokuapp.com";

const instance = axios.create({
    baseURL,
})

export default instance;