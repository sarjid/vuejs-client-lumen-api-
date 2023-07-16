import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/Index.vue";
import { Login, Register } from "@/pages/Auth";
import Dashboard from "@/pages/User/Dashboard.vue";
import { ProductCreate, ProductIndex } from "@/pages/Product";
import { useAuthStore } from "@/stores/auth";

//routes will be go here
const routes = [
  { path: "/", component: Index, name: "index" },
  {
    path: "/auth/login",
    component: Login,
    name: "user.login",
    meta: { guest: true },
  },

  {
    path: "/auth/register",
    component: Register,
    name: "user.register",
    meta: { guest: true },
  },

  {
    path: "/user/dashboard",
    component: Dashboard,
    name: "user.dashboard",
    meta: { requiresAuth: true },
  },

  {
    path: "/product/create",
    component: ProductCreate,
    name: "product.create",
    meta: { requiresAuth: true },
  },

  {
    path: "/product",
    component: ProductIndex,
    name: "product.index",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn) {
      next({ name: "user.login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (auth.isLoggedIn) {
      next({ name: "user.dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
