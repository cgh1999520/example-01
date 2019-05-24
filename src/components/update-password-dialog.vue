<template>
  <Modal
    :closable="false"
    :mask-closable="false"
    title="更改密码"
    v-model="isShowDialog">
    <Form ref="formEl" :rules="rulesValid" :model="formData" :label-width="120">
      <FormItem label="密码" prop="oldPassword">
        <Input v-model.trim="formData.oldPassword" placeholder="请输入旧密码" type="password"/>
      </FormItem>
      <FormItem label="新密码" prop="password1">
        <Input v-model.trim="formData.password1" placeholder="请输入新密码" type="password"/>
      </FormItem>
      <FormItem label="确认新密码" prop="password2">
        <Input v-model.trim="formData.password2" placeholder="请再次输入新密码" type="password"/>
      </FormItem>
    </Form>
    <div class="tx-right" slot="footer">
      <Button class="mg-right-20" @click="isShowDialog = false" type="warning">取消</Button>
      <Button @click="onSubmit" type="success">确定</Button>
    </div>
  </Modal>
</template>

<script>
import {validPassword} from '../utils/regular'
import {updatePassword} from '../api/module/auth'

export default {
  name: 'update-password-dialog',
  data () {
    // 检测两次密码是否相同
    const validPswIdentical = (rule, value, callback) => {
      if (value !== this.formData.password1) {
        callback(new Error('设置的新密码，与确认新密码不同'))
        return
      }
      callback()
    }

    return {
      isShowDialog: false,
      formData: { // 表单数据
        oldPassword: '',
        password1: '',
        password2: ''
      },
      rulesValid: {
        oldPassword: [
          {required: true, message: '请输入旧密码', trigger: 'blur'},
          {validator: validPassword, trigger: 'blur'}
        ],
        password1: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {validator: validPassword, trigger: 'blur'}
        ],
        password2: [
          {required: true, message: '请再次输入新密码', trigger: 'blur'},
          {validator: validPassword, trigger: 'blur'},
          {validator: validPswIdentical, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    /**
       * @Description: 更改密码
       * @date 2019/5/13  17:10
       */
    updatePassword () {
      this.$refs.formEl.resetFields()
      this.isShowDialog = true
    },
    /**
       * @Description: 点击确定修改密码事件
       * @date 2019/5/13  17:06
       */
    onSubmit () {
      this.$refs.formEl.validate(valid => {
        if (valid) {
          updatePassword(this.formData).then(res => {
            sessionStorage.removeItem('token')
            this.$Message.success('更改密码成功，请重新登录')
            this.$router.replace({
              path: '/auth/login'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
