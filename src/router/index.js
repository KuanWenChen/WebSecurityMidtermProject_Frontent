import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: (to, from) => {
      return true;
    },
  },
  {
    path: "/RegisterAccount",
    name: "RegisterAccount",
    component: () => import("../views/RegisterAccount.vue"),
  },
  {
    path: "/UserSetting",
    name: "UserSetting",
    component: () => import("../views/UserSetting.vue"),
    beforeEnter: (to, from) => {
      return true;
    },
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("../views/AdminPage.vue"),
    beforeEnter: (to, from) => {
      return true;
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
