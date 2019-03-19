<template>
  <div class="object-file">
    <img :src="icon" alt="" class="object-file__icon">
    <a :href="`/view/${token}/${file.upload_id}`" target="_blank" class="object-file__name">{{ file.name }}</a>
    <p class="object-file__size">{{ size }}</p>
    <a :href="downloadLink" class="object-file__download">
      <img src="@/assets/img/ic_download.svg" alt="">
    </a>
    <div class="object-file__delete" @click="deleteFile">
      <img src="@/assets/img/ic_trash.svg" alt="">
    </div>
    <div class="object-file__handle"><img src="@/assets/img/sort.svg" alt=""></div>
  </div>
</template>
<script>
import FileIcons from '@/dicts/FileIcons.js'
export default {
  name: 'ObjectFile',
  props: {
    // file info
    'file': Object,
    // object token
    'token': String
  },
  computed: {
    // returns link for file download
    downloadLink () {
      return `/load/${this.token}/${this.file.upload_id}`
    },
    // splits file's name by dot and returns last element of the array, which is expected to be file extension
    fileExt () {
      let fileNameSplit = this.file.name.split('.')
      let ext = fileNameSplit[fileNameSplit.length - 1]
      return ext.toLowerCase()
    },
    // checks if we have an icon for such file extension, if yes - returns its URL, if no - returns default file icon URL
    icon () {
      if (['jpg', 'jpeg', 'png'].indexOf(this.fileExt) !== -1) {
        return `/show/${this.token}/${this.file.upload_id}?200s`
      }
      if (FileIcons[this.fileExt]) {
        return FileIcons[this.fileExt]
      }
      return '/file_icons/file.svg'
    },
    // converts file size in bytes to human readable format
    size () {
      let suffixes = ['b', 'kB', 'MB', 'GB', 'TB']
      let index = 0
      let s = this.file.size
      while (s / 1024 > 1) {
        s = s / 1024
        index++
      }
      return `${s.toFixed(2)} ${suffixes[index]}`
    }
  },
  methods: {
    // performs API requestto delete file, in case of sucess - updates state
    deleteFile () {
      this.$store.dispatch('object/deleteUpload', this.file.upload_id)
    }
  }
}
</script>
