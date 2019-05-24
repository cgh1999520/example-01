/**
 * @Description: 登录用户相关 数据
 * @date 2019/5/9  13:52
 */

import routes from '../../router/routers'
import {getMenuByRouter} from '../../libs/util'
import {getRouterList} from '../../utils/utils' // 路由列表

export default {
  namespaced: true,
  state: {
    availableRouterList: [], // 路由列表
    navMenuList: [] // 系统导航菜单列表
  },
  getters: {
    // 获取系统导航菜单列表
    getNavMenuList: state => state.navMenuList,
    // 获取路由列表
    getAvailableRouterList: state => state.availableRouterList
  },
  mutations: {
    /**
     * @Description: 设置系统导航菜单列表
     * @date 2019/5/9  13:57
     */
    setNavMenuList (state, payload) {
      state.navMenuList = payload
    },
    /**
     * @Description: 设置 可用的路由列表
     * @date 2019/5/21  20:56
    */
    setAvailableRouterList (state, payload) {
      state.availableRouterList = payload
    }
  },
  actions: {
    /**
     * @Description:  初始化系统导航菜单列表
     * @date 2019/5/9  13:56
     */
    initNavMenuList ({state, commit}, payload) {
      let authoritys = ['UserManage']
      let routers = getMenuByRouter(routes, authoritys)
      commit('setNavMenuList', routers)
      commit('setAvailableRouterList', getRouterList(routers))
    }
  }
}
