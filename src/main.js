import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import iView from 'iview'
import config from './config'
import VueBus from 'vue-bus'
import './mock/index'
import SearchBar from './components/search-bar'
import 'iview/dist/styles/iview.css'
import './common/common.less'
import './filter/index'
import './directives/index'
Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueBus)
Vue.prototype.$config = config
Vue.component(SearchBar.name, SearchBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
