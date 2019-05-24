<script>
import {commonAddOrUpdateRecord, commonDeleteRecord, commonGetList} from '../api/module/common'
import {dataFilterReform, resetObjParam} from '../utils/utils'
import lodash from 'lodash'

export default {
  name: 'list-mixin',
  data () {
    return {
      listTotal: 0, // 当前列表总数
      tableLoading: true, // table 加载中效果
      filterData: {}, // 需要过滤的数据
      listParams: { // 请求列表默认参数
        pageNumber: 1,
        pageSize: 15
      },
      searchParams: {}, // 搜索列表参数 为什么需要建两个呢？
      // （因为listParams 的参数部分会双向绑定，如果不使用两个的话，当有筛选项改变时，又切换页码就会出现带参搜索了）
      listData: [], // 列表请求数据
      baseListUrl: '' // 共用的列表请求地址
    }
  },
  beforeMount () {
    let page = this.$route.query.page // 当前路由的页码
    // 如果页码存在的话，则初始化页码
    if (page) {
      this.listParams.pageNumber = page
    }

    // 初始化搜索参数
    this.searchParams = lodash.cloneDeep(this.listParams)
    this.getList()

    // 创建监听器 监听列表搜索事件，进行页码复位
    this.$bus.on('updateListData', () => {
      this.listParams.pageNumber = 1
      // 初始化搜索参数
      this.searchParams = lodash.cloneDeep(this.listParams)
      this.getList()
    })
  },
  beforeDestroy () {
    // 组件销毁时，销毁监听
    this.$bus.off('updateListData')
  },

  methods: {
    /**
       * @Description: 获取列表数据
       * @date 2019/5/13  13:34
       */
    getList () {
      this.tableLoading = true
      commonGetList(this.baseListUrl, this.searchParams).then(res => {
        // 使用 filterData 进行数据格式化。
        this.listData = dataFilterReform(res.rows, this.filterData)
        this.listTotal = res.total
        this.tableLoading = false
      }, () => {
        this.tableLoading = false
      })
    },

    /**
     * @Description: 搜索事件 （搜索事件只处理参数，搜索组件会发送事件，通知上面beforeMount的监听器更新数据）
     * @date 2019/5/10  9:57
     */
    onSearch (search) {
      this.listParams.name = search.searchTx
    },

    /**
     * @Description: 清除搜索 （清除搜索事件只处理参数，搜索组件会发送事件，通知上面beforeMount的监听器更新数据）
     * @date 2019/5/14  15:59
     */
    onClearSearch () {
      this.listParams = resetObjParam(this.listParams, ['pageSize', 'pageNumber'])
    },

    /**
       * @Description: 公用的添加请求函数
       */
    addOrUpdateRecord (params) {
      return new Promise((resolve, reject) => {
        commonAddOrUpdateRecord(this.baseListUrl, params).then(() => {
          this.$Message.success('操作成功')
          resolve('success')
          this.getList()
        }, err => reject(err))
      })
    },

    /**
       * @Description: 公用的删除请求函数
       */
    deleteRecord (params) {
      commonDeleteRecord(this.baseListUrl, {id: params.id}).then(() => {
        this.$Message.success('删除成功')
        this.getList()
      })
    },

    /**
       * @Description: 页码改变事件
       * @date 2019/5/10  14:10
       */
    pageChange (page) {
      this.searchParams.pageNumber = page
      // 当页码改变时，则添加query 的参数
      this.$router.push({
        query: {
          page: page
        }
      })
      this.getList()
    }
  }
}
</script>
