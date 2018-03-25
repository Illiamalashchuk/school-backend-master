<template>

    
        <el-carousel :autoplay="false" type="card" height="450px" indicator-position="none" :initial-index="index">
            <el-carousel-item v-for="image in this.images" :key="image.id" >
                <img :src="`http://localhost:5000/api/files/${image.img}`" width="100%">
                <el-button style="margin-top: 10px" type="danger" @click="deleteImage(image)">Delete</el-button>
            </el-carousel-item>
        </el-carousel>
    </el-dialog>



</template>

<style>
 
</style>
<script>
import axios from '../my-axios';
import { index } from '..src/views/Images';
// import {index, images, created, reloadMain, deleteImage} from 'views/Images';
export default {
    data() {
        return {
            images: [],
            errors: [],
            dialogImageUrl: '',
            dialogVisible: false,
            user: '5aaee2644a6bae284c5bf3eb', // here have to be user`s property
            //index: ''

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
        async reloadMain() {
            try {
                const response = await axios.get(`/image/${this.user}`) 
                this.images = response.data
            } catch (e) {
                this.errors.push(e)
            }
        },
        handleSuccess() {
            this.reloadMain()
        },

        openImage(image) {
            this.dialogVisible = true;
            this.index = this.images.indexOf(image);
            console.log('index', this.images.indexOf(image)) 
        }, 

        async deleteImage(e) {
            console.log(e)
            try {
                const response = await axios.delete(`/image/${e._id}`) 
                this.reloadMain();
                console.log('delete', response.data)
            } catch (e) {
                this.errors.push(e)
            }
        }   
    }
};
</script>