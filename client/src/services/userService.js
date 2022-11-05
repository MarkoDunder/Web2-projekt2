import axios from 'axios';

const baseURL=process.env.NODE_ENV === 'production'? "api/v1/userInfo": "http://localhost:3001/api/v1/userInfo"

export default axios.create({
    baseURL,
});