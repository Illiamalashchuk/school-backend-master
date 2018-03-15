import Vue from 'vue';
import Router from 'vue-router';
import Images from '../views/Images';
import Tracks from '../views/Tracks';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      title: 'Images',
      path: '/images',
      component: Images
    },
    {
      title: 'Tracks',
      path: '/tracks',
      component: Tracks
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
