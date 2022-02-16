import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')

// 1.通过Vue.use(插件)安装插件
Vue.use(VueRouter)

// 2.创建VueRouter对象
const routes = [
  // 设置路由的默认路径为首页
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    },
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router