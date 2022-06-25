<template>
  <div class="product-cards">
    <div v-for="item in allPost" :key="item.id">
      <product-card :item="item" @delete-Card="deleteCard" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductCard from './ProductCard'
export default {
  name: 'ProductCards',
  components: { ProductCard },
  computed: mapGetters(['allPost']),
  async mounted () {
    await this.fetchPosts()
  },
  methods: {
    ...mapActions(['fetchPosts']),
    async deleteCard (el) {
      await this.$axios.delete(`http://localhost:3001/cards/${el.id}`).then((res) => {
        this.fetchPosts()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-cards{
  gap: 16px;
  flex-wrap: wrap;
  display: flex;
  padding-bottom: 30px;
}
</style>
