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
      // active tab in navigation panel - can be 'assignedObjects' or 'lastVisitedObjects'
      currentTab: 'assignedObjects'
    }
  },
  computed: {
    // list of objects assigned to user
    assignedObjects () {
      return this.$store.state.user.assignedObjects
    },
    // list of objects visited by user in the past time
    lastVisitedObjects () {
      return this.$store.state.user.lastVisitedObjects
    }
  },
  methods: {
    // fetches assigned objects from API
    getAssignedObjects () {
      this.$store.dispatch('user/getAssignedObjects', true)
    },
    // fetches last visited objects from API
    getLastVisitedObjects () {
      this.$store.dispatch('user/getLastVisitedObjects', true)
    },
    // switches active tab to assigned objects and fethes them from API
    switchToAssignedObjects () {
      this.currentTab = 'assignedObjects'
      this.getAssignedObjects()
    },
    // switches active tab to last visited objects and fethes them from API
    switchToLastVisitedObjects () {
      this.currentTab = 'lastVisitedObjects'
      this.getLastVisitedObjects()
    },
    // performs logout API call
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  mounted () {
    this.getAssignedObjects()
  }
}
</script>
