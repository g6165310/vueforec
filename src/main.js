import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import store from './store';
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import VueTypedJs from 'vue-typed-js'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(Notifications)
Vue.use(VueSweetalert2)
Vue.component('Loading',Loading)
Vue.use(VueTypedJs)
Vue.filter("currency",currencyFilter)
Vue.filter("date",dateFilter)
Vue.config.productionTip = false
axios.defaults.withCredentials = true;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
if(to.meta.requiresAuth){
  const api = `${process.env.VUE_APP_API}/api/user/check`;
  const vm = this;
  axios.post(api).then(response => {
    console.log(response)
    if (response.data.success) {
      next()
    }else{
      alert('請重新登入')
      next({
        path:'/login'
      })
    }
  });
}else{
  next();
}
})