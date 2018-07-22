<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div id="hahatest"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { Scene, Sprite } from "spritejs";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    const scene = new Scene("#hahatest", {
      viewport: ["800", "800"],
      resolution: [3080, 800]
    });

    const layer = scene.layer();

    const robot = new Sprite(
      "https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png"
    );

    robot.attr({
      anchor: [0, 0.5],
      pos: [0, 0]
    });

    robot.animate(
      [
        { pos: [0, 0] },
        { pos: [0, 300] },
        { pos: [2700, 300] },
        { pos: [2700, 0] }
      ],
      {
        duration: 5000,
        iterations: Infinity,
        direction: "alternate"
      }
    );

    layer.append(robot);
  }
};
</script>
