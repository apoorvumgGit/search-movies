import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMobileDetection from "vue-mobile-detection";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MovieInfo from './components/MovieInfo.vue'


Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueMobileDetection);
const routes =[
  // {path:'/',component:MovieInfo},
  {path:'/:movieId',component:MovieInfo},
]
const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes
})
export const eventBus = new Vue();
Vue.config.productionTip = false

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
