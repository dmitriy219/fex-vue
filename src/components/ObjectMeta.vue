<template>
    <div class="object-meta">
      <div class="wd object-meta__top">
        <div class="object-meta__topInner">
          <div class="object-meta__credentials">
            <div class="object-meta__qr">
              <qrcode :value="objectData.token" :options="{ width: 12 }" tag="img"></qrcode>
            </div>
            <p class="object-meta__token">{{ objectData.token }}</p>
            <div class="object-meta__copyLink" @click="copyLink">
              <img src="@/assets/img/link.svg" alt=""> Copy Link
            </div>
          </div>
          <div class="object-meta__options">
            <div class="object-meta__option object-meta__option-owner">
              <img src="@/assets/img/ic_owner.svg" alt="">
              {{ objectData.login ? objectData.login : "Not assigned" }}
            </div>
          </div>
        </div>
      </div>
      <div class="wd object-meta__bottom">
        <input type="text" class="object-meta__post" v-model="objectData.post" @keypress.enter="updatePost" @blur="updatePost" placeholder="Enter name">
      </div>
    </div>
</template>
<script>
export default {
  data: () => {
    return {
      shouldUpdatePost: false
    }
  },
  computed: {
    objectData () {
      return this.$store.state.object.generalInfo
    },
    post () {
      return this.objectData.post
    }
  },
  watch: {
    post () {
      this.shouldUpdatePost = true
    }
  },
  methods: {
    copyLink () {
      this.$copyText('https://fex.net/' + this.objectData.token)
    },
    updatePost (e) {
      if (this.shouldUpdatePost) {
        this.$store.dispatch('object/saveObjectPost', this.objectData.post)
        this.shouldUpdatePost = false
        e.target.blur()
      }
    }
  }
}
</script>
