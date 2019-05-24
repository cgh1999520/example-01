import axios from '../axios'
import md5 from 'md5'

/**
 * @Description:  登录操作
 * @date 2019/5/13  14:40
*/
export function loginSystem (data) {
  data.password = md5(data.password)
  return axios.post('/webManger/webManager/admin/login', data)
}

/**
 * @Description: 系统登出操作
 * @date 2019/5/13  15:03
*/
export function logoutSystem (data) {
  return axios.post('/webManger/webManager/admin/logout', data)
}

/**
 * @Description: 更新系统登录密码
 * @date 2019/5/13  17:08
*/
export function updatePassword (data) {
  return axios.post('/webManger/webManager/manager/updatePwd', data)
}
