export default {
  // API: 'https://dev.api.com/', // 生产地址
  // API: 'https://dev.api.com/', // 测试地址
  API: process.env.NODE_ENV === 'development' ? 'https://dev.api.com/' : 'https://dev.api.com/',
  LOG: process.env.NODE_ENV === 'development', // dev环境打印log
  version: '1.0.0',
  // 各平台独立参数
  platform: {
    'mp-alipay': {
      type: 0
    },
    'mp-touiao': {
      type: 1
    },
    'mp-weixin': {
      type: 2
    }
  }
}
