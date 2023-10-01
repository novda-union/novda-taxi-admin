import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "default-layout",
      component: () => import("@/layouts/DefaultLayout.vue"),
      children: [
        {
          path: "",
          name: "default-home-page",
          component: () => import("@/pages/Default/HomePage.vue"),
        },
      ],
    },
    {
      path: "/auth",
      name: "auth-layout",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "",
          name: "auth-main-page",
          component: () => import("@/pages/Auth/MainPage.vue"),
        },
      ],
    },
  ],
});

export default router;
