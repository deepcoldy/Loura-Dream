<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="layer">
      <div id="canvas"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Scene, Sprite } from "spritejs";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      ratio: 0
    };
  },
  created() {
    this.ratio = window.screen.availWidth / window.screen.availHeight;
  },
  mounted() {
    let stickMode = "height";
    if (this.ratio > 750 / 1331) stickMode = "width";
    const scene = new Scene("#canvas", {
      viewport: ["auto", "auto"],
      resolution: [750, 1331],
      stickMode
    });

    const layer = scene.layer();
    const background = new Sprite(
      "https://ws4.sinaimg.cn/large/006tKfTcly1ftj1fr5i0fj30ku10zwsd.jpg"
    );

    const girl = new Sprite(
      "http://zoneke-img.b0.upaiyun.com/2145bf19a6d3ea57ad995b0fe15732f9.png"
    );

    girl.attr({
      anchor: 0,
      pos: [80, 140]
    });

    // const robot = new Sprite(
    //   "https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png"
    // );

    // robot.attr({
    //   anchor: [0, 0.5],
    //   pos: [0, 0]
    // });

    // robot.animate(
    //   [
    //     { pos: [0, 0] },
    //     { pos: [0, 300] },
    //     { pos: [2700, 300] },
    //     { pos: [2700, 0] }
    //   ],
    //   {
    //     duration: 5000,
    //     iterations: Infinity,
    //     direction: "alternate"
    //   }
    // );

    layer.append(background);
    layer.append(girl);
  }
};
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>
<style>
body,
html,
#app,
.home {
  width: 100%;
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}
</style>
