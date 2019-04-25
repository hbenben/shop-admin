<template>
  <!-- <div>
    <el-row>
    <i class="el-icon-back"></i>
    <div> admin 超级管理员 退出</div>
    </el-row>
  </div>-->
  <el-row type="flex" justify="space-between" align="middle">
   <i @click="handleLogout" class="el-icon-back"></i>
   <div>
     admin 超级管理员 <span class="logout">退出</span>
   </div>
  </el-row>
</template>

<script>
export default {
  methods:{
    //实现兄弟组件的传值,
    //第三部，子组件通过事件，来传递属性,就是子组件通过自定义事件名,
    //子组件自定义事件名handleLogout，就是：handleLogout=“父组件的事件名”，其中:handleLigout是子组件的事件名
    handleLogout:function(){
      this.$emit("handleLogout")
    }
  }
};
</script>

<style>
.el-icon-back,.logout{
  cursor: pointer;
}
</style>
