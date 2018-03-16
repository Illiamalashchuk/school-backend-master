<template>
<div id="images-list">
    <ul id="list">
        <li v-for="image in this.images">  
            
            <!-- <div class="img-card" @click={(ev) => this.openCarousel(post.id)} > -->
            <div class="img-card" @click="openCarousel">
                <div>{{ image }}</div>
                <!-- <div class="time">{{ post.created }}</div> -->
            </div>
 
        </li>
    </ul>
    <el-dialog :visible.sync="dialogVisible">
        
        <el-carousel  initial-index=2 type="card" autoplay="false" height="200px">
            <el-carousel-item   v-for="image in this.images">
                <!-- <h3>{{ post.img }}</h3> -->
            </el-carousel-item>
        </el-carousel>

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
#list {
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
            posts: [],
            errors: [],
            images: [],
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    // created() {
    //     axios.get(`/image`)
    //     .then(response => {
    //         // JSON responses are automatically parsed.
    //         this.posts = response.data
    //         console.log(this.posts);
    //     })
    //     .catch(e => {
    //         this.errors.push(e)
    //     })
    // },
    
    async created() {
        try {
          const response = await axios.get(`/files/5aa6de7742880021c4d19232`)
          let test = response.data
          console.log(test);
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
        },
        openCarousel(el) {
            let test = el;
            let imageId = test.toElement.firstChild.innerHTML;
            this.dialogVisible = true;
            console.log('image`s id', imageId) 
              
        }     
    }
};
</script>