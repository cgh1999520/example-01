<template>
  <Layout>
    <Header class="header-bar-bg">
      <search-bar title="搜索反馈" @finish="onSearch"
                  input-placeholder="用户/内容"
                  :date="false"></search-bar>
    </Header>
    <Content>
      <Table :data="listData" :loading="tableLoading" :columns="columns">   </Table>
      <Page :total="listTotal" show-total
            v-show="listTotal > listParams.pageSize"
            :page-size="listParams.pageSize"
            class="mg-top-10 tx-center" @on-change="pageChange"></Page>
    </Content>
  </Layout>
</template>

<script>
import ListMixin from '../../mixins/list-mixin'
export default {
  name: 'feedback-manage',
  mixins: [ListMixin],
  data () {
    return {
      baseListUrl: 'member/webManager/feedback',
      listParams: {
        name: ''
      },
      columns: [
        {title: '内容', key: 'content'},
        {title: '用户编号', key: 'number'},
        {title: '用户名', key: 'userName'},
        {title: '手机号', key: 'phone'},
        {title: '创建时间', key: 'createTime', width: 100}
      ]
    }
  },
  methods: {
  }
}
</script>
