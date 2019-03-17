<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: 'App',
  components: {
    'app-header': AppHeader
  },
  computed: {
    user () {
      return this.$store.state.user.generalInfo
    }
  },
  methods: {
    createObject () {
      this.$http.post('/j_object_create').then(response => {
        this.$router.push('/object/' + response.body.token)
      })
    }
  },
  created () {
    this.$store.dispatch('user/getGeneralInfo')
  }
}
</script>

<style lang="sass" src="@/sass/index.sass"></style>
