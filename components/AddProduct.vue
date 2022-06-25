<template>
  <div>
    <div class="form-wrapper">
      <h1 class="title">
        Добавление товара
      </h1>
      <form class="form">
        <label class="form__label">
          <p class="form__title">Наименование товара</p>
          <input v-model="nameProduct" class="input form__input form-control" type="text" placeholder="Введите наименование товара">
        </label>

        <label class="form__label">
          <p class="form__title">Описание товара</p>
          <textarea v-model="descriptionProduct" class="input buy-in-one-click__textarea" name="message" placeholder="Введите описание товара" />
        </label>

        <label class="form__label">
          <p class="form__title">Ссылка на изображение товара</p>
          <input v-model="hrefImage" class="input form__input" type="tel" placeholder="Введите ссылку">
        </label>

        <label class="form__label">
          <p class="form__title">Цена товара</p>
          <input v-model="prise" class="input form__input" name="email" type="email" placeholder="Введите цену">
        </label>

        <button type="submit" class="button-form" @click.prevent="sendForm">
          Добавить товар
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddProduct',
  data () {
    return {
      nameProduct: '',
      descriptionProduct: '',
      hrefImage: '',
      prise: '',
      dataForm: {}
    }
  },
  methods: {
    ...mapActions(['fetchPosts']),
    sendForm () {
      this.dataForm = {
        nameProduct: this.nameProduct,
        descriptionProduct: this.descriptionProduct,
        hrefImage: this.hrefImage,
        prise: this.prise
      }
      this.$axios.post('http://localhost:3001/cards', this.dataForm)
        .then(() => {
          this.fetchPosts()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-family: 'SourceSansPro', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  color: $color-black;
  margin: 0 0 16px 0;
}
.form-wrapper{
  margin: 32px 0 0 32px;
  display: flex;
  flex-direction: column;
  width: 332px;
}
</style>
