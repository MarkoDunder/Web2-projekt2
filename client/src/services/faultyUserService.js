import axios from 'axios';

const baseURL= "https://sql-injection-server.onrender.com/api/v1/user"

export default axios.create({
    baseURL,
});