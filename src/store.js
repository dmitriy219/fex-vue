import Vue from 'vue'
import Vuex from 'vuex'
import Router from '@/router.js'

Vue.use(Vuex)

const user = {
  namespaced: true,
  state: {
    generalInfo: null,
    accountInfo: null
  },
  mutations: {
    setGeneralInfo (state, data) {
      state.generalInfo = data
    }
  },
  actions: {
    getGeneralInfo ({ state, commit, rootState }) {
      Vue.http.get('/j_index').then(response => {
        if (response.body.user) {
          commit('setGeneralInfo', response.body.user)
        }
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
          alert('NO SUCH OBJECT')
        }
      })
    },
    saveObjectPost ({ state, commit }, post) {
      Vue.http.post('/j_object_update/' + state.generalInfo.token, { post }).then(response => {
        if (response.body.result === 1) {
          commit('setObjectPost', post)
        }
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
