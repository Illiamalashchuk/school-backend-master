<template>
    <div id="album-menu">
        <div class="top-menu">
            <el-button type="success" @click="dialogFormVisible = true">Create new album</el-button>
            <div style="margin: 10px 0; text-align: center;">List of albums</div>
            
            <!-- list of albums -->
            <div class="list-block"> 
                <div v-if="this.albums==0" style="color: red; text-align: center;">There are no albums</div>
                <ul v-else class="list">
                    <li v-for="album in this.albums" :key="album.id">
                        <el-button class="prop" type="info" @click="openAlbum(album)">{{ album.name }}</el-button>
                    </li>
                </ul>
            </div> <!-- list of albums end -->

            <!-- list of images which are in particular album -->
            <div class="list-block album-images" style="display:none"> <!-- here all images from album are shown -->
                <div v-if="this.images==0" style="color: red; text-align: center;">There are no images in this album</div>
                <ul v-else class="list">
                    <li v-for="(image, index) in this.images" :key="image.id">  
                        <div class="image" @click="openImage(image, index)">
                            <img :src="`${server}/api/files/${image.img}`" width="auto" height="150">
                        </div> 
                    </li>
                </ul>
                <div class="buttons"> <!-- album buttons  -->
                    <el-button size="mini" type="danger" @click="dialogConfirmVisible = true">Delete album</el-button>
                    <el-button size="mini" type="primary" @click="openNonInsertedImages">Insert image to album</el-button>
                </div>
            </div> 
            <!-- list of album images end -->

            <!-- list of images which you can insert to particular album -->
            <div class="images-for-inserting" style="display:none">
                <span>Please, choose only one picture to insert in album</span>
                <div v-if="this.nonInsertedImages==0" class="error">There are no other images
                    <!-- upload new images if there still aren`t any-->
                    <el-upload
                    class="upload-demo"
                    :action="`${this.server}/api/image/${this.user}`"
                    :on-error="handleSuccess"
                    multiple
                    accept="image/*"
                    :limit="3">
                        <el-button type="success">Upload new image</el-button>
                    </el-upload>
                    <!-- upload end -->
                </div>
                <ul v-else class="list non-inserted">
                    <li v-for="image in this.nonInsertedImages" :key="image.id">  
                        <div class="image" @click="insertToAlbum(image)">
                            <img :src="`${server}/api/files/${image.img}`" width="auto" height="150">
                        </div> 
                    </li>
                </ul>
            </div>
            <!-- list of images for inserting end -->

            <!-- dialog of confirming deleting images -->
            <el-dialog :visible.sync="dialogConfirmVisible" width="30%">
                <span>Do you realy want to delete the album?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="dialogConfirmVisible = false">Cancel</el-button>
                    <el-button type="success" @click="deleteAlbum">Confirm</el-button>
                </span>
            </el-dialog>
            <!-- confirming dialog end -->
        </div>

        <!-- images carousel -->
        <el-dialog class="dialog" :visible.sync="dialogVisible" width="70%">
            <el-carousel v-if="dialogVisible" :autoplay="false" height="550px" indicator-position="none" :initial-index="index">
                <el-carousel-item v-for="image in this.images" :key="image.id" >
                    <img :src="`${server}/api/files/${image.img}`" height="500px">
                    <div style="display: flex; flex-wrap: wrap; margin-left: 385px;">
                        <el-button style="margin-top: 10px" size="small" type="danger" @click="deleteImage(image)">Delete image</el-button>
                        <el-button style="margin-top: 10px" size="small" type="danger" @click="deleteImageFromAlbum(image)">Delete from album</el-button>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
        <!-- images carousel end -->

        <!-- dialog-form of new album`s properties -->
        <el-dialog title="Please fill properties of new album" :visible.sync="dialogFormVisible"> 
            <el-form :model="form">
                <el-form-item label="Album`s name" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="success" @click="albumUpload">Confirm</el-button>
            </span>
        </el-dialog> 
        <!-- form dialog end -->
    </div> 
</template>

