import axios from 'axios'
import configFile from '../config.json'

const httpService = axios.create({
  baseURL: configFile.apiEndpoint
})

httpService.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export default httpService
