<template>
  <Modal
    :closable="false"
    :mask-closable="false"
    title="处理工单内容"
    v-model="isShowDialog">
    <Form ref="formEl" :rules="rulesValid" :model="formData" :label-width="80">
      <FormItem label="工单内容" v-if="originalData">
          {{originalData.content}}
      </FormItem>
      <FormItem label="处理结果" prop="dealContent">
        <Input v-model.trim="formData.dealContent" type="textarea" :rows="2" placeholder="请输入处理结果"/>
      </FormItem>
    </Form>
    <div class="tx-right" slot="footer">
      <Button class="mg-right-20" @click="onCancel" type="warning">取消</Button>
      <Button @click="onSubmit" type="success">确定</Button>
    </div>
  </Modal>
</template>

<script>
import AddOrEditDialogMixin from '../../mixins/add-or-edit-dialog-mixin'

export default {
  name: 'manage-work-order-dialog',
  mixins: [AddOrEditDialogMixin],
  data () {
    return {
      formData: { // 表单数据
        dealContent: ''
      },
      rulesValid: { // 表单验证
        dealContent: [
          {required: true, message: '请输入处理结果', trigger: 'change'},
          {min: 6, message: '至少输入6个字符', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    /**
     * @Description: 点击取消
     * @date 2019/5/23  20:07
    */
    onCancel () {
      if (this.cancel) {
        this.cancel()
      }
      this.isShowDialog = false
    },
    /**
       * @Description: 点击确定
       * @date 2019/5/9  20:01
       */
    onSubmit () {
      this.$refs.formEl.validate((valid) => {
        if (valid) {
          this.formData.status = 2 // 更改处理结果状态
          this.finish(this.formData).then(() => { this.isShowDialog = false })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
