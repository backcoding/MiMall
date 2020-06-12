import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home')
const Index = () => import('../views/Index')
const Product = () => import('../views/Product')
const Detail = () => import('../views/Detail')
const Cart = () => import('../views/Cart')
const Order = () => import('../views/Order')
const OrderList = () => import('../views/OrderList')
const OrderConfirm = () => import('../views/OrderConfirm')
const OrderPay = () => import('../views/OrderPay')
const Alipay = () => import('../views/Alipay')
const Login = () => import('../views/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/product/:id',
        name: 'product',
        component: Product
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: OrderList
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: OrderConfirm
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: OrderPay
      },
      {
        path: 'alipay',
        name: 'ali-pay',
        component: Alipay
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
