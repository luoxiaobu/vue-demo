<template>
  <div id="app">
    <div>
      <a-header></a-header>
      <a-tab></a-tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AHeader from './components/a-header/AHeader'
import ATab from './components/a-tab/ATab'

export default {
  name: 'App',
  components: {
    AHeader, ATab
  }
}
</script>

<style lang="stylus">
#app {
}
</style>
