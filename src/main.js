import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from "axios"
import store from "../src/store/index"
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import animated from 'animate.css'
import './assets/iconfont.css'
import {loadToken} from "./utils/index"
Vue.use(ElementUI);
Vue.use(animated)
// 请求拦截
axios.interceptors.request.use(
  config=>{
    if(store.getters.token){
      config.headers['Authorization']=`Bearer ${loadToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  response=>{
    const res=response.data
    if(res.code==-2){
      return res
    }else{
      return res
    }
  },
  error=>{
    return res
  }
)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
