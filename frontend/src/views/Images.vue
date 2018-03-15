<template>
  <div id="wrapper">
    <image-list></image-list>
    <album-list></album-list>
  </div>
</template>

<style>
 #wrapper {
   width: 80%;
   display: flex;
   flex-wrap: wrap;
 }
</style>

<script>
import imageList from 'components/imageList';
import albumList from 'components/albumList';

export default {
  components: {
    imageList,
    albumList,
  }
  
}
</script>
