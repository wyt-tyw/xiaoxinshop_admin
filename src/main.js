import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'


import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios请求拦截
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //在最后必须return config
  return config;
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,   
  render: h => h(App)   //通过render函数把App根组件渲染到了页面上
}).$mount('#app')
