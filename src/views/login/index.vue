<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" label-position="left" :rules="loginFormRules" :model="loginForm">
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-user-solid" />
        <el-input v-model="loginForm.mobile" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- <span class="svg-container el-icon-user-solid" /> -->
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" ref="pwd" />
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
        </span>
        <!-- <span class="svg-container el-icon-user-solid" /> -->
      </el-form-item>

      <el-button :loading="loading" type="primary" class="loginBtn" style="width:100%;margin-bottom:30px;" @click="onLogin">登录</el-button>
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validMobile = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      passwordType: 'password',
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginFormRules: {
        mobile: [
          { required: true, message:'请填写手机号', trigger: 'blur' },
          {
            validator: validMobile,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]

      }
    }
  },

  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
      this.$refs.pwd.focus()
     })
    },
    async onLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.loginForm)
        this.$router.push('/')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray: #68b0fe;;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      :deep(&:-webkit-autofill) {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
}
.el-form-item__error {
    color: #fff
  }
</style>

<style lang="scss" scoped>
$bg:#d2e3ff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .loginBtn{
      background-color: #407ffe;
      height: 64px;
      line-height: 32px;
      font-size: 24px;
      width:100%;
      margin-bottom: 30px;
      border:none;
      color: #fff;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
