<template>
  <div id="track-menu">
    <div class="top-menu"> 

      <!-- el-upload loads track to database -->
      <el-upload
      class="upload-demo"
      :action="`${this.server}/track/${this.user}`"
      :on-error="handleSuccess"
      multiple
      accept="audio/*"
      :limit="3">
          <el-button type="success">Upload new track</el-button>
      </el-upload>
      <!-- el-upload end -->
      
      <div style="margin: 10px 0; text-align: center;">List of tracks</div> 
      <div class="list-block">
        <div v-if="this.tracks==0" style="color: red; text-align: center;">There are no tracks</div>
        
        <!-- here are list of tracks (take from array "tracks") -->
        <ul v-else>
          <li v-for="track in this.tracks" :key="track.id">  
            <ul class="track">
              <li style="margin-right: 30px;">{{ track.name }}</li>
              <li>
                <audio controls style="width: 480px;">
                  <source :src="`${server}/files/music/${track.track}`" type="audio/mpeg" preload="metadata">
                  <a href="audio/music.mp3">Download the music</a>.
                </audio>
              </li>
              <li>
                <el-button size="small" type="danger" @click="deleteTrack(track)">Delete</el-button>
              </li>
            </ul> 
          </li>
        </ul>
        <!-- list of tracks end -->

      </div>
    </div>
  </div>
</template>

<style>
  #track-menu {
    width: 78%;
    height: inherit;
    background: #f8f9fa;
    border-left: 1px solid #d9d9d9;
    padding: 20px;
  }
  .track-buttons {
    padding-bottom: 20px;
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
        server: 'https://malashchuk-project.herokuapp.com/api', 
        user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
        tracks: [],
        errors: []
      };
    },
    
    // async getUserId() { // download user._id and save it in "user"
    //   try {
    //     const response = await axios.get(`some link`);
    //     this.user = response.data;
    //   } catch (e) {
    //     this.errors.push(e)
    //   }
    // },

    async created() { // download all tracks by "user"
        try {
          const response = await axios.get(`/track/${this.user}`);
          this.tracks = response.data;
        } catch (e) {
          this.errors.push(e);
        }
    },
    methods: {
      async reloadMain() { // function which we can insert in all function for reload tracks again
        try {
          const response = await axios.get(`/track/${this.user}`);
          this.tracks = response.data;
        } catch (e) {
          this.errors.push(e);
        }
      },

      handleSuccess() { // show the success of posting tracks
        this.reloadMain();
        let self = this;
        setTimeout(function() {
          self.successMessage('Track is successfully updated!');
        }, 500);
      },

      async deleteTrack(el) { // delete tracks
        try {
          await axios.delete(`/track/${el._id}`) // delete one track from collection of tracks
          await axios.delete(`/files/${el.track}`); // delete file from fs.files and fs.chunks
          this.reloadMain();
          let self = this;
          setTimeout(function() {
            self.successMessage('Track is successfully deleted!'); // show message of success
          }, 500);
        } catch (e) {
          this.errors.push(e)
        }
      },

      successMessage(message) { // message function
        this.$notify({
          title: 'Success',
          message: message,
          type: 'success'
        });
      }
    }
  }
</script>
