<template>
  <div class="personal-area">
    <div class="wd">
      <div class="personal-area__nav">
        <p
          class="personal-area__tab"
          :class="{'personal-area__tab-active': currentTab === 'assignedObjects'}"
          @click="switchToAssignedObjects">My objects</p>
        <p
          class="personal-area__tab"
          :class="{'personal-area__tab-active': currentTab === 'lastVisitedObjects'}"
          @click="switchToLastVisitedObjects">Last visited</p>
        <div class="personal-area__logout" @click="logout">Log out</div>
      </div>
      <div class="personal-objects" v-if="currentTab === 'assignedObjects'">
        <personal-area-object v-for="object in assignedObjects" :key="object.token" :object="object"></personal-area-object>
      </div>
      <div class="personal-objects" v-if="currentTab === 'lastVisitedObjects'">
        <personal-area-object v-for="object in lastVisitedObjects" :key="object.token" :object="object"></personal-area-object>
      </div>
    </div>
  </div>
</template>
<script>
import PersonalAreaObject from '@/components/PersonalAreaObject.vue'
export default {
  components: {
    'personal-area-object': PersonalAreaObject
  },
  data: () => {
    return {
      currentTab: 'assignedObjects'
    }
  },
  computed: {
    assignedObjects () {
      return this.$store.state.user.assignedObjects
    },
    lastVisitedObjects () {
      return this.$store.state.user.lastVisitedObjects
    }
  },
  methods: {
    getAssignedObjects () {
      this.$store.dispatch('user/getAssignedObjects', true)
    },
    getLastVisitedObjects () {
      this.$store.dispatch('user/getLastVisitedObjects', true)
    },
    switchToAssignedObjects () {
      this.currentTab = 'assignedObjects'
      this.getAssignedObjects()
    },
    switchToLastVisitedObjects () {
      this.currentTab = 'lastVisitedObjects'
      this.getLastVisitedObjects()
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  mounted () {
    this.getAssignedObjects()
  }
}
</script>
