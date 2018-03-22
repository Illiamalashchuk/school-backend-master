<template>
  <div id="track-menu">
    <div class="top-menu"> 
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="`http://localhost:5000/api/track/${this.user}`"
      :auto-upload="false">
        <el-button slot="trigger" type="primary">Select audio file</el-button>
        <el-button type="success" @click="submitUpload">Upload</el-button>
    </el-upload>

    <div class="track-list">
      <div v-if="this.tracks==0" style="color: red; text-align: center;">There are no tracks</div>
      <ul v-else>
        <li v-for="track in this.tracks">  
          <ul class="track">
            <li style="margin-right: 30px;">{{ track.name }}</li>
            <li>
              <audio controls style="width: 500px;">
                <source :src="`http://localhost:5000/api/files/${track.track}`" type="audio/mpeg" preload="metadata">
                <a href="audio/music.mp3">Скачайте музыку</a>.
              </audio>
            </li>
            <li>
              <el-button type="danger" @click="deleteTrack(track)">Delete</el-button>
            </li>
          </ul> 
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<style>
  #track-menu {
    width: 80%;
    height: inherit;
    background: #f8f9fa;
    border-left: 1px solid #d9d9d9;
    padding: 20px;
  }
  .track-buttons {
    padding-bottom: 20px;
  }
  .track-list {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
  }
  .track {
    padding: 5px;
    width: auto;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
  }
</style>

   

<script>
import axios from '../my-axios';

export default {
    data() {
      return {
        tracks: [],
        errors: [],
        user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
      };
    },
    async created() {
        try {
          const response = await axios.get(`/track/${this.user}`)
          console.log('some track', response.data)
          this.tracks = response.data
        } catch (e) {
          this.errors.push(e)
        }
    },
    methods: {
      async reload() {
        try {
          const response = await axios.get(`/track/${this.user}`)
          console.log('some track', response.data)
          this.tracks = response.data
        } catch (e) {
          this.errors.push(e)
        }
    },
      async submitUpload() {
        try {
          this.$refs.upload.submit();
        } catch (e) {
          this.errors.push(e)
        }
      },
      async deleteTrack(el) {
        console.log(el)
        try {
          const response = await axios.delete(`/track/${el._id}`)
          this.reload();
          console.log('delete', response.data)
        } catch (e) {
          this.errors.push(e)
        }
      }
    }
  }
  
</script>
