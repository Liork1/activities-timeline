import Vue from 'vue';
import VueRouter from 'vue-router';
import Activities from '../views/Activities';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Activities,
  },
  {
    path: '/activities2',
    name: 'activities2',
    component: Activities,
  },
  {
    path: '*',
    component: Activities,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
