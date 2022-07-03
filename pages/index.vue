<template>
  <div class="main">
    <add-product />
    <div class="product-cards-wrapper">
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
  justify-content: center;
  margin: 0 auto;
  @include mediaMax($small-tablet-max-width){
    flex-direction: column;
    width: fit-content;
  }
}
.product-cards-wrapper{
  margin-top: 83px;
  position: relative;
}
</style>
