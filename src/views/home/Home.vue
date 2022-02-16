<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <home-feature></home-feature>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import tabControl from '../../components/content/tabControl/tabControl.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import HomeFeature from './childComps/HomeFeature.vue'
  

  import { getHomeMultidata } from '../../network/home.js'
  

  export default {
    name: 'Home',
    components: {
      NavBar,
      tabControl,
      HomeSwiper,
      RecommendView,
      HomeFeature,
    },
    data() {
      return {
        // banners和recommends用来保存请求到的数据
        banners: [],
        recommends: []
      }
    },
    created() {
      // 请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res
        this.banners = res.data.banner.list 
        this.recommends = res.data.recommend.list 
      })
    }
  }
</script>

<style>
  #home {
    height: 5000px;
  }

  .home-nav {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>