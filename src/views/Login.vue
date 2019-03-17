<template>
    <form action="">
        <input type="text" v-model="loginData.login">
        <input type="password" v-model="loginData.password">
        <button @click.prevent="signin">Sign in</button>
    </form>
</template>
<script>
export default {
  data: () => {
    return {
      loginData: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      this.$http.post('/signin', this.loginData).then(response => {
        this.$store.dispatch('getUser')
        this.$router.push('/')
      }).catch(data => {
        alert("ERR ON AUTH")
      })
    }
  }
}
</script>
