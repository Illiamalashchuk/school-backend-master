<template>

<div id="album-list">
    <div class="album-title">Albums</div>
    <button class="btn add-album" type="text" @click="dialogFormVisible = true">Create new album</button>
    
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
    
    <ul id="list">
        <li v-for="post in this.posts">
         <el-button type="primary">{{ post.name }}</el-button>
        </li>
    </ul>
</div>
</template>

<style>
#album-list {
    width: 20%;
    background: #f8f9fa;
    text-align: center;
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
                name: '',
                description: '' 
            }    
        }
    },
    async created() {
        try {
          const response = await axios.get(`/album`)
          this.posts = response.data
          console.log(this.posts)
        } catch (e) {
          this.errors.push(e)
        }
    },
    
    methods: {
        async postPost() {
            try {
                await axios.post(`/album`, this.form, this.dialogFormVisible = false)
            } catch (e) {
                this.errors.push(e)
            }
        },
        
    }    
};
</script>