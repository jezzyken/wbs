import Vue from "vue";
import VueRouter from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue";
import PublicLayout from "../layouts/PublicLayout.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/public/Home.vue"),
      },
      {
        path: "bill-inquiry",
        name: "BillInquiry",
        component: () => import("@/views/public/BillInquiry.vue"),
      },
      {
        path: "contact",
        name: "ContactUs",
        component: () => import("@/views/public/ContactUs.vue"),
      },
      {
        path: "annoucements",
        name: "Annoucements",
        component: () => import("@/views/public/Announcements.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
      },
      {
        path: "consumers",
        name: "ConsumerRecords",
        component: () => import("@/views/admin/ConsumerRecords.vue"),
      },
      {
        path: "billing",
        name: "Billing",
        component: () => import("@/views/admin/Billing.vue"),
      },
      {
        path: "payments",
        name: "Payments",
        component: () => import("@/views/admin/Payments.vue"),
        props: true,
      },
      {
        path: "readings",
        name: "Readings",
        component: () => import("@/views/admin/Readings.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/admin/Users.vue"),
      },
      {
        path: "expenses",
        name: "Expenses",
        component: () => import("@/views/admin/Expenses.vue"),
      },
      {
        path: "reports",
        name: "Reports",
        component: () => import("@/views/admin/Reports.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/admin/Settings.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (store.getters['auth/isAuthenticated']) {
      next('/admin/dashboard')
    } else {
      next()
    }
    return
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      const userRole = store.getters['auth/userRole']
      if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        next('/unauthorized')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router;
