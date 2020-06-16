<template>
  <div class="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <loading v-if="loading"></loading>
    <div class="from" v-html="content"></div>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
export default {
  name: 'alipay',
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  components: {
    OrderHeader,
    Loading
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    paySubmit() {
      this.axios
        .post('/pay', {
          orderId: this.orderId,
          orderName: 'back高仿小米商城',
          amount: 0.01,
          payType: 1
        })
        .then(res => {
          this.content = res.content
          setTimeout(() => {
            document.forms[0].submit()
          }, 100)
        })
    }
  }
}
</script>

<style>
</style>
