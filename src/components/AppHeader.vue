<template>
    <div class="app-header">
        <div class="wd app-header__inner">
            <!-- <div class="app-header__hamburger">
                <img src="@/assets/img/hamburger.svg" alt="">
            </div> -->
            <router-link to="/">
                <img src="@/assets/img/logo.svg" alt="">
            </router-link>
            <router-link to="/personal" class="app-header__userInfo" v-if="user">
              <div class="app-header__userAvatar">
                <img src="@/assets/img/avatar.svg" alt="" class="app-header__userAvatarIcon">
                <span>{{ loginFirstLetter }}</span>
              </div>
              <div class="app-header__userTextinfo">
                <p class="app-header__userLogin">{{ user.login }}</p>
                <p class="app-header__userTariff"></p>
              </div>
              <img src="@/assets/img/arrowDown.svg" alt="" class="app-header__userDown">
            </router-link>
            <router-link to="/login" class="app-header__login" v-else>
                <img src="@/assets/img/login.svg" alt="" class="app-header__loginIcon">
                <p class="app-header__loginText">Log in and register</p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  computed: {
    // user information, if null - login link is renedered, otherwise user data snippet is rendered
    user () {
      return this.$store.state.user.generalInfo
    },
    // return first symbol of user's login for user data snippet
    loginFirstLetter () {
      return this.user.login[0]
    }
  }
}
</script>
