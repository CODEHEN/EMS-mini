import Vue from 'vue'
import App from './App'
import request from "./utils/request";
import Notify from './wxcomponents/vant/dist/notify/notify';
import store from './store'
Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.$notify = Notify
Vue.prototype.$store = store

// 定义全局数据
Vue.prototype.baseUrl = "微信小程序2223"
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
