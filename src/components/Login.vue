<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <!-- prefix-icon:输入框前小图标 type="password"实现密码隐藏功能 v-model实现数据绑定-->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        //required: true表示为必填项
        //trigger: 'blur'表示文本框不被鼠标点击时触发验证行为
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符之间",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      //console.log(this); this指向登录组件的实例对象
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error('登录失败');
        this.$message.success('登录成功');
        //将登录成功之后的token，保存到客户端的sessionStorage中
        //原因：项目中除了登录之外的其他API接口，必须在登录之后才能访问；
        //token只应在当前网页打开期间生效，所以将token保存在sessionStorage中.
        window.sessionStorage.setItem('token', res.data.token);
        //通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push('/home');
      });
    },
  },
};
</script>


//lang="less"表示这一节点中支持less语法格式
//scoped是vue指令,用来控制组件样式生效的区间,表示只在当前组件内生效
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px; //圆角边框
  position: absolute; //绝对定位
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); //增加位移
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex; //弹性盒模型
  justify-content: flex-end; //尾部对齐
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box; //?
}
</style>
