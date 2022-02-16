<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 14px;
  }

  .recommend-item {
    width: 25%;
    padding: 10px 5px;
  }

  .recommend-item img {
    width: 100%;
  }

  .recommend-item div {
    margin-top: 5px;
  }
</style>