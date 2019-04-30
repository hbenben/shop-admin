<template>
  <!-- <div>
    <el-row>
    <i class="el-icon-back"></i>
    <div> admin 超级管理员 退出</div>
    </el-row>
  </div>-->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
  >
    <i
      @click="handleLogout"
      class="el-icon-back"
    ></i>
    <div>
      {{username}} {{realname}} <span
        class="logout"
        @click="handleExit"
      >退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  data: function () {
    return {
      username: localStorage.getItem('username'),
      realname: localStorage.getItem('realname')
    }
  },
  methods: {
    //实现兄弟组件的传值,
    //第三部，子组件通过事件，来传递属性,就是子组件通过自定义事件名,
    //子组件自定义事件名handleLogout，就是：handleLogout=“父组件的事件名”，其中:handleLigout是子组件的事件名
    handleLogout: function () {
      this.$emit("handleLogout")
    },
    //退出登录
    handleExit: function () {
      this.$axios({
        method: 'get',
        url: '/admin/account/logout'
      }).then(res => {
        //点击退出之后,先拿到res.data里面的status的状态码，根据状态码来进行判断
        const {status}=res.data;
        // console.log(res);
        if(status==0){
          //跳转到登录页面，并且删掉localstorage,直接使用replace进行替换当前页面，不是进行跳转
          this.$router.replace('/login')
          localStorage.removeItem('username')
          localStorage.removeItem('realname')
        }
      })
    }
  }
};
</script>

<style>
.el-icon-back,
.logout {
  cursor: pointer;
}
</style>
