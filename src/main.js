import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
//5引入vue中的路由
import VueRouter from 'vue-router';
//1引入elementui
import ElementUI from "element-ui";
//2引入样式组件
import 'element-ui/lib/theme-chalk/index.css';
//引入路由配置
import routes from '../router.config.js'
//3注册组件
Vue.use(ElementUI);
//将axios绑定到实例中，让全部组件可以直接使用，类似于this.$emit  this.$event，自定义一个方法，全局使用this.$axios
//6引入对应的登录组件
// import Login from './pages/Login.vue';
//7注册路由组件
Vue.use(VueRouter);
//8配置路由
// const routes=[
//   {path:'/login',component:Login},
// ];
//9创建路由对象
const router = new VueRouter({routes})
//路由守卫，路由拦截器,先创建路由对象，利用路由对象总的方法来实现路由拦截
// router.beforeEach((to,from,next)=>{

// })

// 是否是生成环境,阻止vue的警告，在console.log中生成的警告
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;
//公共的路由前缀，每次axios请求的时候都会自动加上这串路由
axios.defaults.baseURL="http://localhost:8899"

Vue.config.productionTip = false

new Vue({
  //10路由挂载到根实例
  router,
  render: h => h(App),
}).$mount('#app')
