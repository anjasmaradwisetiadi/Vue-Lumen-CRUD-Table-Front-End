import axios from 'axios'

export const lumenRequest = axios.create({
  baseURL : 'http://lumenbackend.oo'
})
