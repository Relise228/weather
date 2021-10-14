import axios from 'axios';

const API_KEY = '25d306c0f5046c868fe9bc8e2f1428b4'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    headers: {
        'Content-type': 'application/json',
    }
})

export const weatherAPI = {
    getDefaulLocation: (long = null, latt = null, city = null) => {
        let endpoint = null;
        if (city) {
            endpoint = `?q=${city}&units=metric&appid=${API_KEY}`
        } else {
            endpoint = `?lat=${latt}&lon=${long}&units=metric&appid=${API_KEY}`
        }
        return instance.get(`${endpoint}`)
    }
}