import Vue from 'vue'
import App from './App'
import XRequest from './utils/x-request'
import * as XFilters from './utils/x-filters'

// 全局request请求
Vue.prototype.$http = XRequest
// 全局过滤器
Vue.prototype.$filters = XFilters.default

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
