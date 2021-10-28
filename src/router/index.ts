import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import QueryPage from "@/views/QueryPage.vue";
import QueryResult from "@/views/QueryResult.vue";
import TraintimeDetail from "@/views/TraintimeDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "QueryPage",
    component: QueryPage,
    children: [
      {
        path: "/search",
        name: "QueryResult",
        component: QueryResult
      },
      {
        path: "/train-detail",
        name: "TraintimeDetail",
        component: TraintimeDetail
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
