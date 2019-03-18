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
        @vdropzone-upload-progress="onUploadProgress">
        <div>
          <div @click.stop>
              <vue-draggable v-model="filesOrder" @end="onDragEnd" handle=".object-file__handle">
                <object-file :file="filesByID[fileID]" :token="token" v-for="fileID in filesOrder" :key="fileID"></object-file>
              </vue-draggable>
              <object-upload v-for="uuid in uploads_order" :upload="uploadsByUUID[uuid]" :token="token" :key="uuid"></object-upload>
              <!-- <div v-for="uuid in uploads_order" :key="uuid" @click="debugUpload(uploadsByUUID[uuid])">{{ uploadsByUUID[uuid].upload.progress }}% {{ uploadsByUUID[uuid].upload.filename }}</div> -->
          </div>
          <button>Add files</button>
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
      uploads_order: [],
      uploadsByUUID: {}
    }
  },
  computed: {
    token () {
      return this.$store.state.object.generalInfo.token
    },
    fs () {
      return this.$store.state.object.generalInfo.fs_upload[0]
    },
    filesOrder: {
      get () {
        return this.$store.state.object.filesOrder
      },
      set (val) {
        this.$store.commit('object/setFilesOrder', val)
      }
    },
    filesByID: {
      get () {
        return this.$store.state.object.filesByID
      },
      set (val) {
        this.$store.commit('object/setFilesByID', val)
      }
    },
    dropzoneOptions () {
      return {
        url: this.fs + '/' + this.token,
        previewTemplate: '<div></div>'
      }
    }
  },
  methods: {
    onDragEnd (e) {
      let payload = {
        list: this.filesOrder[e.newIndex],
        after_id: e.newIndex === 0 ? e.newIndex : this.filesOrder[e.newIndex - 1]
      }
      this.$http.post('/j_upload_list_order/' + this.token, payload)
    },
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
    onFileLoaded (file, response) {
      this.$set(this.filesByID, response.upload_id, response)
      this.filesOrder.push(response.upload_id)
      let index = this.uploads_order.indexOf(file.upload.uuid)
      this.uploads_order.splice(index, 1)
    },
    onUploadProgress (file, progress, bytesSent) {
      this.$set(this.uploadsByUUID, file.upload.uuid, {
        name: file.upload.filename,
        progress: Math.floor(file.upload.progress),
        size: file.size
      })
    },
    debugUpload (input) {
      console.log(input)
    }
  }
}
</script>
