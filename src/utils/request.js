import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const timeOut = 3600 // s
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

function isCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > timeOut
}
// 请求拦截器，对请求数据时候的统一处理
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeOut()) { // 超时
      store.dispatch('user/logout')
      router.push('/login')
     // Message.error('token 超时')
      return Promise.reject(new Error('token超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器，对返回数据的统一处理和token失效的情况
service.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 失效')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
