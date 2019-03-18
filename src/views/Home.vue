<template>
  <div class="home-page">
    <div class="home-page__bg"></div>
    <div class="wd home-page__content">
      <h1 class="home-page__heading">File storage and transfer service</h1>
      <div class="home-page__buttons">
        <div class="home-page__button" @click="createObject">Transfer files</div>
        <div class="home-page__button home-page__button-receive" v-if="!receiveInputVisible" @click="setReceiveInputVisibility(true)">Receive files</div>
        <div class="home-page__receiveInputHolder" v-else>
          <input type="tel" autocomplete="off" placeholder="" name="hash" class="home-page__receiveInput" id="get_inp_main" maxlength="12" v-model="token" @keypress="isNumber">
          <label for="get_inp_main" class="home-page__receiveInputLabel">
            <span v-for="i in 12" :key="i" :data-key="i" :class="{'transparent': i <= token.length}">X</span>
          </label>
        </div>
      </div>
      <div class="home-page__features">
        <div class="home-page__feature">
          <div class="home-page__featureIllWrapper">
            <img src="@/assets/img/cloud_pay.svg" class="home-page__featureIcon" alt="">
          </div>
          <p class="home-page__featureText">1TB from 60 UAH a month</p>
        </div>
        <div class="home-page__feature">
          <div class="home-page__featureIllWrapper">
            <img src="@/assets/img/i_anon.svg" class="home-page__featureIcon" alt="">
          </div>
          <p class="home-page__featureText">Anonymous file exchange</p>
        </div>
        <div class="home-page__feature">
          <div class="home-page__featureIllWrapper">
            <img src="@/assets/img/i_triple.svg" class="home-page__featureIcon" alt="">
          </div>
          <p class="home-page__featureText">Data backup</p>
        </div>
        <div class="home-page__feature">
          <div class="home-page__featureIllWrapper">
            <img src="@/assets/img/i_cloud.svg" class="home-page__featureIcon" alt="">
          </div>
          <p class="home-page__featureText">Playing files online</p>
        </div>
        <div class="home-page__feature">
          <div class="home-page__featureIllWrapper">
            <img src="@/assets/img/i_unlimited.svg" class="home-page__featureIcon" alt="">
          </div>
          <p class="home-page__featureText">Works with big files</p>
        </div>
        <div class="home-page__feature">
          <div class="home-page__featureIllWrapper">
            <img src="@/assets/img/i_radio.svg" class="home-page__featureIcon" alt="">
          </div>
          <p class="home-page__featureText">Online radio</p>
        </div>
      </div>
      <div class="home-page__smart">
        <div class="home-page__smartBg"></div>
        <div class="home-page__smartContent">
          <h2 class="home-page__smartHeading">
            Watch your photos and videos <span>on a big screen</span>
          </h2>
          <h3 class="home-page__smartSubheading">Install FEX ID app on a Samsung TV with Smart TV feature</h3>
          <a href="https://fex.net/smart-tv" class="home-page__smartLink">Install</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data: () => {
    return {
      receiveInputVisible: false,
      token: ''
    }
  },
  watch: {
    token (val) {
      if (val.length === 12) {
        this.$store.dispatch('object/getGeneralInfo', val, () => {
          this.$router.push('/object/' + val)
        })
      }
    }
  },
  methods: {
    setReceiveInputVisibility (flag) {
      this.receiveInputVisible = flag
    },
    isNumber (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    createObject () {
      this.$store.dispatch('object/createObject')
    }
  }
}
</script>
