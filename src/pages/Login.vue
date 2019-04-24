<template>
  <div class="login-form">
    <el-form :model="form" label-width="100px">
      <el-form-item label="账号" prop="pass">
        <!-- 双向数据绑定 -->
        <el-input type="text" v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="form.upwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="oncancle()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //这个是es6的缩写
  data() {
    return {
      form: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("提交");
      this.$axios
        .post("http://127.0.0.1:8899/admin/account/login", this.form)
        .then(function(response) {
          // console.log(response);
          //登录成功之后就跳转admin中得到goods-list页面
          this.$router.push({
            path:'/admin'
          })

        });
    },
    oncancle:function(){
      //点击取消清除掉表单元素
      this.form.uname="";
      this.form.upwd="";
    }
  }
};
</script>
<style lang="less">
.login-form {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -200px 0 0 -225px;
}
.login-title {
  text-align: center;
  color: #409eff;
  font-size: 16px;
}
</style>
