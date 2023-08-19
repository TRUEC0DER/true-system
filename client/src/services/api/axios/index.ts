import axios from 'axios'
import config from "../../../config.json"

const instanceAxios = axios.create({
    baseURL: config.api.url
})

export default instanceAxios