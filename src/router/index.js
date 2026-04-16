import Vue from 'vue';
import VueRouter from 'vue-router';

// Eagerly loaded
import HomeView from '../modules/home/views/HomeView.vue';
import NotFoundView from '../modules/core/views/NotFoundView.vue';

// Lazy: Everything else (users might not visit)
const ContactView = () => import('../modules/contact/views/ContactView.vue');
const AboutView = () => import('../modules/about/views/AboutView.vue');
const ProductsView = () => import('../modules/products/views/ProductsView.vue');
const ProductView = () => import('../modules/products/views/ProductView.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Home' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
    meta: { title: 'Contact Us' },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'About Us' },
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView,
    meta: { title: 'Products' },
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductView,
    props: route => ({ id: route.params.id, title: route.query.title }),
    meta: { title: 'Product Details' },
  },
  {
    path: '*',
    name: 'NotFound', 
    component: NotFoundView,
    meta: { title: 'Page Not Found' },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// 1. Global Before Guard
router.beforeEach((to, from, next) => {
  // Update document title dynamically with query title if present
  if (to.query && to.query.title) {
    document.title = `${to.query.title} | E-Commerce`;
  } else {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (nearestWithTitle) {
      document.title = `${nearestWithTitle.meta.title} | E-Commerce`;
    } else {
      document.title = 'E-Commerce';
    }
  }

  // Scaffold for requiresAuth metadata checking
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // it should be handled if the project was having authentication and authorization but will keep it cause i study vue router guard and its lifecycle
    const isAuthenticated = false; // Mocked
    if (!isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router;
