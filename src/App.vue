<template>
  <div id="app">
    <div>
      <a-header></a-header>
      <a-tab></a-tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <a-player></a-player>
  </div>
</template>

<script>
import AHeader from 'components/a-header/AHeader'
import ATab from 'components/a-tab/ATab'
import APlayer from 'components/a-player/APlayer'

export default {
  name: 'App',
  components: {
    AHeader, ATab, APlayer
  }
}
</script>

<style lang="stylus">
#app {
}
</style>
