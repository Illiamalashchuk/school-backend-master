<template>
  <div id="picture">
      <img v-if="this.posts[0]" :src="`http://localhost:5000/api/files/${this.posts[0].img}`" width="90%">
      <div v-else class="image">Click on "Add avatar" to upload your profile picture</div>
    
    <el-upload class="upload-demo" :action="`http://localhost:5000/api/avatar/${this.user}`">
      <el-button size="small" type="primary">Add avatar</el-button>
    </el-upload>

    <el-button type="danger" @click="deleteAvatar">Delete avatar</el-button>
  </div>
</template>

<style>

#picture {
    width: 100%;
    text-align: center;
}
.avatar {
    width: 80%;
    height: 150px;
    overflow: hidden;
    text-align: center;
    border: 1px solid black;
    cursor: pointer;
}

</style>

<script>
import axios from '../my-axios';

  export default {
    data() {
      return {
        posts: [],
        errors: [],
        user: '5aaee2644a6bae284c5bf3eb'
      };
    },
    async created() {
      try {
        const response = await axios.get(`/avatar/${this.user}`)
        this.posts = response.data
      } catch (e) {
        this.errors.push(e)
      }
    },
    
    methods: {
      async deleteAvatar() {
        try {
          console.log('deleted')
          const response = await axios.delete(`/avatar/${this.posts[0]._id}`)
        } catch (e) {
          this.errors.push(e)
        }
      } 
    }
  }
</script>
