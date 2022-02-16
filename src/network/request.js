// 导入axios框架
import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: '5000'
  })
  
  // 2.axios拦截器
  // 2.1 请求成功或失败的拦截
  instance.interceptors.request.use(config => {
    // console.log(config)
    // 拦截请求后，必须返回
    return config
  }, err => {
    console.log(err)
  })
  // 2.2 响应成功或失败的拦截
  instance.interceptors.response.use(res => {
  // 拦截响应后，必须返回，只需要返回data，因为只有data才是从服务器请求到的真实数据
    return res.data
  }, err => {
    console.log(err)
  })
  
  // 3.发送真正的网络请求, instance(config)会返回一个Promise
  return instance(config)
}