<style>
    #album-menu {
        width: 78%;
        background: #f8f9fa;
        border-left: 1px solid #d9d9d9;
        padding: 20px;
    }
    .album-images {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
    }
    .top-menu {
        border: 1px solid #d9d9d9;
        padding: 10px;
        border-radius: 8px;
    }
    .error {
        color: red;
        text-align: center;
        padding-top: 40px;
    }
    li {
        list-style-type: none; 
    }
    ul {
        margin-left: 0; 
        padding-left: 0; 
    }
    .images-for-inserting {
        height: 200px;
        width: 100%;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
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
                server: 'https://malashchuk-project.herokuapp.com', // here have to be link to server                
                user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
                albums: [], // array with albums - albumUpload
                errors: [],
                form: { // form with new album properties - albumUpload sends
                    name: ''
                },
                images: [], // array with images from some album
                nonInsertedImages: [], // array with images which aren`t in particular album
                link: [], // here is property of some album which is saved here is "openAlbum" 
                index: '',
                dialogFormVisible: false, 
                dialogVisible: false,
                dialogConfirmVisible: false
            }
        },
        
        // async getUserId() { // download user._id and save it in "user"
        //   try {
        //     const response = await axios.get(`some link`);
        //     this.user = response.data;
        //   } catch (e) {
        //     this.errors.push(e)
        //   }
        // },

        async created() { // get albums by user
            try {
                const response = await axios.get(`/album/${this.user}`);
                this.albums = response.data;
            } catch (e) {
                this.errors.push(e);
            }
        },
        methods: {
            async reload() { // get albums by user
                try {
                    const response = await axios.get(`/album/${this.user}`);
                    this.albums = response.data;
                } catch (e) {
                    this.errors.push(e);
                }
            },

            async reloadImages() { // get images by album property
                try {
                    const response = await axios.get(`/image/album/${this.link}`);
                    this.images = response.data;
                } catch (e) {
                    this.errors.push(e);
                }
            },

            async albumUpload() { // post new album
                try {
                    await axios.post(`/album/${this.user}`, this.form, this.dialogFormVisible = false);
                    this.reload();
                    let self = this;
                    setTimeout(function() {
                        self.successMessage('Album is successfully created!');
                    }, 500);
                } catch (e) {
                    this.errors.push(e);
                }
            },
            async openAlbum(el) { // get images by album`s id
                document.querySelector('.album-images').style = "display: block";
                this.link = []; // clear album property which was saved after click on album`s button
                this.images = []; // clear array with images for save here images from other album
                this.link = el._id // here are saved id of album for getting particular images with this album id
                try {
                    const response = await axios.get(`/image/album/${el._id}`);
                    this.images = response.data;
                } catch (e) {
                    this.errors.push(e)
                }
            },

            async openNonInsertedImages(el) { // get images which aren`t in some album
                document.querySelector('.images-for-inserting').style = "display: block";
                this.nonInsertedImages = [];
                this.reloadImages();
                try {
                    const response = await axios.get(`/image/non-album/${this.user}`);
                    this.nonInsertedImages = response.data; 
                } catch (e) {
                    this.errors.push(e);
                }
            },

            handleSuccess() {
                this.openNonInsertedImages()
                let self = this;
                setTimeout(function() {
                    self.successMessage('Image is successfully updated');
                }, 3000);
            },

            async insertToAlbum(el) { // insert one image to album
                try {
                    await axios.put(`/image/${el._id}`, {album: this.link});
                    this.openNonInsertedImages();
                    this.reloadImages();
                } catch (e) {
                    this.errors.push(e);
                }
            },
            
            openImage(image, index) { // show carousel of images
                this.dialogVisible = true;
                this.index = index;
                //console.log('index', this.images.indexOf(image)) 
            },
            
            async deleteAlbum() { // delete document album and album property from images
                this.dialogConfirmVisible = false;
                try {
                    await axios.put(`/image/del-all-images/${this.link}`);
                    await axios.delete(`/album/${this.link}`);
                    this.openNonInsertedImages(); // call function which get all non-inserted images (all images from album appear there)
                    this.reloadImages(); // call function which show us images in album
                    this.reload(); // review albums menu (-1 album)
                    let self = this;
                    setTimeout(function() {
                        self.successMessage('Album is successfully deleted!');
                    }, 500);
                    document.querySelector('.images-for-inserting').style = "display: none";
                    document.querySelector('.album-images').style = "display: none";
                } catch (e) {
                    this.errors.push(e);
                }
            },
            
            async deleteImage(e) { // delete one image from image`s collection
                this.dialogVisible = false; // close dialog
                try {
                    await axios.delete(`/image/${e._id}`);
                    await axios.delete(`/files/${e.img}`);
                    this.openNonInsertedImages(); // call function which get all non-inserted images
                    this.reloadImages(); // call function which get all images from this album (-1 image)
                    let self = this;
                    setTimeout(function() {
                        self.successMessage('Image is successfully deleted');
                    }, 500);
                } catch (e) {
                    this.errors.push(e)
                }
            },

            async deleteImageFromAlbum(e) { // delete one image from album
                this.dialogVisible = false; // close dialog
                try {
                    await axios.put(`/image/del-one-images/${e._id}`, e.album);
                    this.openNonInsertedImages(); // call function which get all non-inserted images (there should appear one new image)
                    this.reloadImages(); // call function which get all images from this album (should be one less image)
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