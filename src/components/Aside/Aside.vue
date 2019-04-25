<template>
  <div class="aside_container">
      <el-col :span="12">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="collapse"
        >
        <!-- 这里进行数据循环和绑定，要注意标签里面的index是一个字符串，for循环中的index是number，数据格式不一样 -->
          <el-submenu v-for="(item,index) in menus" :key="index"
          :index="`${index+1}`">
            <template slot="title">
              <i :class="item.icon"></i>
              <span> {{item.name}}</span>
            </template>

              <el-menu-item 
              v-for="(item2,index2) in item.children" 
              :key="index2"
              :index="`${index+1}-${index2+1}`">
              <!-- 不要混淆router-link和router-view -->
                <router-link :to="item2.src">{{item2.name}}</router-link>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
  </div>
</template>
<script>
export default {
  data(){
    return{
      menus:[
        {
          icon:"el-icon-menu",
          name:"购物商城",
          children:[
            {
              name:"商品管理",src:"/admin/goods-list",
            },
            {
              name:"栏目管理",src:"/admin/category-list"
            }
          ]
        },
        {
          //会员管理
          icon:"el-icon-service",
          name:"会员管理",
          children:[
            {
              name:"会员列表",src:"/admin/account-list",
            }
          ]
        },
        {
          icon:"el-icon-tickets",
          name:"商城订单",
          children:[
            {
              name:"订单管理",src:"/admin/order-list"
            }
          ]
        }
      ]
    }
  },
  //实现兄弟组件的传值
  //第二步，先接收父组件传过来的值
  //   第二步，接收父组件传过来的值，其中父组件中的自定义属性名为collapse，所以这里接收
  props:{
    collapse:{
      //属性的类型
      type:Boolean,
      //属性的默认值,true是收起,false是展开
      value:false
    }
  },
  methods: {
  }
};
</script>
<style escaped>

.el-menu:not(.el-menu--collapse) {
        width: 200px;
    }
    
    .el-menu{
        border-right: none;
    }
    .el-menu-vertical-demo{
      background: #001529;
      height:100%;
    }

    .el-menu a{
        color: inherit;
        text-decoration: none;
    }
    .aside_container{
      height: 100%;
      background: #001529;
    }
</style>
