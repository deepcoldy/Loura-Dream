<template>
  <div class="home">
    <div class="layer" style='-webkit-tap-highlight-color:rgba(255,0,0,0);'>
      <div id="video"></div>
    </div>
    <video id="test" controls="" preload="true" mediagroup="myVideoGroup" poster="http://media.w3.org/2010/05/sintel/poster.png"> 
      <source id="mp4" src="https://ss.archirookies.com/assets/lili.mp4" type="video/mp4"> 
      <p>Your user agent does not support the HTML5 Video element.</p> 
    </video> 
    <iframe v-if="shadow" class="iframe" frameborder="0" src="https://v.qq.com/iframe/player.html?vid=o00279bx3os&tiny=0" allowfullscreen="auto"></iframe>
  </div>
</template>

<script>
import { Scene, Sprite, Group } from "spritejs";

export default {
  data() {
    return {
      layer: null,
      background: null,
      group: null,
      tv: null,
      playButton: null,
      cover: null,
      button1: null,
      button1Active: null,
      button2: null,
      button2Active: null,
      shadow: null
    };
  },
  mounted() {
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        document.getElementById("test").play();
      },
      false
    );
    this.ratio =
      document.documentElement.clientWidth /
      document.documentElement.clientHeight;
    let stickMode = "height";
    if (this.ratio > 750 / 1331) stickMode = "width";
    this.scene = new Scene("#video", {
      viewport: ["auto", "auto"],
      resolution: [750, 1331],
      stickMode
    });
    this.layer = this.scene.layer();
    this.background = new Sprite(
      "https://cdn.zoocer.com/page9/%E8%83%8C%E6%99%AF.jpg"
    );
    this.group = new Group();
    this.group.append(this.background);
    this.layer.append(this.group);
    this.tv = new Sprite(
      "https://cdn.zoocer.com/page9/%E7%94%B5%E8%A7%86-min.png"
    ).attr({ zIndex: 2 });
    this.group.append(this.tv);
    this.cover = new Sprite(
      "https://cdn.zoocer.com/page9/%E9%9D%9E%E7%B1%BB-min.png"
    ).attr({
      pos: [110, 190]
    });
    this.group.append(this.cover);
    this.playButton = new Sprite(
      "https://cdn.zoocer.com/page9/%E6%92%AD%E6%94%BE%E6%8C%89%E9%92%AE-min.png"
    ).attr({
      pos: [280, 290]
    });
    this.group.append(
      this.playButton.on("click", () => {
        this.toggleShadow();
        console.log(this.shadow);
      })
    );

    this.button1 = new Sprite("https://cdn.zoocer.com/page9/button1.png").attr({
      pos: [240, 650]
    });
    this.group.append(this.button1);
    this.button1Active = new Sprite(
      "https://cdn.zoocer.com/page9/button1-active.png"
    ).attr({
      pos: [240, 650]
    });
    this.group.append(this.button1Active);

    this.button2Active = new Sprite(
      "https://cdn.zoocer.com/page9/button2-active.png"
    ).attr({
      pos: [230, 710]
    });
    this.group.append(this.button2Active);
    this.button2 = new Sprite("https://cdn.zoocer.com/page9/button2.png").attr({
      pos: [230, 710]
    });
    this.group.append(this.button2);
    this.button1.on("click", () => {
      this.group.append(this.button1Active);
      this.group.append(this.button2);
    });

    this.button2.on("click", () => {
      this.group.append(this.button2Active);
      this.group.append(this.button1);
    });
  },
  methods: {
    nextPage() {
      this.$router.replace("/comment");
    },
    toggleShadow(force = false) {
      console.log(this);
      if (!this.shadow && !force) {
        this.$parent.musicPlay(false);
        this.shadow = new Sprite({
          bgcolor: "rgba(0, 0, 0, 0.5)",
          size: [750, 1331]
        }).on("click", () => {
          this.toggleShadow();
        });
        this.group.append(this.shadow);
      } else {
        this.$parent.musicPlay(true);
        this.group.removeChild(this.shadow);
        this.shadow = null;
      }
    }
  }
};
</script>
<style scoped>
#video {
  height: 100%;
  width: 100%;
}
.layer {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.iframe {
  position: absolute;
  top: 50%;
  left: 0%;
  width: 100%;
  height: 50%;
  transform: translateY(-50%);
}
</style>
