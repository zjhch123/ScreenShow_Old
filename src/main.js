// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DoubleClick from './util/dbClick'

Vue.config.productionTip = false

Vue.directive('dbclick', {
  bind(el, binding, vnode) {
    const funcName = binding.expression
    el.dbclickFunc = DoubleClick(vnode.context[funcName], 300)
    el.addEventListener('click', el.dbclickFunc)
  },
  unbind(el, binding, vnode) {
    el.removeEventListener('click', el.dbclickFunc)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
