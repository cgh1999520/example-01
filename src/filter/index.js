import Vue from 'vue'
import config from '../config/index'

/**
 * @Description: 图片资源服务器自动加资源地址
 * @date 2019/5/14  9:42
*/
Vue.filter('resourceUrl', function (val) {
  if (!val) return val
  return config.resourceBaseUrl + val
})
