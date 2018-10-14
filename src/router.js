import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dream from "./views/Dream.vue";
import Comment from "./views/Comment.vue";
import MV from "./views/Mv.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dream",
      name: "dream",
      component: Dream
    },
    {
      path: "/comment",
      name: "comment",
      component: Comment
    },
    {
      path: "/mv",
      name: "mv",
      component: MV
    }
  ]
});
