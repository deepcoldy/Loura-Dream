<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition :name="transitionName" >
      <router-view class="child-view"/>
    </transition>

    <audio id='music' src="https://test-1255639802.cos.ap-beijing.myqcloud.com/10%20Naughty%20Ball%20%E5%A8%84%E8%89%BA%E6%BD%87%20DEMO.mp3" autoplay loop preload="preload"></audio>
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
  },
  mounted() {
    this.autoPlayMusic();
    this.audioAutoPlay();
  },
  methods: {
    audioAutoPlay() {
      var audio = document.getElementById("music");
      audio.play();
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          audio.play();
        },
        false
      );
    },
    // 音乐播放
    autoPlayMusic() {
      // 自动播放音乐效果，解决浏览器或者APP自动播放问题
      function musicInBrowserHandler() {
        this.musicPlay(true);
        document.body.removeEventListener("touchstart", musicInBrowserHandler);
      }
      document.body.addEventListener("touchstart", musicInBrowserHandler);
      // 自动播放音乐效果，解决微信自动播放问题
      function musicInWeixinHandler() {
        this.musicPlay(true);
        document.addEventListener(
          "WeixinJSBridgeReady",
          function() {
            this.musicPlay(true);
          },
          false
        );
        document.removeEventListener("DOMContentLoaded", musicInWeixinHandler);
      }
      document.addEventListener("DOMContentLoaded", musicInWeixinHandler);
    },
    musicPlay(isPlay) {
      var media = document.querySelector("#music");
      if (isPlay && media.paused) {
        media.play();
      }
      if (!isPlay && !media.paused) {
        media.pause();
      }
    }
  }
};
</script>


<style>
a:link {
  /* Essentially means a[href], or that the link actually goes somewhere */
  color: transparent;
}
a:visited {
  color: transparent;
}
a:hover {
  color: transparent;
}
a:active {
  color: transparent;
}
div:link {
  /* Essentially means a[href], or that the link actually goes somewhere */
  color: transparent;
}
div:visited {
  color: transparent;
}
div:hover {
  color: transparent;
}
div:active {
  color: transparent;
}

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
