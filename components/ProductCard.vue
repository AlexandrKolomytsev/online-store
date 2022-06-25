<template>
  <div>
    <div
      class="product-card"
      @mouseover="closeActive = true"
      @mouseleave="closeActive = false"
    >
      <div :class="{'product-card__delete': closeActive}" @click="$emit('delete-Card', item)" />
      <img class="product-card__img" :src="item.hrefImage" alt="Фото товара">
      <div class="product-card__wrapper">
        <p class="product-card__name">
          {{ item.nameProduct }}
        </p>
        <p class="product-card__description">
          {{ item.descriptionProduct }}
        </p>
        <p class="product-card__cost">
          {{ item.prise }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    item: {
      type: Object,
      default: null,
      require: true
    }
  },
  data () {
    return {
      closeActive: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.product-card{
  width: 332px;
  height: 423px;
  background: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  position: relative;
  &__delete{
    position: absolute;
    top: -8px;
    right: -8px;
    background-image: url(~assets/img/basket.svg);
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
  &__img{
    width: 100%;
    height: 200px;
    border-radius: 4px 4px 0 0;
  }
  &__wrapper{
    padding: 16px 16px 0 16px;
  }
  &__name{
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: #3F3F3F;
    margin-bottom: 16px;
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
  }
  &__description{
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #3F3F3F;
    margin-bottom: 32px;
    height: 80px;
    overflow-y: scroll;
    @include scrollbarMin()
  }
  &__cost{
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #3F3F3F;
    margin-bottom: 24px;
  }
}
</style>
