/**
 * @Description: 系统相关
 * @date 2019/5/20  20:08
*/
import axios from '../axios'

/**
 * @Description: 获取等级认证条件数据
 * @date 2019/5/20  20:09
*/
export function getGradeAuthCondition (params) {
  return axios.post('/webManger/webManager/gradeAuthentication/getOne', params)
}

/**
 * @Description: 保存等级认证条件数据
 * @date 2019/5/20  20:09
*/
export function saveGradeAuthCondition (params) {
  return axios.post('/webManger/webManager/gradeAuthentication/saveOrUpdate', params)
}
