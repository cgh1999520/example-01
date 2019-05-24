import Mock from 'mockjs'
import {feedbackList} from './system/feedback'
import {workOrderDetail, workOrderList, workOrderSave} from './system/work-order'

// 登录请求
Mock.mock('/webManger/webManager/admin/login', {'code': 0, 'message': '登录成功', 'data': '2a68226902854a06b8c2bc7557a5b4d0'})

// 反馈列表
Mock.mock('/member/webManager/feedback/list', feedbackList)

// 工单列表
Mock.mock('/member/webManager/workOrder/list', workOrderList)

// 工单详情
Mock.mock('/member/webManager/workOrder/getOne', workOrderDetail)

// 工单处理
Mock.mock('/member/webManager/workOrder/saveOrUpdate', workOrderSave)
