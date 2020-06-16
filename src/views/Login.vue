<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>

    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="showPayModal=true">手机短信登录/注册</div>
            <div class="reg">
              <a @click="showPayModal=true">立即注册</a>
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 注册弹窗 -->
    <modal
      title="注册"
      btnType="3"
      :showModal="showPayModal"
      sureText="注册"
      cancelText="取消"
      @cancel="showPayModal=false"
      @submit="register"
    >
      <template v-slot:body>
        <el-form :model="loginForm" :rules="loginFormRules" status-icon ref="loginFormRef">
          <el-form-item label="用户" prop="regusername">
            <el-input v-model="loginForm.regusername"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="regpassword">
            <el-input type="password" v-model="loginForm.regpassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </modal>
    <nav-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Form, FormItem, Input } from 'element-ui'
import Modal from './../components/Modal'
import NavFooter from '../components/NavFooter'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      userId: '',
      showPayModal: false,
      loginForm: {
        regusername: '',
        regpassword: '',
        email: ''
      },

      loginFormRules: {
        regusername: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        regpassword: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    login() {
      let { username, password } = this
      this.axios
        .post('/user/login', {
          username,
          password
        })
        .then(res => {
          this.$cookie.set('userId', res.id, { expires: 'Session' })
          // this.$store.dispatch('sevaUserName', res.username)
          this.sevaUserName(res.username)
          this.$router.push({
            name: 'index',
            params: {
              from: 'login'
            }
          })
        })
    },
    ...mapActions(['sevaUserName']),
    //注册
    register() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.axios
          .post('/user/register', {
            username: this.loginForm.regusername,
            password: this.loginForm.regpassword,
            email: this.loginForm.email
          })

          .then(() => {
            this.showPayModal = false
            this.$message.success('注册成功')
          })
      })
    }
  },
  components: {
    NavFooter,
    Modal,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input
  }
}
</script>

<style lang="scss">
@import './../assets/scss/base.scss';
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .el-form-item__content {
    line-height: 40px;
    display: inline-block;
    width: 348px;
    margin-bottom: 20px;
  }
}
</style>

