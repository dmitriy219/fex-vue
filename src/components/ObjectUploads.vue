<template>
  <div class="object-uploads">
    <div class="wd">
      <drop-zone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        :useCustomSlot=true
        @vdropzone-files-added="onFilesAdded"
        @vdropzone-success="onFileLoaded"
        @vdropzone-upload-progress="onUploadProgress"
        class="object-uploads__dropzone">
        <div class="object-uploads__container">
            <vue-draggable v-model="filesOrder" @end="onDragEnd" handle=".object-file__handle">
              <object-file :file="filesByID[fileID]" :token="token" v-for="fileID in filesOrder" :key="fileID"></object-file>
            </vue-draggable>
            <object-upload v-for="uuid in uploads_order" :upload="uploadsByUUID[uuid]" :token="token" :key="uuid"></object-upload>
          <div class="object-uploads__add">
            <img src="@/assets/img/cloud.svg" alt="">
            Upload files
          </div>
        </div>
      </drop-zone>
    </div>
  </div>

</template>
<script>
import vue2DropZone from 'vue2-dropzone'
import draggable from 'vuedraggable'
import ObjectFile from '@/components/ObjectFile.vue'
import ObjectUpload from '@/components/ObjectUpload.vue'
export default {
  name: 'ObjectUploads',
  components: {
    'drop-zone': vue2DropZone,
    'vue-draggable': draggable,
    'object-file': ObjectFile,
    'object-upload': ObjectUpload
  },
  data: () => {
    return {
      // order of files UUIDs (for files which are currently being uploaded)
      uploads_order: [],
      // object where the key is file's UUID and value is file info (for files which are currently being uploaded)
      uploadsByUUID: {}
    }
  },
  computed: {
    // object token
    token () {
      return this.$store.state.object.generalInfo.token
    },
    // information about file server to which new files can be uploaded.
    fs () {
      return this.$store.state.object.generalInfo.fs_upload[0]
    },
    // order of object upload_ids from Store (for already uploaded files)
    filesOrder: {
      get () {
        return this.$store.state.object.filesOrder
      },
      set (val) {
        this.$store.commit('object/setFilesOrder', val)
      }
    },
    // map where the key is file's upload_id and value is file info from Store (for already uploaded files)
    filesByID: {
      get () {
        return this.$store.state.object.filesByID
      },
      set (val) {
        this.$store.commit('object/setFilesByID', val)
      }
    },
    // options for dropzone component. this field is computed because normally we shoul refer fo this.fs to form upload url, but for now it is hardcoded
    dropzoneOptions () {
      return {
        url: '/upload' + '/' + this.token,
        previewTemplate: '<div></div>',
        clickable: '.object-uploads__add'
      }
    }
  },
  methods: {
    // sorts upload list and sends request to API to change files sorting un object
    onDragEnd (e) {
      let payload = {
        list: this.filesOrder[e.newIndex],
        after_id: e.newIndex === 0 ? e.newIndex : this.filesOrder[e.newIndex - 1]
      }
      this.$http.post('/j_upload_list_order/' + this.token, payload)
    },
    // updates uploads_order and uploadsByUUID after files to be uploaded are added
    onFilesAdded (files) {
      for (let file of files) {
        this.uploads_order.push(file.upload.uuid)
        this.$set(this.uploadsByUUID, file.upload.uuid, {
          name: file.upload.filename,
          progress: file.upload.progress,
          size: file.size
        })
      }
    },
    // updates uploads_order, filesOrder and filesByID after file is successfully loaded
    onFileLoaded (file, response) {
      this.$set(this.filesByID, response.upload_id, response)
      this.filesOrder.push(response.upload_id)
      let index = this.uploads_order.indexOf(file.upload.uuid)
      this.uploads_order.splice(index, 1)
    },
    // changes progress of currently uploaded file to re-style progress bar
    onUploadProgress (file, progress, bytesSent) {
      this.$set(this.uploadsByUUID, file.upload.uuid, {
        name: file.upload.filename,
        progress: Math.floor(file.upload.progress),
        size: file.size
      })
    }
  }
}
</script>
