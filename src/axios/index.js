import axios from 'axios'
import { apiUrl } from '../config'

axios.interceptors.request.use(function (config) {
  if (!~config.url.indexOf('login')) {
    config.headers['authorization'] = window.sessionStorage.token || ''
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

const $api = {
  get (url, query = {}) {
    let queryStr = '?'
    if (Object.keys(query).length > 0) {
      for (let k in query) {
        queryStr += k + '=' + query[k] + '&'
      }
    }
    return new Promise((resolve, reject) => {
      axios.get(apiUrl + url + queryStr)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      axios.post(apiUrl + url, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default $api
