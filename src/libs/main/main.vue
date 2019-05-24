<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64"
           v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="activeName" :collapsed="collapsed" @on-select="turnToPage"
                 :menu-list="getNavMenuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" src="../../../static/images/logo.jpg" key="max-logo"/>
          <img v-show="collapsed" src="../../../static/images/logo-min.jpg" key="min-logo"/>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <Dropdown>
            <a href="javascript:void(0)">
              系统选项
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem divided @click.native="updatePassword">更改密码</DropdownItem>
              <DropdownItem divided @click.native="logoutSystem">登出系统</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </header-bar>
      </Header>

      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <transition name="slide-fade">
                <router-view/>
              </transition>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>

    <!--    更改密码弹窗 -->
    <update-password-dialog ref="updatePassword"></update-password-dialog>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import {getNewTagList, routeEqual} from '@/libs/util'
import routers from '@/router/routers'
import './main.less'
import {logoutSystem} from '../../api/module/auth'
import UpdatePasswordDialog from '../../components/update-password-dialog'

export default {
  name: 'Main',
  components: {
    UpdatePasswordDialog,
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    ...mapGetters({
      getNavMenuList: 'auth/getNavMenuList'
    }),
    /**
       * @Description: 活跃路由
       * @date 2019/5/10  11:44
       */
    activeName () {
      return this.$route.name
    },
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions({
      initNavMenuList: 'auth/initNavMenuList'
    }),
    /**
       * @Description: 更改密码
       * @date 2019/5/13  17:12
       */
    updatePassword () {
      this.$refs.updatePassword.updatePassword()
    },
    /**
       * @Description: 登出系统
       * @date 2019/5/13  16:43
       */
    logoutSystem () {
      logoutSystem().then(res => {
        sessionStorage.removeItem('token')
        this.$Message.success('登出系统成功')
        this.$router.replace({
          path: '/auth/login'
        })
      })
    },
    turnToPage (route) {
      let {name, params, query} = {}
      if (typeof route === 'string') {
        name = route
      } else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const {name, query, params, meta} = newRoute
      this.addTag({
        route: {name, query, params, meta},
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    // 初始化菜单栏
    this.initNavMenuList()
    // 设置 导航条标签
    this.setTagNavList()
    // 设置首页 路由标签
    this.setHomeRoute(routers)
    // 添加 当前页标签
    const {name, params, query, meta} = this.$route
    this.addTag({
      route: {name, params, query, meta}
    })
    this.setBreadCrumb(this.$route)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>
<style scoped lang="less">
  .slide-fade{
    position: absolute;left:0;right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1.2s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
  }
</style>
