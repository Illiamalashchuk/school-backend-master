<template>
  <div id="picture-menu">
    <div v-if="this.avatars.length==0" class="image-block">
      <div>Click on "Add avatar" to upload your profile picture</div>
    </div>
    <div v-else class="avatar" @click="openAvatar">
      <img :src="`${server}/files/${this.avatars[this.avatars.length-1].img}`" width="100%">
    </div>
    
    <!-- upload avatar -->
    <el-upload class="upload-demo" 
    :action="`${this.server}/avatar/${this.user}`"
    :on-error="handleSuccess"
    accept="image/*">
      <el-button class="btn" type="success">Add avatar</el-button>
    </el-upload> 
    <!-- upload avatar end -->

    <!-- carousel of avatars -->
    <el-dialog class="dialog" :visible.sync="dialogAvatarVisible" width="70%">
      <el-carousel v-if="dialogAvatarVisible" :autoplay="false" height="550px" indicator-position="none" :initial-index="this.avatars.indexOf(this.avatars[this.avatars.length-1])">
          <el-carousel-item v-for="avatar in this.avatars" :key="avatar.id" >
              <img :src="`${server}/files/${avatar.img}`" height="500px">
              <!-- <div>
                  <el-button style="margin-top: 10px" size="small" type="danger" @click="deleteAvatar(avatar)">Delete image</el-button>
              </div> -->
          </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <!-- carousel end -->

    <el-button class="btn" type="danger" @click="dialogVisible = true">Delete avatar</el-button>

    <!-- confirming deleting avatar -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span>Do you realy want to delete the profile picture?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="success" @click="deleteAvatar">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- confirming end -->
  </div>
</template>

<style>
  #picture-menu {
    width: 100%;
    text-align: center;
  }
  .btn {
    margin-top: 10px;
    width: 150px;
  }
  .image-block {
    width: 180px;
    height: 180px;
    border: 1px dotted #d9d9d9;
    border-radius: 5px;
    margin: auto;
    padding: 40px 20px 20px 20px;
  }
  .avatar {
    width: 100%;
    cursor: pointer;
  }
</style>

<script>
  import axios from '../my-axios';

  export default {
    data() {
      return {
        server: 'http://localhost:5000/api', // here have to be link to server                
        user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
        avatars: [], // array of avatars from "created"
        errors: [],
        index: '', // index which is used in carousel for opening particular slide
        dialogVisible: false,
        dialogAvatarVisible: false
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

    async created() { // download all avatars
      try {
        const response = await axios.get(`/avatar/${this.user}`);
        this.avatars = response.data;
      } catch (e) {
        this.errors.push(e)
      }
    },
    
    methods: {
      async reloadMain() { // function which we can insert in all function for reload images again
        try {
          const response = await axios.get(`/avatar/${this.user}`);
          this.avatars = response.data;
        } catch (e) {
          this.errors.push(e)
        }
      },

      handleSuccess() { // show the success of posting images
        this.reloadMain();
        let self = this;
        setTimeout(function() {
          self.successMessage('Image is updated successfully!');
        }, 3000);
      },

      async deleteAvatar() { // delete the last avatar which is shown on the page
        this.dialogVisible = false;
        try {
          await axios.delete(`/avatar/${this.avatars[this.avatars.length-1]._id}`); // delete avatar from colletion of avatars
          await axios.delete(`/files/${this.avatars[this.avatars.length-1].img}`); // delete file from fs.files and fs.chunk
          this.reloadMain();
          let self = this;
          setTimeout(function() {
            self.successMessage('Image is deleted successfully!');
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
      }, 
      
      openAvatar() { // open carousel of avatars which started from the last
        this.dialogAvatarVisible = true;
        }
     }           
  }
</script>
