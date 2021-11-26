import Vue from 'vue'
import App from './App.vue'
import router from './router'
import RegisterBSComponent from './components/index.js'
RegisterBSComponent.register();

import 'bs-vue-base/dist/assets/menu/iconfont.css' //字体图标样式文件
import 'bs-vue-base/dist/assets/css/base.scss' //基础样式文件

import BsBase from 'bs-vue-base' 

Vue.use(BsBase);

import bsSeed from 'bs-vue-seed'
Vue.use(bsSeed);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
