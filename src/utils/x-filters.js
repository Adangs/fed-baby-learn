// 全局过滤器
export default {
  /**
   * 用户昵称超过6个字符，超出部分显示...，英文算0.5
   * */
  formatNickname(value = '', length = 6) {
    const name = []
    let t = 0
    for (let a = value.length, n = -1, r = 0; r < a; r++) {
      n = value.charCodeAt(r)
      t += n >= 0 && n <= 128 ? 0.5 : 1
      if (Math.ceil(t) <= length) {
        name.push(value[r])
      } else {
        name.push('...')
        break
      }
    }
    return name.join('')
  },
  /**
   * 小数点后补多位0   ==>  12.00000000 || 12.12340000
   * */
  formatZero(number = 0, n = 2) {
    if (n <= 0) {
      return Math.round(number)
    }
    number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n) // 四舍五入
    number = Number(number).toFixed(n) // 补足位数
    return number
  },
  /**
   * 数据格式化保留小数点   ==>  12,345.12 || 12345.12
   * @param {number} value
   * @param {number} precision 保留小数点
   * @param {boolean} separate 千分位符
   * */
  formatNumber(value = 0, precision = 2, separate = false) {
    const multiple = Math.pow(10, precision)
    if (separate) {
      return Math.round(Number(value) * multiple) / multiple
    } else {
      return (Math.round(Number(value) * multiple) / multiple).toLocaleString()
    }
  },
  /**
   * 格式化日期
   * */
  formatDate(time, b = 'yyyy-MM-dd hh:mm:ss') {
    if (!arguments.length) {
      return ''
    }
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (typeof time === 'string') {
        if ((/^\d+$/.test(time))) {
          time = parseInt(time)
        } else {
          time = time.replace(/-/gi, '/')
        }
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const c = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(b)) {
      b = b.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const a in c) {
      if (new RegExp('(' + a + ')').test(b)) {
        b = b.replace(RegExp.$1, RegExp.$1.length === 1 ? c[a] : ('00' + c[a]).substr(('' + c[a]).length))
      }
    }
    return b
  },
  /**
   * clean Array
   * */
  cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },
  /**
   * Object to param
   * {a: 1, b: 2} => a=1&b=2
   * */
  object2param(json) {
    if (!json) return ''
    return this.cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return key + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  }
}
