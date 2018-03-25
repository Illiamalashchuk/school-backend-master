<template>
    <div id="main">
            <profile-picture></profile-picture>
    </div>
</template>

<style>
   #main {
       width: 22%;
       height: inherit;
       text-align: center;
       background: #f8f9fa;
       padding: 20px;
   }
</style>
<script>
    import profilePicture from 'components/profilePicture';

    export default {
        components: {
            profilePicture
        },
        data() {
            return {
            }
        }   
    };
</script>
