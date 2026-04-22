/**
 * Router Configuration
 * Defines all application routes, including lazy-loaded modules and global guards.
 * @module router
 */
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  type RouteRecordNormalized,
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomeView from "../modules/home/views/HomeView.vue";
import NotFoundView from "../modules/core/views/NotFoundView.vue";

// Lazy: Everything else (users might not visit)
const ContactView = () => import("../modules/contact/views/ContactView.vue");
const AboutView = () => import("../modules/about/views/AboutView.vue");
const ProductsView = () => import("../modules/products/views/ProductsView.vue");
const ProductView = () => import("../modules/products/views/ProductView.vue");

/** Route metadata interface */
interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
}

/** Extended route record with typed meta */
type AppRouteRecord = RouteRecordRaw & {
  meta?: RouteMeta;
};

const routes: AppRouteRecord[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { title: "Home" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
    meta: { title: "Contact Us" },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: { title: "About Us" },
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsView,
    meta: { title: "Products" },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: ProductView,
    props: (route: RouteLocationNormalized) => ({
      id: route.params.id,
      title: route.query.title,
    }),
    meta: { title: "Product Details" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalizedLoaded,
    savedPosition: { left: number; top: number } | null,
  ) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global Before Guard
router.beforeEach((to: RouteLocationNormalized) => {
  // Update document title dynamically with query title if present
  if (to.query && to.query.title) {
    document.title = `${to.query.title} | E-Commerce`;
  } else {
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find((r: RouteRecordNormalized) => r.meta && r.meta.title);
    if (nearestWithTitle && nearestWithTitle.meta?.title) {
      document.title = `${nearestWithTitle.meta.title} | E-Commerce`;
    } else {
      document.title = "E-Commerce";
    }
  }

  // --- AUTHENTICATION GUARD SCAFFOLD ---
  // TODO: Implement real authentication check using an auth store.
  // This guard is currently MOCKED to allow development but is set to always redirect, 
  // which might be confusing. Ensure this is wired up to useAuthStore().isLoggedIn before production.
  if (
    to.matched.some(
      (record: RouteRecordNormalized) => record.meta?.requiresAuth,
    )
  ) {
    const isAuthenticated = false; // Mocked — Set to true for development bypass if needed
    if (!isAuthenticated) {
      console.warn(`[Route Guard] Access denied to "${to.fullPath}". Requires authentication.`);
      return { name: "Home" };
    }
  }
});

export default router;
