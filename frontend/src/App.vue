<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition :name="transitionName" >
      <router-view class="child-view"/>
    </transition>

    <div class="orientation-notice" v-if="orientation">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>phone-hand-hold-1</title><path d="M21,0H11A3,3,0,0,0,8,3V6H7a7,7,0,0,0-7,7v5.546a3.839,3.839,0,0,0,2,3.527V23a1,1,0,0,0,2,0V21.5a1,1,0,0,0-.515-.874C2.32,19.99,2,19.545,2,18.546V13A5,5,0,0,1,7,8h.75A.25.25,0,0,1,8,8.25v2.5a.25.25,0,0,1-.25.25H6a1,1,0,0,0,0,2h5.5a1,1,0,0,1,0,2H8.467A1,1,0,0,0,7.5,16.03a2.172,2.172,0,0,1-1.078,1.835,2.038,2.038,0,0,1-.3.175A1,1,0,0,0,6.5,19.967a1.012,1.012,0,0,0,.375-.073A4.165,4.165,0,0,0,8,19.187V21a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V3A3,3,0,0,0,21,0Zm1,19a.5.5,0,0,1-.5.5h-11A.5.5,0,0,1,10,19V17h1.5a3,3,0,0,0,0-6H10V3.5a.5.5,0,0,1,.5-.5h11a.5.5,0,0,1,.5.5Z"/></svg>
      <div class="text">请竖屏浏览页面</div>
    </div>
    <img class="music-icon" @click="musicPlay(false)" v-show="music" src="https://cdn.zoocer.com/music-on1.png" alt="">
    <img class="music-icon" @click="musicPlay(true)" v-show="!music" src="https://cdn.zoocer.com/music-off1.png" alt="">

    <audio id='music' src="https://cdn.zoocer.com/10%20Naughty%20Ball%20%E5%A8%84%E8%89%BA%E6%BD%87.mp3" autoplay loop preload="preload"></audio>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      transitionName: "slide-top",
      orientation: false,
      music: true
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
    this.audioAutoPlay();
    this.judgeOrientation();
    window.addEventListener(
      // 避免在微信下 横屏后返回出现问题
      "orientationchange",
      () => {
        this.judgeOrientation();
        if (window.orientation === 0) {
          location.reload();
        }
      },
      false
    );
  },
  methods: {
    setWechatShare() {
      axios
        .post("/api/wechat/", {
          url: location.href
        })
        .then(resp => {
          wx.config(resp.data);
          wx.ready(() => {
            wx.onMenuShareAppMessage({
              title: "娄艺潇的圆梦之旅", // 分享标题
              desc: "关于音乐，我不是说说而已。", // 分享描述
              link: "https://loura.beats-digital.com", // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: "https://cdn.zoocer.com/share.jpg" // 分享图标
            });
            wx.onMenuShareTimeline({
              title: "娄艺潇的圆梦之旅", // 分享标题
              link: "https://loura.beats-digital.com",
              imgUrl: "https://cdn.zoocer.com/share.jpg" // 分享图标
            });
          });
        });
    },
    judgeOrientation() {
      window.orientation;
      if (window.orientation !== 0 && window.orientation !== 180) {
        this.orientation = true;
      } else {
        this.orientation = false;
      }
    },
    audioAutoPlay() {
      this.musicPlay(true);
      const musicInBrowserHandler = () => {
        this.musicPlay(true);
        this.musicPlay(false);
        this.musicPlay(true);
        document.body.removeEventListener("touchstart", musicInBrowserHandler);
      };
      document.body.addEventListener("touchstart", musicInBrowserHandler);
      document.addEventListener(
        "WeixinJSBridgeReady",
        () => {
          this.setWechatShare();
          this.musicPlay(true);
        },
        false
      );
    },
    musicPlay(isPlay) {
      var media = document.querySelector("#music");
      if (isPlay && media.paused) {
        media.play();
        this.music = true;
      }
      console.log(isPlay, media.paused);
      if (!isPlay && !media.paused) {
        this.music = false;
        media.pause();
      }
    }
  }
};
</script>


<style lang="scss">
.music-icon {
  position: fixed;
  top: 30px;
  right: 30px;
  width: 50px;
}
.orientation-notice {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 2;
  background: #121926;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .text {
    font-size: 40px;
    color: #d8d8d8;
  }
  svg {
    width: 100px;
    height: 100px;
    fill: white;
    margin-bottom: 50px;
  }
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
