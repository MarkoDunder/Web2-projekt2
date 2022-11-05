import axios from 'axios';

const baseURL= "https://sql-injection-server.onrender.com/api/v1/userInfo"

export default axios.create({
    baseURL
});