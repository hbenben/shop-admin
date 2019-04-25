<template>
  <div class="admin-container">
    <el-container>
      <el-aside width="auto">
        <!-- 引入Aside组件 -->
        <!-- 数据绑定，先自定义属性名为collapse，isCollapse是父组件的数据 -->
        <Aside :collapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header @handleLogout="handleLogout"></Header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 1引入组件
import Aside from "../components/Aside/Aside.vue";
// 引入头部的组件
import Header from "../components/Header/Header.vue"
export default {
  //2注册组件
  components: {
    Aside,
    Header
  },
  // 第一步先设置data数据，把值传给Aside组件
  data(){
    return{
      isCollapse:false
    }
  },
  // 第四步，父组件通过事件名接收到子组件传过来的数据
  methods:{
    handleLogout:function(){
      this.isCollapse=!this.isCollapse
    }
  }
 
};
</script>

<style escoped >
* {
  padding: 0;
  margin: 0;
}
 .el-header{
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    position: relative
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  /* 首页布局的高度需要修改为100% */
  .admin-container > .el-container {
    position:absolute;
    width:100%;
    top:0; 
    bottom:0;     
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
