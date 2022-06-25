export default {
  actions: {
    async fetchPosts (ctx) {
      await this.$axios.get('http://localhost:3001/cards').then((res) => {
        const posts = Object.assign(res.data)
        ctx.commit('updatePost', posts)
        console.log(posts, 'мой actions')
      })
    }
  },
  mutations: {
    updatePost (state, posts) {
      state.posts = posts
      console.log(this.state.posts, 'моя mutations')
    }
  },
  state: {
    posts: []
  },
  getters: {
    allPost (state) {
      console.log(state.posts, 'мой getters')
      return state.posts
    }
  }
}
