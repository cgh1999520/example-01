<template>
  <Layout>
    <Header class="header-bar-bg">
      <search-bar title="搜索反馈" @finish="onSearch"
                  input-placeholder="用户"
                  :date="false" @clear="onClearSearch">
        <Select class="mg-right-20 w-100" v-model="listParams.status" placeholder="状态">
          <Option :value="''">全部</Option>
          <Option v-for="item in filterData.status"
                  :key="item.key" :value="item.key">{{ item.name }}
          </Option>
        </Select>
      </search-bar>
    </Header>
    <Content>
      <Table :data="listData" :loading="tableLoading" :columns="columns"></Table>
      <Page :total="listTotal" show-total
            v-show="listTotal > listParams.pageSize"
            :page-size="listParams.pageSize"
            class="mg-top-10 tx-center" @on-change="pageChange"></Page>
    </Content>

    <!--    处理结果弹窗-->
    <manage-work-order-dialog
      :base-url="baseListUrl"
      ref="manageWorkOrder"
      :cancel="getList"
      :finish="addOrUpdateRecord"></manage-work-order-dialog>
  </Layout>
</template>

<script>
import ListMixin from '../../mixins/list-mixin'
import ManageWorkOrderDialog from '../../components/system/manage-work-order-dialog'

export default {
  name: 'work-order-manage',
  components: {ManageWorkOrderDialog},
  mixins: [ListMixin],
  data () {
    return {
      baseListUrl: 'member/webManager/workOrder',
      listParams: {
        name: '',
        status: ''
      },
      filterData: {
        status: [{key: 0, name: '未读'}, {key: 1, name: '已读'}, {key: 2, name: '已处理'}]
      },
      columns: [
        {title: '用户编号', key: 'number', width: 150},
        {title: '用户名', key: 'userName', width: 150},
        {title: '联系方式', key: 'contact', width: 150},
        {title: '内容', key: 'content'},
        {title: '状态', key: 'status', width: 100},
        {title: '处理内容', key: 'dealContent'},
        {title: '创建时间', key: 'createTime', width: 100},
        {
          title: '操作',
          fixed: 'right',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small',
                  type: 'success'
                },
                on: {
                  click: () => {
                    this.$refs.manageWorkOrder.addOrEditItem(params.row)
                  }
                }
              }, '处理')])
          }
        }
      ]
    }
  },
  methods: {
  }
}
</script>
