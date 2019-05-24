<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(info, i) in infoCardData" :key="`infor-${i}`"
             style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="info.color" :icon="info.icon" :icon-size="36">
          <count-to :end="info.count" count-class="count-style"/>
          <p>{{ info.title }}</p>
        </infor-card>
      </i-col>
    </Row>
<!--    <Table :columns="" :data="">

    </Table>-->
  </div>
</template>

<script>
import InforCard from '@/libs/info-card'
import CountTo from '@/libs/count-to'
import ListMixin from '../mixins/list-mixin'

export default {
  name: 'home',
  components: {
    InforCard,
    CountTo
  },
  mixins: [ListMixin],
  data () {
    return {
      baseListUrl: 'statistics',
      columns: [
        {
          title: '日期',
          key: 'date'
        }
      ],
      infoCardData: [
        {title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0'},
        {title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b'},
        {title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900'},
        {title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14'},
        {title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB'},
        {title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4'}
      ]

    }
  },
  methods: {}
}
</script>

<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>
