<template>
  <div class="main">
    <add-product />
    <div class="product-card">
      <product-card :dataProduct="productCards" v-for="item in productCards" :key="item.id" />
    </div>
  </div>
</template>

<script>
import AddProduct from '../components/AddProduct'
import ProductCard from '../components/ProductCard'
export default {
  name: 'IndexPage',
  components: { ProductCard, AddProduct },
  data () {
    return {
      productCards: ''
    }
  },
  mounted () {
    this.getProductCard()
  },
  methods: {
    async getProductCard () {
      await this.$axios.get('http://localhost:3001/posts').then((res) => {
        this.productCards = Object.assign(res.data)
      })
      console.log(this.productCards)
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  display: flex;
  gap: 16px;
}
.product-card{
  margin-top: 83px;
}
</style>
