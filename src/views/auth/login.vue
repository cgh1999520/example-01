<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/libs/login-form'
import {loginSystem} from '../../api/module/auth'
import {mapActions} from 'vuex'
export default {
  name: 'login',
  components: {
    LoginForm
  },
  methods: {
    ...mapActions({
      loginSystem: 'auth/loginSystem'
    }),
    handleSubmit (data) {
      // 登录系统
      loginSystem(data).then(res => {
        sessionStorage.token = res
        this.$router.replace({
          path: '/home'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    background-image: url('../../../static/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con{
        padding: 10px 0 0;
      }
      .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }

</style>
