<template>
<div id="images-menu">
    <div class="top-menu">
        <el-upload
            class="upload-demo"
            ref="upload"
            :action="`http://localhost:5000/api/image/${this.user}`"
            :auto-upload="false">
                <el-button slot="trigger" type="primary">Select image file</el-button>
                <el-button type="success" @click="submitUpload">Upload</el-button>
        </el-upload>
        <div style="margin: 10px 0;">List of albums</div>
     <ul class="list">
        <li v-for="image in this.images">  
            <div class="image" @click="openImage(image)">
                <img :src="`http://localhost:5000/api/files/${image.img}`"  height="100%">
            </div> 
        </li>
    </ul>

    <el-dialog class="dialog" :visible.sync="dialogVisible">
        <div class="big-image">
            <img :src="`http://localhost:5000/api/files/${this.el.img}`"  height="400">
        </div>
        <el-button type="danger" @click="deleteImage">Delete image</el-button>
    </el-dialog>
    </div>
</div>
</template>

<style>
#images-menu {
    width: 80%;
    height: inherit;
    background: #f8f9fa;
    border-left: 1px solid #d9d9d9;
    padding: 20px;
}
.list {
    display: flex;
    flex-wrap: wrap;
}
li {
    padding: 5px;
}
.image {
    width: 150px;
    height: 150px;
    overflow: hidden;
    text-align: center;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    border-radius: 5px;
}
.big-image {
    text-align: center;
    padding: 10px;
}
.dialog {
    height: auto;
    text-align: center;
}
.image:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.slider-image {
    text-align: center;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<script>
import axios from '../my-axios';
export default {
    data() {
        return {
            images: [],
            errors: [],
            dialogImageUrl: '',
            dialogVisible: false,
            user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
            el: {}
        }
    },
    async created() {
      try {
        const response = await axios.get(`/image/${this.user}`) 
        this.images = response.data
      } catch (e) {
        this.errors.push(e)
      }
    },
    methods: {
        async submitUpload() {
        try {
          this.$refs.upload.submit();
        } catch (e) {
          this.errors.push(e)
        }
      },



      
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            this.created()
        },
        openImage(el) {
            this.dialogVisible = true;
            this.el = el;            
        }, 
        async deleteImage() {
            try {
                const response = await axios.delete(`/image/${this.el._id}`) 
                console.log('delete', response.data)
            } catch (e) {
                this.errors.push(e)
            }
        }   
    }
};
</script>