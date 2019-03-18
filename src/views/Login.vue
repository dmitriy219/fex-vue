<template>
  <div class="login-page">
    <div class="wd">
      <div class="login-page__form">
          <input
            class="login-page__input"
            type="text"
            v-model="loginData.login"
            placeholder="Login"
            @keypress.enter="signin">
          <input
            class="login-page__input"
            type="password"
            v-model="loginData.password"
            placeholder="Password"
            @keypress.enter="signin">
          <div class="login-page__button" @click.prevent="signin">Sign in</div>
      </div>
    </div>
  </div>
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
        this.$store.dispatch('user/getGeneralInfo')
        this.$router.push('/personal')
      }).catch(data => {
        alert('ERR ON AUTH')
      })
    }
  }
}
</script>
