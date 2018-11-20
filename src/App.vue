<template>
  <div id="app">
    <div class="app-header">
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
@import "./themes/common"
#app {
  .app-header {
    background: #d43c33;
  }
}
</style>
