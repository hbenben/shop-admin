//这里进行路由的配置，然后在main.js中欧冠引入好就行了
import Login from './src/pages/Login.vue';
//引入登录成功之后的组件
import Admin from './src/pages/goods/GoodList';

var routes=[
  {
    //后台的首页，然后要路由重定向到登录页面
    path:'/',
    redirect:'/login',
    name:'login'
  },
  {
    //登录页面的路由
    path:'/login',
    component:Login,
    name:'login'
  },
  {
    //登录成功之后实现跳转到后台管理页面admin
    path:'/admin',
    component:Admin,
    redirection:'admin/goods-list',
    name:'admin'
  }
]
//然后将路由信息暴露出去
// export default routers 必须写在文件底部， 而且后面还需要接一空行， 否则无法通过 ESlint 语法验证
export default routes;