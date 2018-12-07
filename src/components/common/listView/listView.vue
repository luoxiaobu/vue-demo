<template>
  <div class="list-view">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="stylus">
@import "../../../themes/variable"
.list-view {
  .list-group {
    padding-top: 20px;
  }
  .list-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: $font-size-small;
    color: $color-text-d;
    background: $color-highlight-background;
  }
  .list-group-item {
    display: flex;
    align-items: center;
    padding: 20px 0 0 30px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      margin-left: 20px;
      color: $color-text-dark;
      font-size: $font-size-medium;
    }
  }
}
</style>
