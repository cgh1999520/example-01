import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import app from './module/app'
import system from './module/system'
import {getCityList} from '../api/module/common'
Vue.use(Vuex)

/**
 * @Description: 状态管理
 * @date 2019/4/23  18:09
 */
export default new Vuex.Store({
  modules: {
    auth, // 认证相关
    app, // 可不管， 这是 iview admin 的相关1
    system // 系统相关
  },
  state: {
    cityList: [] // 城市列表
  },
  getters: {
    // 获取城市列表
    getCityList: state => state.cityList
  },
  mutations: {
    // 设置城市列表
    setCityList (state, payload) {
      state.cityList = payload
    }
  },
  actions: {
    /**
     * @Description: 更新城市列表
     * @date 2019/5/23  20:21
    */
    updateCityList ({commit}) {
      getCityList().then(res => {
        commit('setCityList', res)
      })
    }
  }
})
