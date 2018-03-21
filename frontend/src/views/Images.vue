<template>
<div id="images-list">
     <ul class="list">
         <li>
            <el-upload
                :action="`http://localhost:5000/api/image/${this.user}`" 
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
         </li>
        <li v-for="image in this.images">  
            <div class="image" @click="openImage(image)">
                <img :src="`http://localhost:5000/api/files/${image.img}`" width="auto" height="150">
            </div> 
        </li>
    </ul>

    <el-dialog class="dialog" :visible.sync="dialogVisible">
        <div class="big-image">
            <img :src="`http://localhost:5000/api/files/${this.link}`"  height="500">
        </div>
    </el-dialog>

</div>
</template>

<style>
#images-list {
    width: 80%;
    height: inherit;
    background: #f8f9fa;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    padding: 20px;
}
.list {
    display: flex;
    flex-wrap: wrap;
}
li {
    padding: 5px;
}
.img-card {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    word-wrap: break-word;
    border-radius: 5px;
    cursor: pointer;
}
.image {
    width: 150px;
    height: 152px;
    overflow: hidden;
    text-align: center;
    border: 1px solid black;
    cursor: pointer;
}
.big-image {
    text-align: center;
    padding: 10px;
}
.dialog {
    height: 700px;
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
            user: '5aaee2644a6bae284c5bf3eb',
            link: ''// here have to be user`s property
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
            this.link = el.img;            
        },    
    }
};
</script>