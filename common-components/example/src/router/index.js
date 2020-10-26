import Vue from 'vue';
import Router from 'vue-router';

import PreviewPicture from '@/pages/previewPicture';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'preview-picture',
      component: PreviewPicture,
      meta: {
        keepAlive: false,
        isBack: false,
      },
    }
  ]
})

export default router;
