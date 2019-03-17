<template>
  <div v-if="objectLoaded" class="object-view">
    <object-meta></object-meta>
    <object-uploads></object-uploads>
  </div>
</template>
<script>
import ObjectMeta from '@/components/ObjectMeta.vue'
import ObjectUploads from '@/components/ObjectUploads.vue'
export default {
  name: 'ObjectView',
  components: {
    'object-meta': ObjectMeta,
    'object-uploads': ObjectUploads
  },
  computed: {
    objectData () {
      return this.$store.state.object.generalInfo
    },
    objectLoaded () {
      return this.$store.state.object.objectLoaded
    }
  },
  created () {
    this.$store.dispatch('object/getGeneralInfo', this.$route.params.id)
  }
}
</script>
