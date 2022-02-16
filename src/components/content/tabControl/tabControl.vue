<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
    :key="item.acm" 
    class="tab-control-item"
    :class="{active: index === currentIndex}"
    @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabControl',
    props: {
      titles: {
        type: Array,
        defaul() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 32px;
    font-size: 16px;
  }

  .tab-control-item {
    flex: 1;
    
  }

  .tab-control-item span {
    padding: 5px 10px;
    
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
</style>