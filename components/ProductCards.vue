<template>
  <div>
    <dropdown-component
      :config="config"
      @setSelectedOption="setNewSelectedOption($event)"
    />
    <transition-group name="list" tag="div" class="product-cards">
      <div v-for="item in allPost" :key="item.id">
        <product-card :item="item" @delete-Card="deleteCard" />
      </div>
    </transition-group>
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
        width: 140
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
      const methodsSort = {
        sortOne: 1,
        sortTwo: 2,
        sortThree: 3,
        sortFour: 4
      }
      this.config.placeholder = selectedOption.value
      if (selectedOption.id === methodsSort.sortOne) {
        this.fetchPosts()
      }
      if (selectedOption.id === methodsSort.sortTwo) {
        const parsePrice = x => parseFloat(x.replace(/\s/, '')) || 0
        const masCard = [...this.allPost]
          .sort((a, b) => parsePrice(a.prise) - parsePrice(b.prise))
        this.updatePost(masCard)
      }
      if (selectedOption.id === methodsSort.sortThree) {
        const parsePrice = x => parseFloat(x.replace(/\s/, '')) || 0
        const masCard = [...this.allPost]
          .sort((a, b) => parsePrice(a.prise) - parsePrice(b.prise))
        this.updatePost(masCard.reverse())
      }
      if (selectedOption.id === methodsSort.sortFour) {
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
//animation block
.list-item {
  display: flex;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

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
