import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  Home,
  NotFound,
} from './views';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: '首页',
  component: Home,
}, {
  path: '*',
  name: '404',
  component: NotFound,
}];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.afterEach((route) => {
  if (route) {
    document.title = route.name;
  } else {
    document.title = '首页';
  }
});

export default router;
