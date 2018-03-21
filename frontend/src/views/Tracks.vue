<template>
  <div id="track-menu">
    
    <form enctype="multipart/form-data" method="post" action="http://localhost:5000/api/track">
      <p>Загрузите ваши audio на сервер</p>
      <p><input type="file" name="photo" multiple accept="audio/*">
      <input type="submit" value="Отправить"></p>
    </form>

    <div class="track-list">
      <ul>
        <li v-for="track in this.tracks">  
          <div class="track">
            <span>{{ track.artist }} - {{ track.composition }}</span>
            <audio controls>
              <source v-bind:src="`http://localhost:5000/api/files/${track.track}`" type="audio/mpeg" preload="metadata">
              <a href="audio/music.mp3">Скачайте музыку</a>.
            </audio>
          </div> 
        </li>
      </ul>
    </div>

  </div>
</template>

<style>
#track-menu {
  width: 80%;
}
  .track-list {
    width: 100%;
    height: 200px;
    border: 1px solid black;
  }
  .track {
    width: inherit;
    height: 50px;
    border: 1px solid black;
  }
</style>

   

<script>
import axios from '../my-axios';

export default {
    data() {
      return {
        tracks: [],
        errors: [],
      };
    },
    async created() {
        try {
          const response = await axios.get(`/track`)
          console.log('some track', response.data)
          this.tracks = response.data
        } catch (e) {
          this.errors.push(e)
        }
    },
    methods: {
     
    }
  }
  
</script>
