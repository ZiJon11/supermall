<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <home-feature></home-feature>
      <tab-control 
        :titles="['流行','新款','精选']" 
        class="tab-control"
        @tabclick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- .native修饰符, 可以监听组件的点击事件 -->
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
  // 引入公共的js文件
  // import { debounce } from '../../common/utils.js'

  // 引入公共的组件
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import tabControl from '../../components/content/tabControl/tabControl.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  import BackTop from '../../components/content/backTop/BackTop.vue'

  // 引入主页里面的子组件
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import HomeFeature from './childComps/HomeFeature.vue'
  
  // 引入网络请求相关的方法
  import { getHomeMultidata, getHomeGoods } from '../../network/home.js'
  

  export default {
    name: 'Home',
    components: {
      NavBar,
      tabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      HomeFeature,
    },
    data() {
      return {
        // banners和recommends用来保存请求到的数据
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isBackTopShow: false
      }
    },
    created() {
      // 1.请求多个数据(包括轮播图和下面的)
      this.getHomeMultidata()
      // 2.请求商品数据(包括 流行/新款/精选 数据)
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.refresh()
      })
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /*
      ** 事件监听相关的方法
      */
      tabClick(index) {
        // console.log(index);
        if (index === 0) {
          this.currentType = 'pop'
        } else if(index === 1) {
          this.currentType = 'new'
        } else if(index === 2) {
          this.currentType = 'sell'
        }
      },

      /*
      **backTop方法
      */
      backClick() {
        // 方法一
        // this.$refs.scroll：拿到的是Home.vue组件里面的scroll组件对象
        // this.$refs.scroll.scroll：拿到的是scroll组件里面的scroll对象
        // this.$refs.scroll.scroll.scrollTo：拿到的是scroll组件里面的scroll对象的scrollTo方法, 第一个参数是X坐标, 
        // 第二个参数是Y坐标, 第三个参数是时间(毫秒)
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)

        // 方法二
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      // 滚动区域大于1000像素时, 显示backTop图标, 小于1000像素时, 隐藏backTop图标
      contentScroll(position) {
        // console.log(position);
        this.isBackTopShow = -(position.y) > 1000
      },

      // 上拉加载更多
      loadMore() {
        // console.log("上拉加载更多");
        this.getHomeGoods(this.currentType)

        // 每次请求回数据以后, 重新计算可滚动的高度
        this.$refs.scroll.scroll.refresh()
      },

      /*
      **网络请求相关的方法
      */
       getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res
          this.banners = res.data.banner.list 
          this.recommends = res.data.recommend.list 
        })
       },
       getHomeGoods(type) {
         const page = this.goods[type].page + 1
         getHomeGoods(type, page).then(res => {
          //  console.log(res);
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1

           this.$refs.scroll.finishPullUp()
         })
       },
      
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    /* vh代表视口高度, 100vh代表100%的视口高度 */
    height: 100vh;
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
    background-color: #fff;
    /* z-index: 9; */
  }
  
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;

  }
</style>