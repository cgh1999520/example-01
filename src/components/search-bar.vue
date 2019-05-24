<template>
  <div class="dis-inline-block">
    {{title}}：
    <Input v-if="input" suffix="ios-search" v-model.trim="searchData.searchTx"
           :placeholder="inputPlaceholder" class="mg-right-20" :style="{width: inputWidth}"/>
    <DatePicker v-if="date" type="daterange"
                :value="searchData.date"
                :editable="false"
                @on-change="onDateSelectChange"
                placement="bottom-end" class="mg-right-20 w-200" placeholder="筛选日期"
                ></DatePicker>
    <slot></slot>
    <Button type="success" @click="onSearch">搜索</Button>
    <Button @click="onClearSearch">清空筛选</Button>
  </div>
</template>

<script>
import {resetObjParam} from '../utils/utils'

export default {
  name: 'search-bar',
  props: {
    title: { // 标题
      type: String,
      required: true
    },
    date: { // 是否搜索时间
      type: Boolean,
      default: true
    },
    input: { // 搜索框
      type: Boolean,
      default: true
    },
    inputWidth: { // 输入框宽度
      type: String,
      default: 'auto'
    },
    inputPlaceholder: {
      type: String,
      default: '手机号名称'
    }
  },
  data () {
    return {
      searchData: {
        searchTx: '',
        date: []
      }
    }
  },
  methods: {
    /**
     * @Description: 日期选择完成事件
     * @date 2019/5/10  9:28
    */
    onDateSelectChange (date) {
      this.searchData.date = date
    },
    /**
     * @Description: 点击搜索按钮
     * @date 2019/5/10  9:29
    */
    onSearch () {
      this.$emit('finish', this.searchData)
      // 搜索前，复位页码
      this.$bus.emit('updateListData')
    },
    /**
     * @Description: 点击清除按钮
     * @date 2019/5/10  9:30
    */
    onClearSearch () {
      // 清除搜索前，复位页码
      this.searchData = resetObjParam(this.searchData)
      this.$emit('clear', this.searchData)
      this.$bus.emit('updateListData')
    }
  }
}
</script>

<style scoped>

</style>
