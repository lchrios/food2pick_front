import axios from 'axios';

let hosts = [
    "localhost:9999"
]

export default axios.create({
    baseURL: hosts[0],
    headers: {
        "Content-type": "application/json"
    }  
})