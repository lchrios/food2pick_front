import axios from 'axios';

let hosts = [
    "localhost:9999",
    "https://yoc5oxlbzb.execute-api.us-east-1.amazonaws.com/dev"
]

export default axios.create({
    baseURL: hosts[1],
    headers: {
        "Content-type": "application/json"
    }  
})