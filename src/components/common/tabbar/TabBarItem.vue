<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive" ><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div v-bind:class="{active: isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    itemClick() {
      // replace方法跳转路径, 页面不可以返回
      this.$router.replace(this.path)
      // push方法跳转路径, 页面可以返回
      // this.$router.push(this.path)
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path
      // return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }

};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width:24px;
  height: 24px;
  margin: 3px 0 2px 0;
  vertical-align: middle;
}
/* .active {
  color: #ff5777;
} */
</style>