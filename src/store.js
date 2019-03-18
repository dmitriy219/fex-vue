import Vue from 'vue'
import Vuex from 'vuex'
import Router from '@/router.js'

Vue.use(Vuex)

const user = {
  namespaced: true,
  state: {
    generalInfo: null,
    accountInfo: null,
    assignedObjects: [],
    assignedObjectsOffset: 0,
    assignedObjectsCount: 0,
    lastVisitedObjects: [],
    lastVisitedObjectsOffset: 0,
    lastVisitedObjectsCount: 0,
    objectListLimit: 50
  },
  mutations: {
    setGeneralInfo (state, data) {
      state.generalInfo = data
    },
    concatAssignedObjects (state, list) {
      state.assignedObjects = state.assignedObjects.concat(list)
    },
    replaceAssignedObjects (state, list) {
      state.assignedObjects = list
    },
    concatLastVisitedObjects (state, list) {
      state.lastVisitedObjects = state.lastVisitedObjects.concat(list)
    },
    replaceLastVisitedObjects (state, list) {
      state.lastVisitedObjects = list
    },
    emptyGeneralInfo (state) {
      state.generalInfo = null
    }
  },
  actions: {
    getGeneralInfo ({ commit }) {
      Vue.http.get('/j_index').then(response => {
        if (response.body.user) {
          commit('setGeneralInfo', response.body.user)
        }
      })
    },
    getAssignedObjects ({ state, commit }, shouldReplace) {
      Vue.http.post('/j_archive', { limit: state.objectListLimit, offset: state.assignedObjectsOffset }).then(response => {
        if (shouldReplace) {
          commit('replaceAssignedObjects', response.body.object_list)
        } else {
          commit('concatAssignedObjects', response.body.object_list)
        }
      })
    },
    getLastVisitedObjects ({ state, commit }, shouldReplace) {
      Vue.http.post('/j_home', { limit: state.objectListLimit, offset: state.lastVisitedObjectsOffset }).then(response => {
        if (shouldReplace) {
          commit('replaceLastVisitedObjects', response.body.object_list)
        } else {
          commit('concatLastVisitedObjects', response.body.object_list)
        }
      })
    },
    logout ({ commit }) {
      Vue.http.post('/signout').then(response => {
        commit('emptyGeneralInfo')
        Router.push('/')
      })
    }
  }
}

const object = {
  namespaced: true,
  state: {
    generalInfo: {},
    objectLoaded: false,
    filesOrder: [],
    filesByID: {}
  },
  mutations: {
    setGeneralInfo (state, data) {
      state.generalInfo = data
    },
    setObjectLoaded (state, flag) {
      state.objectLoaded = flag
    },
    setObjectPost (state, post) {
      state.generalInfo.post = post
    },
    setUploadList (state, list) {
      state.generalInfo.upload_list = list
    },
    setFilesOrder (state, order) {
      state.filesOrder = order
    },
    setFilesByID (state, map) {
      state.filesByID = map
    },
    spliceFilesOrderByUploadID (state, uploadID) {
      let index = state.filesOrder.indexOf(uploadID)
      console.log(index)
      state.filesOrder.splice(index, 1)
    }
  },
  actions: {
    getGeneralInfo ({ state, commit, rootState }, id) {
      commit('setObjectLoaded', false)
      Vue.http.post('/j_object_view/' + id).then(response => {
        if (response.body.result !== 0) {
          commit('setGeneralInfo', response.body)
          let filesOrder = []
          let filesByID = {}
          for (let file of response.body.upload_list) {
            filesOrder.push(file.upload_id)
            filesByID[file.upload_id] = file
          }
          commit('setFilesOrder', filesOrder)
          commit('setFilesByID', filesByID)
          commit('setObjectLoaded', true)
          Router.push('/object/' + id)
        } else {
          alert('Object is either not found or protected with password')
        }
      })
    },
    saveObjectPost ({ state, commit }, post) {
      Vue.http.post('/j_object_update/' + state.generalInfo.token, { post }).then(response => {
        if (response.body.result === 1) {
          commit('setObjectPost', post)
        }
      })
    },
    createObject () {
      Vue.http.post('/j_object_create').then(response => {
        Router.push('/object/' + response.body.token)
      })
    },
    deleteUpload ({ state, commit }, uploadID) {
      Vue.http.post('/j_upload_delete/' + state.generalInfo.token + '/' + uploadID).then(response => {
        commit('spliceFilesOrderByUploadID', uploadID)
      })
    }
  }
}

export default new Vuex.Store({
  modules: {
    user,
    object
  }
})
