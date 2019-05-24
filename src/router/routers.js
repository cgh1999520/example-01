/**
 * @Description: 配置项目中使用的路由
 * @date 2019/5/9  12:12
 */

/* ----------------------------系统相关------------------------------------- */
const Home = () => import('@/views/home.vue') // 首页
const Main = () => import('@/libs/main/main.vue') // 主页
const Login = () => import('@/views/auth/login.vue') // 登录

/* --------------------------------系统相关类------------------------------------ */
const FeedbackManage = () => import('@/views/system/feedback-manage.vue') // 反馈管理
const WorkOrderManage = () => import('@/views/system/work-order-manage.vue') // 工单管理

export default [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      title: '首页',
      icon: 'ios-navigate'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: Home
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'logo-buffer',
      title: '系统管理'
    },
    component: Main,
    children: [{
      path: 'feedback-manage',
      name: FeedbackManage.name,
      meta: {
        icon: 'md-arrow-dropdown-circle',
        title: '反馈管理'
      },
      component: FeedbackManage
    },
    {
      path: 'work-order-manage',
      name: WorkOrderManage.name,
      meta: {
        icon: 'md-arrow-dropdown-circle',
        title: '工单管理'
      },
      component: WorkOrderManage
    }
    ]
  },
  {
    path: '/auth/login',
    name: Login.name,
    component: Login,
    meta: {
      icon: '',
      title: '登录',
      hideInMenu: true
    }
  }
]
