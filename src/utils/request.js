import axios from 'axios'
import {getToken} from "@/utils";
import {removeToken} from "@/utils";
import router from "@/router"

const request = axios.create({
  //根域名
  baseURL: 'http://geek.itheima.net/v1_0',
  //超时时间
  timeout: 5000
})
// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 [参数的处理]
request.interceptors.request.use((config) => {
  // 操作这个config 注入token数据
  // 1. 获取到token
  // 2. 按照后端的格式要求做token拼接
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error)=> {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }

  return Promise.reject(error)
})
export { request }