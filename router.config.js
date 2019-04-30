//这里进行路由的配置，然后在main.js中欧冠引入好就行了
import Login from './src/pages/Login.vue'
//引入登录成功之后的组件
import Admin from './src/pages/Admin.vue'
//引入商品列表的组件
import GoodsList from './src/pages/goods/GoodList.vue'

var routes=[
  {
    //路由重定向
    path:'/',
    redirect:'/login'
  },
  {
    //登录页面的路由
    path:'/login',
    component:Login,
    name:'login',
    meta:'登录'
  },
  {
    //登录成功之后的页面
    path:'/admin',
    component:Admin,
    name:'admin',
    meta:'后台管理',
    children:[
      {
        //注意子代不能添加/
        path:'goods-list',
        component:GoodsList,
        name:'goods-list',
        meta:'商品列表'
      }
    ]
  }
]
//然后将路由信息暴露出去
// export default routers 必须写在文件底部， 而且后面还需要接一空行， 否则无法通过 ESlint 语法验证
export default routes;