// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './themes/common.styl'

Vue.config.productionTip = false
fastclick.attach(document.body)
// Lazyload for image see the origin code
Vue.use(VueLazyload, {
  error: require('@/assets/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

// 需要编译器
// new Vue({
//   template: '<div>{{ hi }}</div>'
// })

// 不需要编译器
// new Vue({
//   render (h) {
//     return h('div', this.hi)
//   }
// })
