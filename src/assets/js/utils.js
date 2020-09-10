/**
 * 时间、日期格式化
 * @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
 * @param {Date} date 日期对象
 */
export const dateFormat = (fmt, date) => {
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
  }
  let ret
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

export const dateStringFormat = (fmt, date) => {
  if (!date) return ''
  // eslint-disable-next-line no-useless-escape
  return dateFormat(fmt, new Date(date.replace(/\-/g, '/')))
}

/**
 * 时间、日期格式化
 * @param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
 * @param {number} timestamp 时间戳
 */
export const timestampFormat = (fmt, timestamp) => {
  return dateFormat(fmt, new Date(timestamp * 1000))
}

/**
 * 判断日期字符串是否过期
 * @param {string} timeString 日期字符串
 */
export const isExpireTime = (timeString) => {
  // 空则过期
  if (!timeString || timeString === null) {
    return true
  }
  return (
    dateFormat('YY-mm-dd HH:MM:SS', new Date()) >
    dateStringFormat('YY-mm-dd HH:MM:SS', timeString)
  )
}

export const rules = {
  digits: /^\d+$/, // 纯数字
  letters: /^[a-z]+$/i, // 纯字母
  date: /(^(19|20)\d{2}-(10|12|0[13578])-(3[01]|[12][0-9]|0[1-9])$)|(^(19|20)\d{2}-(11|0[469])-(30|[12][0-9]|0[1-9])$)|(^(19|20)\d{2}-(02)-(2[0-8]|1[0-9]|0[1-9])$)|(^(((19|20)(0[48]|[2468][048]|[13579][26]))|2000)-02-29$)/, // 请填写有效的日期，格式:yyyy-mm-dd
  time: /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, // 请填写有效的时间，00:00到23:59之间
  email: /^[\w \\+ \\-]+(\.[\w\\+\\-]+)*@[a-z\d\\-]+(\.[a-z\d\\-]+)*\.([a-z]{2,4})$/i, // 请填写有效的邮箱
  url: /^(https?|s?ftp):\/\/\S+$/i, // 请填写有效的网址
  qq: /^[1-9]\d{4,}$/, // 请填写有效的QQ号
  IDcard: /^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, // 请填写正确的身份证号码
  // eslint-disable-next-line no-useless-escape
  tel: /^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, // 办公或家庭电话,请填写有效的电话号码
  mobile: /^(1[3456789]\d{9})$/, // 移动电话
  zipstatus: /^\d{6}$/, // 请检查邮政编码格式
  chinese: /^[\u0391-\uFFE5]+$/, // 请填写中文字符
  username: /^\w{3,12}$/, // 请填写3-12位数字、字母、下划线, 用户名
  password: /^[\S]{8,16}$/, // 请填写6-16位字符，不能包含空格, 密码
  strongPwd: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/, // 请填写8-16位字符，必须包含数字，字母
  code: /^[\S]{6,10}$/ // 请填写6-10验证码
}

// 文件名随机
export const getUuid = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export const filterInput = (s) => {
  if (s === '' || s === null || s === undefined) return s
  return /<script.*?>.*?<\/script>/gi.test(s.toString())
    ? s.toString().replace(/<script.*?>.*?<\/script>/gi, '')
    : s
}

/**
 * 函数节流（throttle）
 * 函数预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
 * **/
export const throttle = (method, duration) => {
  let begin = new Date().getTime()
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    const current = new Date().getTime()
    if (current - begin >= duration) {
      method.apply(context, args)
      begin = current
    }
  }
}

/**
 * 格式化文件大小
 */
export const formatSize = (value) => {
  if (value === null || value === '') {
    return '0'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  //  保留的小数位数
  size = size.toFixed(2)
  return size + unitArr[index]
}

/*
 * 下载(避免浏览器拦截)
 * 兼容带参数的下载
 * */
export const downLoadFile = (url, name) => {
  const f = document.createElement('form')
  document.body.appendChild(f)
  const urlArr = url.split('?')
  const quaryStr = urlArr.length > 0 ? urlArr[1] : ''
  const arr1 = quaryStr ? quaryStr.split('&') : ''
  if (arr1.length > 0) {
    for (let i = 0; i < arr1.length; i++) {
      const key = arr1[i].split('=')[0]
      const value = arr1[i].split('=')[1]
      const vi = document.createElement('input')
      vi.type = 'hidden'
      f.appendChild(vi)
      vi.value = decodeURIComponent(value)
      vi.name = key
    }
  }
  const input = document.createElement('input')
  input.type = 'hidden'
  f.appendChild(input)
  input.value = name || '5'
  input.name = 'file'

  f.target = '_blank'
  f.action = url // 下载的url 地址
  f.submit()
}

export const downLoadFileFrame = (url, type, name) => {
  if (type === 'swf') {
    downLoadFile(url, name)
    return
  }
  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.style.display = 'none'
  iframe.onload = () => {
    document.body.removeAttribute(iframe)
  }
  document.body.appendChild(iframe)
}

/**
 * 简单封装取消Axios请求对象
 */
export class AxiosCancel {
  CancelToken = undefined
  cancelFun = null
  /**
   * 初始化必须传入axios对象
   * @param {*} axios 对象
   */
  constructor (axios) {
    this.CancelToken = axios.CancelToken
  }

  setAxios (axios) {
    this.CancelToken = axios.CancelToken
    return this
  }

  token () {
    return new this.CancelToken((c) => {
      // c 就是CancelToken中给executor传入的cancel方法
      this.cancelFun = c
    })
  }

  cancel (msg) {
    if (this.cancelFun && this.cancelFun !== null) {
      this.cancelFun(msg || '取消请求')
    }
  }

  isCancel (axios, error) {
    return axios.isCancel(error)
  }
}
