<template>
  <div class="main">
    <add-product />
    <div class="product-card">
      <product-cards />
    </div>
  </div>
</template>

<script>
import AddProduct from '../components/AddProduct'
import ProductCards from '../components/ProductCards'
export default {
  name: 'IndexPage',
  components: { ProductCards, AddProduct }
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
