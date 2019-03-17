<template>
  <div class="object-file">
    <img :src="icon" alt="" class="object-file__icon">
    <p class="object-file__name">{{ upload.name }}</p>
    <p class="object-file__size">{{ size }}</p>
    <div class="object-file__progress" :style="{'width': upload.progress+'%'}"></div>
  </div>
</template>
<script>
import FileIcons from '@/dicts/FileIcons.js'
export default {
  props: {
    'upload': Object
  },
  computed: {
    fileExt () {
      let fileNameSplit = this.upload.name.split('.')
      let ext = fileNameSplit[fileNameSplit.length - 1]
      return ext
    },
    icon () {
      if (FileIcons[this.fileExt]) {
        return FileIcons[this.fileExt]
      }
      return '/file_icons/file.svg'
    },
    size () {
      let suffixes = ['b', 'kB', 'MB', 'GB', 'TB']
      let index = 0
      let s = this.upload.size
      while (s / 1024 > 1) {
        s = s / 1024
        index++
      }
      return `${s.toFixed(2)} ${suffixes[index]}`
    }
  }
}
</script>
