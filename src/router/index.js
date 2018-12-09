import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/Recommend'
import Singer from '@/components/singer/Singer'
import SingerDetail from '@/components/singer-detail/SingerDetail'
import Rank from '@/components/rank/Rank'
import Search from '@/components/search/Search'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    component: Recommend
  }, {
    path: '/singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  }, {
    path: '/rank',
    component: Rank
  }, {
    path: '/search',
    component: Search
  }]
})
// Named Routes
// you can pass an object to the router-link component's to prop
// This is the exact same object used programatically with router.push()
// router.push({ name: 'user', params: { userId: 123 }})
