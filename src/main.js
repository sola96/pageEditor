import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import "@/assets/reset.scss"
import elementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

Vue.use(elementUI)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
