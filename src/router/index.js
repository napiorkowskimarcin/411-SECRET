import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TopScores from "../views/TopScores.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/History",
    name: "TopScores",
    component: TopScores,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
