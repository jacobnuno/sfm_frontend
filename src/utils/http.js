import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

var openHttp = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // TODO: Decrease time out once backend is optimized
  headers: {
    'Content-Type': 'application/json'
  }
})

var authHttp = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // TODO: Decrease time out once backend is optimized
  headers: {
    'Content-Type': 'application/json'
  }
})

authHttp.interceptors.request.use(function (config) {
  let { authToken } = store.state.user
  if (authToken) config.headers.Authorization = authToken
  return config
}, function (error) {
  return Promise.reject(error)
})

// Export modules
export { openHttp, authHttp }