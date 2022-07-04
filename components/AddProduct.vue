<template>
  <div>
    <div class="form-wrapper">
      <h1 class="title">
        Добавление товара
      </h1>
      <form class="form">
        <label class="form__label">
          <p class="form__title">Наименование товара</p>
          <input
            v-model.trim="form.nameProduct"
            class="input form__input form-control"
            type="text"
            placeholder="Введите наименование товара"
            :class="{invalid: $v.form.nameProduct.$error}"
            @input="checkForm"
          >
        </label>
        <label class="form__label">
          <p class="form__title">Описание товара</p>
          <textarea
            v-model.trim="form.descriptionProduct"
            class="input form-text-area"
            placeholder="Введите описание товара"
          />
        </label>
        <label class="form__label">
          <p class="form__title">Ссылка на изображение товара</p>
          <input
            v-model.trim="form.hrefImage"
            class="input form__input"
            type="tel"
            placeholder="Введите ссылку"
            :class="{invalid: $v.form.hrefImage.$error}"
            @input="checkForm"
          >
        </label>
        <label class="form__label">
          <p class="form__title">Цена товара</p>
          <input
            v-model.trim="form.prise"
            class="input form__input"
            placeholder="Введите цену"
            :class="{invalid: $v.form.prise.$error}"
            @input="checkForm"
          >
        </label>
        <button type="submit" class="button-form" :class="{'disable-button': disableButton}" @click.prevent="sendForm">
          Добавить товар
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddProduct',
  mixins: [validationMixin],
  data () {
    return {
      form: {
        nameProduct: '',
        descriptionProduct: '',
        hrefImage: '',
        prise: ''
      },
      dataForm: {},
      disableButton: true
    }
  },
  validations: {
    form: {
      nameProduct: { required },
      hrefImage: { required },
      prise: { required }
    }
  },
  methods: {
    ...mapActions(['fetchPosts']),
    sendForm () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return
      }
      this.dataForm = {
        nameProduct: this.form.nameProduct,
        descriptionProduct: this.form.descriptionProduct,
        hrefImage: this.form.hrefImage,
        prise: this.form.prise
      }
      this.$axios.post('http://localhost:3001/cards', this.dataForm)
        .then(() => {
          this.fetchPosts()
          this.form.nameProduct = this.form.descriptionProduct = this.form.hrefImage = this.form.prise = ''
          this.$v.$reset()
          this.disableButton = true
        })
    },
    checkForm () {
      this.form.prise = this.inputMask(this.form.prise)
      if (this.$v.$invalid) {
        this.disableButton = true
      } else {
        this.disableButton = false
      }
    },
    inputMask (x) {
      return x.split(' ').join('').toString().replace(/[^0-9+]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  color: $color-black;
  margin: 0 0 16px 0;
}
.form-wrapper {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  width: 332px;
  @include mediaMax($small-tablet-max-width){
    margin-left: 0;
  }
}
.invalid {
  border: red 2px solid;
}
.disable-button {
  background: #EEEEEE;
  cursor: default;
  color: $color-gray;
}
.form-text-area {
  resize: none;
  height: 85px;
}
</style>
