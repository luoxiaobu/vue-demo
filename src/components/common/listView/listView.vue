<template>
  <div class="list-view">
    <ul>
      <li v-for="group in data" :key="group.title">
        <h2>{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" :key="index">
            <img class="avatar" :src="item.avatar">
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
        default: []
      }
    }
  }
</script>