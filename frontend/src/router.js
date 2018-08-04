import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dream from "./views/Dream.vue";

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
    }
  ]
});
