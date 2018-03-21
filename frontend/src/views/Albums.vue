<template>

<div id="album-list">
    
    <el-dialog title="Please fill properties of new album" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="Album`s name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Album`s description" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="postPost">Confirm</el-button>
        </span>
    </el-dialog>
    
    <ul class="list">
        <li v-for="post in this.posts">
         <el-button class="prop" type="primary" @click="openAlbum(post)" :data-set="`${post._id}`">{{ post.name }}</el-button>
        </li>
        <li>
          <button class="btn add-album" type="text" @click="dialogFormVisible = true">Create new album</button>
        </li>
    </ul>

    <div class="album-images" style="display:none">
      <ul class="list">
        <li v-for="image in this.images">  
            <div class="image" @click="openCarousel(image)" >
                <img :src="`http://localhost:5000/api/files/${image.img}`" width="auto" height="150">
            </div> 
        </li>
      </ul>
      <div class="buttons">
          <el-button type="primary" @click="openNonInsertedImages">Insert picture</el-button>
          <el-button type="danger" @click="deleteAlbum">Delete album</el-button>
      </div>
      <div class="images-for-inserting" style="display:none">

        <span>Please, choose only one picture to insert in album</span>
        <ul class="list non-inserted">
            <li v-for="image in this.nonInsertedImages">  
                <div class="image" @click="insertToAlbum(image)">
                    <img :src="`http://localhost:5000/api/files/${image.img}`" width="auto" height="150">
                </div> 
            </li>
      </ul>
      </div>

    </div>

    <!-- <el-dialog :visible.sync="dialogVisible">    
        <el-carousel :autoplay="false" height="300" indicator-position="none">
            <el-carousel-item v-for="image in this.images">
                <div class="slider-image">
                    <img v-bind:src="`http://localhost:5000/api/files/${image.img}`" width="auto" height="300" >
                </div>
            </el-carousel-item>
        </el-carousel>
    </el-dialog> -->
</div>
</template>

<style>
#album-list {
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
.images-for-inserting {
    height: 170px;
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
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
            dialogVisible: false,
            user: '5aaee2644a6bae284c5bf3eb',
            form: {
                name: '',
                description: '' 
            },
            images: [],
            nonInsertedImages: []    
        }
    },

    async created() {
        try {
          const response = await axios.get(`/album/${this.user}`)
          this.posts = response.data
        } catch (e) {
          this.errors.push(e)
        }
    },
    methods: {
        async postPost() {
            try {
                await axios.post(`/album/${this.user}`, this.form, this.dialogFormVisible = false)
            } catch (e) {
                this.errors.push(e)
            }
        },
       
        async openAlbum(el) {
          document.querySelector('.album-images').style = "display: block"
          try {
            console.log(el._id)
            const response = await axios.get(`/image/album/${el._id}`)
            let arr = response.data;
            for(let i = 0; i < response.data.length; i++) {
              this.images = response.data;
            }
            
          } catch (e) {
            this.errors.push(e)
          }
        },

        async openNonInsertedImages(el) {
          document.querySelector('.images-for-inserting').style = "display: block"
          try {
            const response = await axios.get(`/image/non-album/${this.user}`)
            //console.log(response.data)
            let arr = response.data;
            for(let i = 0; i < response.data.length; i++) {
              this.nonInsertedImages = response.data;
            }
          } catch (e) {
            this.errors.push(e)
          }
        },

        async insertToAlbum(el) {
            let link = document.querySelector('.prop').dataset.set;
            console.log(el);
            
            try {
                await axios.put(`/image/${el._id}`, {album: link})
                this.openNonInsertedImages();
                this.openAlbum();
            } catch (e) {
                this.errors.push(e)
            }
        },
        async deleteAlbum() {
            let link = document.querySelector('.prop').dataset.set;
            
            try {
                const albumImages = await axios.get(`/image/album/${link}`)
                // for(let i = 0; i < albumImages.data.length; i ++) {
                //     await axios.put(`/image/del-image-prop/${link}`, {album: link})
                // }

            console.log(albumImages.data);
                
            } catch (e) {
                this.errors.push(e)
            }
        },
        







         openCarousel(el) {
            this.dialogVisible = true;
            console.log(el)
        },
    }    
};
</script>