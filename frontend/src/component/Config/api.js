import axois from "axios"
export const API_URL = "http://localhost:5173/" 

export const api = axois.create({
    baseURL: API_URL,
    header:{
        'Content-Type':'application/json'
    }
})
