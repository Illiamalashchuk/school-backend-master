<template>
  <div id="tracklist-menu">
    <el-dialog title="Please fill the name of new tracklist" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="Name of tracklist" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="postPost">Confirm</el-button>
        </span>
    </el-dialog>

  <ul >
    <li v-for="post in this.posts">
      <!-- <el-button type="primary" @click="openAlbum" :data-set="`${ post._id }`">{{ post.name }}</el-button> -->
      <el-button type="primary">{{ post.name }}</el-button>
    </li>
    <li>
      <button class="btn add-album" type="text" @click="dialogFormVisible = true">Create new tracklist</button>
    </li>
    </ul>

  </div>
</template>
   
<style>
#tracklist-menu {
    width: 80%;
    background: #f8f9fa;
    padding: 20px;
}
li {
    list-style-type: none; 
   }
ul {
    margin-left: 0; 
    padding-left: 0; 
}
</style>


<script>
import axios from '../my-axios';

export default {
    data() {
      return {
        posts: [],
        errors: [],
        dialogFormVisible: false,
          form: {
              name: ''  
          },
      };
    },
    async created() {
        try {
          const response = await axios.get(`/tracklist`)
          this.posts = response.data
        } catch (e) {
          this.errors.push(e)
        }
    },
    methods: {
      async postPost() {
            try {
                await axios.post(`/tracklist`, this.form, this.dialogFormVisible = false)
            } catch (e) {
                this.errors.push(e)
            }
        },
    }
  }
  
</script>
