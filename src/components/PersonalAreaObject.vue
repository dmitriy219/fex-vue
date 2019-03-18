<template>
  <router-link :to="'/object/'+object.token" class="personal-object">
    <p class="personal-object__title">{{ object.preview ? object.preview : object.token }}</p>
    <p class="personal-object__meta">
      <span v-if="object.upload_count">{{ object.upload_count }} files</span><span v-if="object.upload_size">, {{ size }}</span></p>
  </router-link>
</template>
<script>
export default {
  props: {
    'object': Object
  },
  computed: {
    size () {
      let suffixes = ['b', 'kB', 'MB', 'GB', 'TB']
      let index = 0
      let s = this.object.upload_size
      while (s / 1024 > 1) {
        s = s / 1024
        index++
      }
      return `${s === 0 ? s : s.toFixed(2)} ${suffixes[index]}`
    }
  }
}
</script>
