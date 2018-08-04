<template>
  <!-- <div class="wrapper">
    <div class="container">
      <img src="https://test-1255639802.cos.ap-beijing.myqcloud.com/page7/%E8%83%8C%E6%99%AF.jpg" alt="" class="background" :style="{height: ratio > (750/1331) ? '':'100%', width: ratio > (750/1331) ? '100%':''}">
    </div>
      <div class="text">
        <img v-for="(img,index) in text" :src="img" alt="" :key="index">
      </div>
  </div> -->
  <div class="home">

    <div class="layer" @click="nextPage()">
        <div id="dream"></div>
      </div>
  </div>
</template>

<script>
import { Scene, Sprite, Group } from "spritejs";

export default {
  data() {
    return {
      ratio: 0,
      text: [],
      layer: null,
      scene: null,
      background: null,
      group: null
    };
  },
  mounted() {
    this.ratio =
      document.documentElement.clientWidth /
      document.documentElement.clientHeight;

    let stickMode = "height";
    if (this.ratio > 750 / 1331) stickMode = "width";
    this.scene = new Scene("#dream", {
      viewport: ["auto", "auto"],
      resolution: [750, 1331],
      stickMode
    });
    this.layer = this.scene.layer();
    this.background = new Sprite(
      "https://test-1255639802.cos.ap-beijing.myqcloud.com/page7/%E8%83%8C%E6%99%AF.jpg"
    );
    this.group = new Group();
    this.group.append(this.background);
    this.layer.append(this.group);

    const array = Array.from({ length: 13 });
    array.map((item, index) => {
      console.log(item);
      this.text.push(
        new Sprite(
          `https://test-1255639802.cos.ap-beijing.myqcloud.com/page7/${index +
            1}.png`
        ).attr({
          anchor: 0.5
        })
      );
    });
    this.group.append(
      this.text[0].attr({
        pos: [750 / 2, 95]
      })
    );
    this.group.append(
      this.text[1].attr({
        pos: [750 / 2, 95 + 40 + 20 + 67]
      })
    );
    this.group.append(
      this.text[2].attr({
        pos: [750 / 2, 95 + 40 + 20 + 67 + 42 + 20]
      })
    );
    this.group.append(
      this.text[3].attr({
        pos: [750 / 2, 95 + 40 + 20 + 67 + 42 + 20 + 42 + 20]
      })
    );
    this.group.append(
      this.text[4].attr({
        pos: [750 / 2, 95 + 40 + 20 + 67 + 42 + 20 + 42 + 20 + 43 + 20]
      })
    );
    this.group.append(
      this.text[5].attr({
        pos: [
          750 / 2,
          95 + 40 + 20 + 67 + 42 + 20 + 42 + 20 + 43 + 20 + 43 + 20
        ]
      })
    );
    this.group.append(
      this.text[6].attr({
        //越来越近
        pos: [750 / 2, 536 + 100]
      })
    );
    this.group.append(
      this.text[7].attr({
        pos: [750 / 2, 636 + 42 + 20]
      })
    );
    this.group.append(
      this.text[8].attr({
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20]
      })
    );
    this.group.append(
      this.text[9].attr({
        // 记得迈出第一步
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20 + 42 + 20]
      })
    );
    this.group.append(
      this.text[10].attr({
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20 + 42 + 20 + 57 + 20 + 120]
      })
    );
    this.group.append(
      this.text[11].attr({
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20 + 42 + 20 + 57 + 20 + 44 + 20]
      })
    );
  }
};
</script>
<style scoped>
#dream {
  height: 100%;
  width: 100%;
}
.layer {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
