import Vue from 'vue'
import App from './App.vue'
import bsSeed from 'bs-vue-seed'

Vue.config.productionTip = false

Vue.use(bsSeed);
//  Vue.component(HelloWorld.name, HelloWorld)
//  Vue.component(HelloWorld1.name, HelloWorld1)
new Vue({
  render: h => h(App),
}).$mount('#app')
