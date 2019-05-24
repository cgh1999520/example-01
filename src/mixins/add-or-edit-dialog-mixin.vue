<script>
import {commonGetItemData} from '../api/module/common'
import {copyObj, dataToFloat} from '../utils/utils'

export default {
  name: 'add-or-edit-dialog-mixin',
  data () {
    return {
      type: 'add', // 类型
      isShowDialog: false,
      isLoading: false,
      originalData: undefined, // 原视数据
      formData: {
        id: ''
      }
    }
  },
  props: {
    baseUrl: { // 用户角色基本请求地址
      type: String,
      required: true
    },
    finish: { // 添加/编辑 完成事件回调
      type: Function,
      required: true
    },
    cancel: { // 取消事件回调
      type: Function
    }
  },
  methods: {
    /**
     * @Description: 开关按钮发生改变
     * @date 2019/5/20  20:04
     */
    switchChange (key, event) {
      this.formData[key] = event ? 1 : 0
    },

    /**
     * @Description: 获取 当前Item 数据
     * @date 2019/5/14  15:17
    */
    getItemData (params) {
      commonGetItemData(this.baseUrl, {id: params.id}).then(res => {
        this.isShowDialog = true
        this.originalData = res
        // 这里数据 转 float ，因为后台数据，有的是字符串， 但是使用的组件只接受number类型，所以这里进行了过滤
        this.formData = dataToFloat(copyObj(res, this.formData))
      })
    },
    /**
       * @Description: 添加或者编辑Item
       * @date 2019/5/14  9:48
       */
    addOrEditItem (res) {
      // 如果userData 不为空，则表示当前为编辑
      this.type = res === undefined ? 'add' : 'edit'
      this.originalData = {undefined}
      this.formData.id = ''

      // 复位表单验证
      this.$refs.formEl.resetFields()
      if (res) {
        this.getItemData(res)
      } else {
        this.isShowDialog = true
      }
    }
  }
}
</script>
