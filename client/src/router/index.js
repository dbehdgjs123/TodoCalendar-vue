import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import axios from "axios";

import TodoPage from "../components/TodoCompo/TodoPage.vue";
import HistoryPage from "../components/Historys/HistoryPage.vue";
import LoginPage from "../components/UserCompo/LoginPage.vue";
import SignupPage from "../components/UserCompo/SignupPage.vue";

Vue.use(VueRouter);

const checkToken = (to,from, next) => {
  console.log(to,from,next,store)
  //store에 토큰이 저장되어있으면 그냥 넘어간다.
  if(store.getters.rootToken) {
    return next();
  }
  //없을시 쿠키를 찾아보고 복호화까지 한 후 다음 페이지로 넘어간다. (토큰이 있을시 그냥 넘어가게 되면 토큰의 위,변조가 있을 수 있다.)
  axios.get("/api/users/auth")
  .then(res => {
    if(!res.data.success) {
      //없을시에 로그인화면
      alert(res.data.message);
      return next('/login');
    }
    //있을시에 유저 데이터가 넘어오고, 스토어에 저장시켜준다.
    store.commit("onAuthComplete",res.data)
    next();
    
  })
  .catch(err => console.log(err))
  
}

const routes = [
  {
    path: "/",
    component: TodoPage,
    beforeEnter: checkToken
  },
  {
    path: "/history",
    component: HistoryPage,
    beforeEnter: checkToken
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/signup",
    component: SignupPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
