import axios from 'axios';

const $axios = axios.create({
   baseURL: './users.json'
});

export default $axios;