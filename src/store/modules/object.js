import Vue from 'vue'
import Router from '@/router.js'

const object = {
  namespaced: true,
  state: {
    // object data, such as token, upload list, total size etc
    generalInfo: {},
    // whether API request finished sucessfully
    objectLoaded: false,
    // array of upload IDs of the current objects
    filesOrder: [],
    // object where the key is file's upload ID and the value is file's information (name, size, uploading date etc)
    filesByID: {}
  },
  mutations: {
    // saves general object info to store
    setGeneralInfo (state, data) {
      state.generalInfo = data
    },
    // sets the flag of object successful load
    setObjectLoaded (state, flag) {
      state.objectLoaded = flag
    },
    // sets object post after editing
    setObjectPost (state, post) {
      state.generalInfo.post = post
    },
    // updates upload list after sorting or deleting file
    setUploadList (state, list) {
      state.generalInfo.upload_list = list
    },
    // sets file order after loading object data, sorting or deleting file
    setFilesOrder (state, order) {
      state.filesOrder = order
    },
    // sets normalized object uploads
    setFilesByID (state, map) {
      state.filesByID = map
    },
    // splices files order after deleting file
    spliceFilesOrderByUploadID (state, uploadID) {
      let index = state.filesOrder.indexOf(uploadID)
      state.filesOrder.splice(index, 1)
    }
  },
  actions: {
    // fetches object info from API, makes filesOrder and FilesByID and makes commits to state
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
    // makes request to the API to update object post, in case of success - updates state
    saveObjectPost ({ state, commit }, post) {
      Vue.http.post('/j_object_update/' + state.generalInfo.token, { post }).then(response => {
        if (response.body.result === 1) {
          commit('setObjectPost', post)
        }
      })
    },
    // makes requests to create new object, in case of success - redirects user to the object page
    createObject () {
      Vue.http.post('/j_object_create').then(response => {
        Router.push('/object/' + response.body.token)
      })
    },
    // makes request to delete file frmo the object, in case of success - updates state
    deleteUpload ({ state, commit }, uploadID) {
      Vue.http.post('/j_upload_delete/' + state.generalInfo.token + '/' + uploadID).then(response => {
        commit('spliceFilesOrderByUploadID', uploadID)
      })
    }
  }
}

export default object
