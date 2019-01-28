import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/Recommend'
import RecommendDetail from '@/components/recommend-detail/RecommendDetail'
import Singer from '@/components/singer/Singer'
import SingerDetail from '@/components/singer-detail/SingerDetail'
import Rank from '@/components/rank/Rank'
import TopList from '@/components/top-list/TopList'
import Search from '@/components/search/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    component: Recommend,
    children: [{
      path: ':dissid',
      component: RecommendDetail,
      props: true
    }]
  }, {
    path: '/singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail,
      props: true // 使用 props 将组件和路由解耦, 如果 props 被设置为 true，route.params 将会被设置为组件属性
    }]
  }, {
    path: '/rank',
    component: Rank,
    children: [{
      path: ':id',
      component: TopList,
      props: true
    }]
  }, {
    path: '/search',
    component: Search
  }]
})
// Named Routes
// you can pass an object to the router-link component's to prop
// This is the exact same object used programatically with router.push()
// router.push({ name: 'user', params: { userId: 123 }})
