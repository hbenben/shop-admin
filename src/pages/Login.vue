<template>
  <div class="login-form">
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <p class="login-title">登录</p>

      <!-- prop 指定规则查找 -->
      <el-form-item label="账号" prop="uname">
        <!-- 双向数据绑定 -->

        <el-input type="text" v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input type="password" v-model="form.upwd"></el-input>
      </el-form-item>
      <el-form-item class="fromSubmit">
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
        uname: "admin",
        upwd: "123456"
      },
      //这里进行表单的验证
      rules: {
        //多条规则，不同状态下面触发
        //require 是否必填
        //message是报错信息
        //trigger是什么时候触发
        uname: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        upwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("提交");
      //这里记性表单的验证，找到表单元素，调用表单验证
      this.$refs.form.validate(valid => {
        //当验证不通过的时候，直接返回，不进行页面的跳转
        //valid是一个布尔值，看文档,当表单中验证通过的时候valid，为true，验证不通过的时候，返回false
        if (!valid) return;
        this.$axios({
          method:"post",
          url:'/admin/account/login',
          data:this.form,
          //处理跨域请求
          withCredentials:true
        }).then(res=>{
          //这里使用es6的结构解析
          const {status,message}=res.data;
          //判断是否登录成功
          if(status==0){
            //调到后台的首页
            //登录成功之后要将用户信息保存吗，使用localstorage
            localStorage.setItem('username',message.uname);
            localStorage.setItem('realname',message.realname);
            this.$router.push("/admin");
          }else{
            //登录失败,提示信息
            this.$message({
              //将后台返回登录错误的信息提示，显示出来
              message:message,
              type:'success'
            })
          }
        })
      });

      // this.$axios
      //   .post("http://127.0.0.1:8899/admin/account/login", this.form)
      //   .then(res => {
      //     console.log(res);
      //     // 使用解构赋值的方式
      //     const { status, message } = res.data;
      //     if (status == 0) {
      //       //登录成功，跳转页面,注意这里的this.$router假如使用function的话，是不能识别router，因为this 的指向不一样，要使用箭头函数，this 的指向就是window，function的this指向是上面的对象
      //       this.$router.push("./admin");
      //     } else {
      //       //登录失败
      //       this.$message({
      //         message: message,
      //         type: "success"
      //       });
      //     }  
      //   });
    },

    
    oncancle: function() {
      //点击取消清除掉表单元素
      this.form.uname = "";
      this.form.upwd = "";
    }
  }
};
</script>
<style scoped lang="less">
.login-form {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -200px 0 0 -225px;
}
.login-title {
  text-align: center;
  margin-left: 80px;
  color: #409eff;
  font-size: 16px;
  line-height: 50px;
}
.fromSubmit {
  margin-left: 80px;
}
</style>
