<template>
  <div class="product-cards">
    <dropdown-component
      :config="config"
      @setSelectedOption="setNewSelectedOption($event)"
    />
    <div v-for="item in allPost" :key="item.id">
      <product-card :item="item" @delete-Card="deleteCard" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProductCard from './ProductCard'
import DropdownComponent from './Dropdown'

export default {
  name: 'ProductCards',
  components: {
    ProductCard,
    DropdownComponent
  },
  data () {
    return {
      config: {
        options: [
          {
            id: 1,
            value: 'По умолчанию'
          },
          {
            id: 2,
            value: 'Сначала дешовые'
          },
          {
            id: 3,
            value: 'Сначала дорогие'
          },
          {
            id: 4,
            value: 'По имени'
          }
        ],
        placeholder: 'По умолчанию',
        backgroundColor: '#FFFEFB',
        textColor: '#B4B4B4',
        borderRadius: '4px',
        border: '',
        width: 180
      },
      masCard: '',
      post: []
    }
  },
  async fetch () {
    await this.fetchPosts()
  },
  computed: mapGetters(['allPost']),
  methods: {
    ...mapActions(['fetchPosts']),
    ...mapMutations(['updatePost']),
    setNewSelectedOption (selectedOption) {
      this.config.placeholder = selectedOption.value
      console.log('мне че то передали')
      console.log(selectedOption.id, this.allPost)
      if (selectedOption.id === 1) {
        this.fetchPosts()
      }
      if (selectedOption.id === 2) {
        const parsePrice = x => parseFloat(x.replace(/\s/, '')) || 0
        const masCard = [...this.allPost]
          .sort((a, b) => parsePrice(a.prise) - parsePrice(b.prise))
        this.updatePost(masCard)
      }
      if (selectedOption.id === 3) {
        const parsePrice = x => parseFloat(x.replace(/\s/, '')) || 0
        const masCard = [...this.allPost]
          .sort((a, b) => parsePrice(a.prise) - parsePrice(b.prise))
        this.updatePost(masCard.reverse())
      }
      if (selectedOption.id === 4) {
        function SortArray (x, y) {
          return x.nameProduct.localeCompare(y.nameProduct)
        }
        const masCard = [...this.allPost].sort(SortArray)
        this.updatePost(masCard)
      }
    },
    async deleteCard (el) {
      await this.$axios.delete(`http://localhost:3001/cards/${el.id}`).then((res) => {
        this.fetchPosts()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-cards {
  gap: 16px;
  flex-wrap: wrap;
  display: flex;
  padding-bottom: 30px;
  width: 1028px;
  position: relative;
  @include mediaMax($desktop-max-width){
    width: 680px;
  }
  @include mediaMax($tablet-max-width){
    width: 332px;
  }
}
</style>
