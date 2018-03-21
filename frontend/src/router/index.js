import Vue from 'vue';
import Router from 'vue-router';
import Images from '../views/Images';
import Tracks from '../views/Tracks';
import Albums from '../views/Albums';
import Tracklists from '../views/Tracklists';

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
      title: 'Albums',
      path: '/albums',
      component: Albums
    },
    {
      title: 'Tracks',
      path: '/tracks',
      component: Tracks
    },
    {
      title: 'Tracklists',
      path: '/tracklists',
      component: Tracklists
    },

    {
      path: '/*',
      redirect: '/'
    }
  ]
})
