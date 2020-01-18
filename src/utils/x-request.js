import config from '../config'
import store from '../store'

export default (options = {}) => {
  options = Object.assign({ method: 'GET', data: {}, error: true }, options)
  if (config.LOG) {
    console.info(`${new Date().toLocaleString()}【 API=${config.API + options.url} 】DATA=${JSON.stringify(options.data)}`)
  }
  // console.log('store', store.state)
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.API + options.url,
      data: Object.assign({
        version: config.version,
        channel: process.env.VUE_APP_PLATFORM
      }, options.data),
      method: options.method.toUpperCase(),
      header: {
        'oauth-type': config.platform[process.env.VUE_APP_PLATFORM].type, // 平台类型
        'token': store.state.user.token // token
      },
      success: (res) => {
        const { statusCode, data } = res
        if (statusCode >= 200 && statusCode < 300) {
          if (config.LOG) {
            console.info(`${new Date().toLocaleString()}【 API=${config.API + options.url} 】【接口响应：】`, res.data)
          }
          if (!data.success) {
            // 是否统一弹出错误提示信息
            if (options.error) {
              uni.showToast({
                title: data.msg || data.code,
                icon: 'none',
                mask: true
              })
            }
            return reject(data)
          }
          return resolve(data)
        } else {
          throw new Error(`网络请求错误，状态码${statusCode}`)
        }
      }
    })
  })
}
