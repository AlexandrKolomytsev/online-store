export default {
  actions: {
    async fetchPosts (ctx) {
      return await this.$axios.get('http://localhost:3001/cards').then((res) => {
        ctx.commit('updatePost', res.data)
      })
    }
  },
  mutations: {
    updatePost (state, posts) {
      state.posts = posts
    }
  },
  state: {
    posts: []
  },
  getters: {
    allPost (state) {
      return state.posts
    }
  }
}
