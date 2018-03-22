<template>
    <div id="album-menu">
        <el-dialog title="Please fill properties of new album" :visible.sync="dialogFormVisible"> <!-- dialog with form of new album`s properties -->
            <el-form :model="form">
                <el-form-item label="Album`s name" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Album`s description" prop="description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="success" @click="postPost">Confirm</el-button>
            </span>
        </el-dialog> <!-- form dialog ends -->

        <div class="top-menu"> <!-- list of albums -->
            <el-button type="success" @click="dialogFormVisible = true">Create new album</el-button>
            <div style="margin: 10px 0;">List of albums</div>
            <ul class="list">
                <li v-for="post in this.posts">
                    <el-button class="prop" type="info" @click="openAlbum(post)" :data-set="`${post._id}`">{{ post.name }}</el-button>
                </li>
            </ul>
        </div> <!-- list of albums ends -->

        <div class="album-images" style="display:none"> <!-- here al images from album are shown -->
            <ul class="list">
                <li v-for="image in this.images">  
                    <div class="image" @click="openImage(image)" >
                        <img :src="`http://localhost:5000/api/files/${image.img}`" width="auto" height="150">
                    </div> 
                </li>
            </ul>
            <div class="buttons"> <!-- controll album`s buttons  -->
                <el-button type="primary" @click="openNonInsertedImages">Insert picture</el-button>
                <el-button type="danger" @click="deleteAlbum">Delete album</el-button>
            </div>
            <div class="images-for-inserting" style="display:none">
                <span>Please, choose only one picture to insert in album</span>
                <div v-if="this.nonInsertedImages==0" class="error">There are no other images</div>
                <ul v-else class="list non-inserted">
                    <li v-for="image in this.nonInsertedImages">  
                        <div class="image" @click="insertToAlbum(image)">
                            <img :src="`http://localhost:5000/api/files/${image.img}`" width="auto" height="150">
                        </div> 
                    </li>
                </ul>
            </div>
        </div> <!-- album-images ends -->

    <el-dialog class="dialog" :visible.sync="dialogVisible">
            <div class="big-image">
                <img :src="`http://localhost:5000/api/files/${this.link}`"  height="400">
            </div>
        </el-dialog>
    </div> <!-- album-menu ends -->
</template>

<style>
    #album-menu {
        width: 80%;
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
                nonInsertedImages: [],
                link: ''
            }
        },
        async created() { // get albums by user
            try {
                const response = await axios.get(`/album/${this.user}`)
                this.posts = response.data
            } catch (e) {
                this.errors.push(e)
            }
        },
        methods: {
            async reload() { // get albums by user
            try {
                const response = await axios.get(`/album/${this.user}`)
                this.posts = response.data
            } catch (e) {
                this.errors.push(e)
            }
        },
            async postPost() { // post new album
                try {
                    await axios.post(`/album/${this.user}`, this.form, this.dialogFormVisible = false);
                    this.reload()
                } catch (e) {
                    this.errors.push(e)
                }
            },
            async openAlbum(el) { // get images by album`s id
                document.querySelector('.album-images').style = "display: block"
                try {
                    //console.log(el._id);
                    const response = await axios.get(`/image/album/${el._id}`);
                    let arr = response.data;
                    for(let i = 0; i < response.data.length; i++) {
                        this.images = response.data;
                    }
                } catch (e) {
                    this.errors.push(e)
                }
            },
            async openNonInsertedImages(el) { // get images which aren`t in some album
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
            async insertToAlbum(el) { // insert one image to album
                let link = document.querySelector('.prop').dataset.set;
                //console.log(el);
                try {
                    await axios.put(`/image/${el._id}`, {album: link})
                    this.openNonInsertedImages();
                    this.openAlbum();
                } catch (e) {
                    this.errors.push(e)
                }
            },
            openImage(el) { // open image in dialog
                this.dialogVisible = true;
                this.link = el.img;            
            }, 
            
            
            async deleteAlbum() { // delete document album and album property from images
                let link = document.querySelector('.prop').dataset.set;
                try {
                    await axios.put(`/image/delimage/${link}`)
                    const response = await axios.delete(`/album/${this.el._id}`)  
                } catch (e) {
                    this.errors.push(e)
                }
            },
            // ......delete image from album.........
        }    
    };
</script>