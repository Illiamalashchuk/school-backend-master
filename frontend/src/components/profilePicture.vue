<template>
  <div id="picture">
      <img v-if="this.posts[0]" :src="`http://localhost:5000/api/files/${this.posts[0].img}`" width="90%">
      <div v-else class="image default">
        <div>Click on "Add avatar" to upload your profile picture</div>
      </div>
    
    <el-upload class="upload-demo" :action="`http://localhost:5000/api/avatar/${this.user}`">
      <el-button class="btn" type="primary">Add avatar</el-button>
    </el-upload>

    <el-button class="btn" type="danger" @click="dialogVisible = true">Delete avatar</el-button>

    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span>Do you realy want to delete the profile picture?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteAvatar">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
  #picture {
    width: 100%;
    text-align: center;
  }
  .btn {
    margin: 10px 0;
    width: 150px;
  }
  .default {
    margin: auto;
    padding-top: 30px;
  }
</style>

<script>
import axios from '../my-axios';

  export default {
    data() {
      return {
        dialogVisible: false,
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
        this.dialogVisible = false
        try {
          const response = await axios.delete(`/avatar/${this.posts[0]._id}`) 
        } catch (e) {
          this.errors.push(e)
        }
      } 
    }
  }
</script>
