import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import {setTitle} from '../libs/util'

Vue.use(Router)
const router = new Router({
  base: '/main/',
  routes
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // 如果不存在token 则跳转到登录页
  if (!sessionStorage.token && to.path !== '/auth/login') {
    iView.Message.error('请先登录')
    next({
      path: '/auth/login'
    })
  }
  /* } else if (isAddressableRouter(store.getters['auth/getAvailableRouterList'], to.name)) {
    // iView.Message.error('非法进入')
    next() *!/ */
  // next({
  //   path: from.path
  // })
  // } else {
  next()
  // }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
