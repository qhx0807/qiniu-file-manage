import axios from 'axios'
const apiUrl = ''

axios.interceptors.request.use(function (config) {
  if (~config.url.indexOf('login')) {
    config.headers['au'] = window.sessionStorage.token || ''
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

const serverApi = (method, url, data, succFoo, errorFoo) => {
  axios({
    method: method,
    url: apiUrl + url,
    data: Object.assign({}, data)
  }).then(response => {
    succFoo(response)
  }).catch(error => {
    errorFoo(error)
  })
}

export default serverApi
