import Vue from 'vue'
import Router from '@/router.js'

const user = {
  namespaced: true,
  state: {
    // general information about user, such as login, allowed upload size, number of giles uploaded etc
    generalInfo: null,
    // an array of objects assigned to user
    assignedObjects: [],
    // offset of assigned objects - is passed to the API for the purpose of lazy loading
    assignedObjectsOffset: 0,
    // total number of assigned objects
    assignedObjectsCount: 0,
    // an array of the objects visited by user, sorted by the date of visit DESC
    lastVisitedObjects: [],
    // offset of last visited objects
    lastVisitedObjectsOffset: 0,
    // total number of last visited objects
    lastVisitedObjectsCount: 0,
    // limit of objects to be loaded per request
    objectListLimit: 50
  },
  mutations: {
    // sets general info of the user fetched from API
    setGeneralInfo (state, data) {
      state.generalInfo = data
    },
    // when lazy loading assigned objecs - concats current object list with the list received from API
    concatAssignedObjects (state, list) {
      state.assignedObjects = state.assignedObjects.concat(list)
    },
    // when loading objects first time after component created - replaces current assigned objects list with the list received from API
    replaceAssignedObjects (state, list) {
      state.assignedObjects = list
    },
    // when lazy loading last visited objecs - concats current object list with the list received from API
    concatLastVisitedObjects (state, list) {
      state.lastVisitedObjects = state.lastVisitedObjects.concat(list)
    },
    // when loading objects first time after component created - replaces current last visited objects list with the list received from API
    replaceLastVisitedObjects (state, list) {
      state.lastVisitedObjects = list
    },
    // empties user info after logout
    emptyGeneralInfo (state) {
      state.generalInfo = null
    }
  },
  actions: {
    // fetches user info from API
    getGeneralInfo ({ commit }) {
      Vue.http.get('/j_index').then(response => {
        if (response.body.user) {
          commit('setGeneralInfo', response.body.user)
        }
      })
    },
    /* fetches objects, which are assigned to user
      @param shouldReplace - if set to true, replaces current objects list, otherwise - contacts */
    getAssignedObjects ({ state, commit }, shouldReplace) {
      Vue.http.post('/j_archive', { limit: state.objectListLimit, offset: state.assignedObjectsOffset }).then(response => {
        if (shouldReplace) {
          commit('replaceAssignedObjects', response.body.object_list)
        } else {
          commit('concatAssignedObjects', response.body.object_list)
        }
      })
    },
    /* fetches last visited objects
      @param shouldReplace - if set to true, replaces current objects list, otherwise - contacts */
    getLastVisitedObjects ({ state, commit }, shouldReplace) {
      Vue.http.post('/j_home', { limit: state.objectListLimit, offset: state.lastVisitedObjectsOffset }).then(response => {
        if (shouldReplace) {
          commit('replaceLastVisitedObjects', response.body.object_list)
        } else {
          commit('concatLastVisitedObjects', response.body.object_list)
        }
      })
    },
    // performs logout and clears user data
    logout ({ commit }) {
      Vue.http.post('/signout').then(response => {
        commit('emptyGeneralInfo')
        Router.push('/')
      })
    }
  }
}

export default user
