<template>
  <div id="app">
    <router-link to="/login">跳转登录页面</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  // mounted(){
  //   // 请求数据
  //   this.$axios.get('https://api.github.com/users').then(res => {
  //     console.log(res.data)
  //   })
  // }
}
</script>

<style>

</style>
