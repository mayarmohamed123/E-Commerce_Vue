import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../modules/home/views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../modules/contact/views/ContactView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../modules/about/views/AboutView.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../modules/products/views/ProductsView.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../modules/products/views/ProductView.vue'),
  },
  {
    path: '*',
    name: 'NotFound', 
    component: () => import('../modules/core/views/NotFoundView.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
