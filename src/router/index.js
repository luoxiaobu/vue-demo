import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Recommend = (resolve) => {
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  import('@/components/recommend/Recommend').then((module) => {
    resolve(module)
  })
}
const RecommendDetail = (resolve) => {
  import('@/components/recommend-detail/RecommendDetail').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('@/components/singer/Singer').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve) => {
  import('@/components/singer-detail/SingerDetail').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('@/components/rank/Rank').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve) => {
  import('@/components/top-list/TopList').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('@/components/search/Search').then((module) => {
    resolve(module)
  })
}

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
    component: Search,
    children: [{
      path: ':id',
      component: SingerDetail,
      props: true
    }]
  }]
})
// Named Routes
// you can pass an object to the router-link component's to prop
// This is the exact same object used programatically with router.push()
// router.push({ name: 'user', params: { userId: 123 }})
