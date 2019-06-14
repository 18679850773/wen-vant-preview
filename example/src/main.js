import Vue from 'vue'
import App from './App.vue'
import bsSeed from 'bs-vue-seed'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.config.productionTip = false

Vue.use(bsSeed);
Vue.use(Element);
//  Vue.component(HelloWorld.name, HelloWorld)
//  Vue.component(HelloWorld1.name, HelloWorld1)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
