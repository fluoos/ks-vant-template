/**
 * axios封装
 * 支持普通和RESTFUL请求
 */
import axios, { AxiosRequestConfig } from 'axios'

// 设置baseURL
let baseURL = process.env.VUE_APP_APP
// 线上环境统一用服务器地址路径，单站点
if (process.env.NODE_ENV === 'production') {
  baseURL = location.protocol + '//' + location.host
}

// 设置请求过期时间
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json'
  }
  const userToken = localStorage.getItem('userToken') || ''
  if (userToken) {
    config.headers.Authorization = 'Bearer ' + userToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // 根据后端接口返回的异常code执行操作
  const { code } = response.data
  if (code === 401) {
    // TTODO 清除token，页面跳转登陆
    setTimeout(() => {
      localStorage.removeItem('userToken')
    }, 2000)
  }
  return response
}, error => {
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        message = '错误请求'
        break
      case 401:
        message = '未授权，请重新登录'
        // TTODO 清除token，页面跳转登陆
        setTimeout(() => {
          localStorage.removeItem('userToken')
        }, 2000)
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求错误,未找到该资源'
        break
      case 408:
        message = '请求超时'
        break
      case 500:
        message = '服务器端出错'
        break
      case 502:
        message = '网络错误'
        break
      case 503:
        message = '服务不可用'
        break
      case 504:
        message = '网络超时'
        break
      default:
        message = `连接错误${error.response.status}`
    }
  } else {
    if (error && error.message) {
      message = '连接到服务器失败'
    }
  }
  return Promise.resolve(error.response)
})

// restful路径参数替换
const toRestFul = (url: string, params: {}) => {
  const paramArr = url.match(/\{(.*?)\}/g)
  if (!paramArr) return url
  paramArr.forEach(el => {
    const elKey = el.replace('{', '').replace('}', '')
    url = url.replace('{' + elKey + '}', params[elKey])
  })
  return url
}

const filterEmptyParams = (params: {}) => {
  for (const i in params) {
    if ((params as any)[i] === '' || (params as any)[i] === null || (params as any)[i] === undefined) {
      delete (params as any)[i]
    } else {
      (params as any)[i] = stripScript((params as any)[i])
    }
  }
}

/**
 * 过滤XSS攻击脚本
 * @param s 参数
 */
function stripScript (s) {
  return /<script.*?>.*?<\/script>/ig.test(s.toString()) ? s.toString().replace(/<script.*?>.*?<\/script>/ig, '') : s
}

class Api {
  get (url: string, params = {}) {
    filterEmptyParams(params)
    return new Promise((resolve, reject) => {
      axios.get(baseURL + url, { params }).then(res => {
        resolve(res ? res.data : '')
      }, err => {
        reject(err)
      })
    })
  }

  post (url: string, params = {}, config?: AxiosRequestConfig) {
    filterEmptyParams(params)
    return new Promise((resolve, reject) => {
      axios.post(baseURL + url, params, config).then(response => {
        resolve(response ? response.data : '')
      }, err => {
        reject(err)
      })
    })
  }

  put (url: string, params = {}) {
    filterEmptyParams(params)
    return new Promise((resolve, reject) => {
      axios.put(baseURL + url, params).then(response => {
        resolve(response ? response.data : '')
      }, err => {
        reject(err)
      })
    })
  }

  delete (url: string, params = {}) {
    filterEmptyParams(params)
    return new Promise((resolve, reject) => {
      axios.delete(baseURL + url, params).then(response => {
        resolve(response ? response.data : '')
      }, err => {
        reject(err)
      })
    })
  }

  restGet (url: string, params = {}) {
    filterEmptyParams(params)
    return new Promise((resolve, reject) => {
      axios.get(toRestFul(baseURL + url, params)).then(res => {
        resolve(res ? res.data : '')
      }, err => {
        reject(err)
      })
    })
  }

  restPost (url: string, params = {}, isAdmin = false) {
    filterEmptyParams(params)
    return new Promise((resolve, reject) => {
      axios.post(toRestFul(baseURL + url, params)).then(res => {
        resolve(res ? res.data : '')
      }, err => {
        reject(err)
      })
    })
  }
}

const api = new Api()

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api;
  }
}

export default api
