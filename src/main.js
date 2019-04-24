import Vue from 'vue'
import App from './App.vue'

//1引入elementui
import ElementUI from "element-ui";
//2引入样式组件
import 'element-ui/lib/theme-chalk/index.css';
//3注册组件
Vue.use(ElementUI);
//将axios绑定到实例中，让全部组件可以直接使用，类似于this.$emit  this.$event，自定义一个方法，全局使用this.$axios
import axios from 'axios';
Vue.prototype.$axios=axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
