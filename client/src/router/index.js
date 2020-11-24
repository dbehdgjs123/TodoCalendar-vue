import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
//import Calender from "../components/CalenderPage.vue"
import TodoPage from "../components/TodoCompo/TodoPage.vue"
import HistoryPage from "../components/Historys/HistoryPage.vue"
import LoginPage from "../components/UserCompo/LoginPage.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: TodoPage
  },
  {
    path: "/history",
    component: HistoryPage
  },
  {
    path: "/login",
    component: LoginPage
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
