<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition :name="transitionName" >
      <router-view class="child-view"/>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "slide-top"
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-top";
      console.log(this.transitionName);
    }
  }
};
</script>


<style>
body {
  background: #121927;
}
.child-view {
  position: absolute;
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-top-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(0, 1331px);
  transform: translate(0, 1331px);
}
.slide-top-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(0, -1331px);
  transform: translate(0, -1331px);
}
@media screen and (min-width: 320px) {
  html {
    font-size: 10px;
  }
}

@media screen and (min-width: 375px) {
  html {
    font-size: 12px;
  }
}

@media screen and(min-width:414px) {
  html {
    font-size: 14px;
  }
}

@media screen and(min-width:600px) {
  html {
    font-size: 16px;
  }
}
</style>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
