import axios from "axios"
export const API_URL = "http://localhost:5458/" 

export const api = axios.create({
    baseURL: API_URL,
    header:{
        'Content-Type':'application/json'
    }
})
