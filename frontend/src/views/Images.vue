<template>
    <div id="images-menu">
        <div class="top-menu">

             <!-- upload new images -->
            <el-upload
            class="upload-demo"
            :action="`${this.server}/image/${this.user}`"
            :on-error="handleSuccess"
            multiple
            :limit="3">
                <el-button type="success">Upload new image</el-button>
            </el-upload>
            <!-- upload end -->

            <div style="margin: 10px 0; text-align: center;">List of images</div>

            <!-- list of images -->
            <div class="list-block">
                <div v-if="this.images==0" style="color: red; text-align: center;">There are no images</div>
                <ul v-else class="list">
                    <li v-for="image in this.images" :key="image._id">  
                        <div class="image" @click="openImage(image)">
                            <img :src="`${server}/files/${image.img}`" width="90%">
                        </div> 
                    </li>
                </ul>
                <!-- carousel of images -->
                <el-dialog class="dialog" :visible.sync="dialogVisible" width="70%">
                    <el-carousel :autoplay="false" height="550px" indicator-position="none" :initial-index="this.index">
                        <el-carousel-item v-for="image in this.images" :key="image.id" >
                            <img :src="`${server}/files/${image.img}`" height="500px">
                            <div>
                                <el-button style="margin-top: 10px" size="small" type="danger" @click="deleteImage(image)">Delete image</el-button>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
                <!-- carousel end -->
            </div>
            <!-- list of images end -->
        </div>
    </div>
</template>

<style>
    #images-menu {
        width: 78%;
        height: inherit;
        background: #f8f9fa;
        border-left: 1px solid #d9d9d9;
        padding: 20px;
    }
    .images-list {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
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
    .image:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    .dialog {
        text-align: center;
    }
    
</style>
<script>
    import axios from '../my-axios';

    export default {
    
        data() {
            return {
                server: 'http://localhost:5000/api', // here have to be link to server                
                user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
                images: [], // here are dowloaded images from "created"
                errors: [],
                index: '', // index which is used in carousel for opening particular slide
                dialogVisible: false
            }
        },
        async created() { // download images by "user"
            try {
                const response = await axios.get(`/image/${this.user}`);
                this.images = response.data;
            } catch (e) {
                this.errors.push(e)
            }
        },
        methods: {
            async reloadMain() { // function which we can insert in all function for reload images again
                try {
                    const response = await axios.get(`/image/${this.user}`);
                    this.images = response.data;
                } catch (e) {
                    this.errors.push(e)
                }
            },
            handleSuccess() { // show the success of posting images
                this.reloadMain();
                let self = this;
                setTimeout(function() {
                    self.successMessage('Image is successfully updated!');
                }, 3000);
            },

            openImage(image) { // open carousel of images
                this.dialogVisible = true;
                this.index = this.images.indexOf(image);
                console.log('index', this.images.indexOf(image));
            }, 

            async deleteImage(e) { // delete one image
                this.dialogVisible = false;
                try {
                    const response = await axios.delete(`/image/${e._id}`);
                    await axios.delete(`/files/${e.img}`);
                    this.reloadMain();
                    let self = this;
                    setTimeout(function() {
                        self.successMessage('Image is successfully deleted!');
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
    };
</script>