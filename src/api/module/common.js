/**
 * @Description: 处理公用的请求
 * @date 2019/5/13  13:11
 */
import axios from '../axios'

/**
 * @Description: 公共的列表请求函数
 */
export function commonGetList (baseUrl, params) {
  return axios.post(`/${baseUrl}/list`, params)
}

/**
 * @Description: 公用的添加/更新请求函数
 */
export function commonAddOrUpdateRecord (baseUrl, params) {
  return axios.post(`/${baseUrl}/saveOrUpdate`, params)
}

/**
 * @Description: 公用的删除请求函数
 */
export function commonDeleteRecord (baseUrl, params) {
  return axios.post(`/${baseUrl}/delete`, params)
}

/**
 * @Description: 公共通过id 获取 Item 数据请求函数
 * @date 2019/5/14  15:18
*/
export function commonGetItemData (baseUrl, params) {
  return axios.post(`/${baseUrl}/getOne`, params)
}

/**
 * @Description: 获取城市列表
 * @date 2019/5/23  20:25
*/
export function getCityList () {
  return axios.post('/member/webManager/member/getCityList')
}
