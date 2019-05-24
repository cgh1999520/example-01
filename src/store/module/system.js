/**
 * @Description: 系统相关
 * @date 2019/5/17  20:13
*/
export default {
  namespaced: true,
  state: {
    explainTypeList: [
      {key: 0, name: 'vip中心'},
      {key: 1, name: '关于'}
    ] // 说明类型列表
  },
  getters: {
    // 获取说明类型列表
    getExplainTypeList: state => state.explainTypeList
  }
}
