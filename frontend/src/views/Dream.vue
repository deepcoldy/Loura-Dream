<template>
  <div class="home">
    <div class="layer" @click="nextPage()"  style='-webkit-tap-highlight-color:rgba(255,0,0,0);'>
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
      // 看着这张新专辑
      this.text[0].attr({
        opacity: 0,
        pos: [750 / 2, 115]
      })
    );
    this.group.append(
      // 关于音乐
      this.text[1].attr({
        opacity: 0,
        pos: [750 / 2, 95 + 40 + 20 + 67]
      })
    );
    this.group.append(
      // 我从不是说时所而已
      this.text[2].attr({
        opacity: 0,
        pos: [750 / 2, 95 + 40 + 20 + 67 + 42 + 20]
      })
    );
    this.group.append(
      // 它是我的梦想
      this.text[3].attr({
        opacity: 0,
        pos: [750 / 2, 95 + 40 + 20 + 67 + 42 + 20 + 42 + 20]
      })
    );
    this.group.append(
      // 一步一步
      this.text[4].attr({
        opacity: 0,
        pos: [750 / 2, 95 + 40 + 20 + 67 + 42 + 20 + 42 + 20 + 43 + 20]
      })
    );
    this.group.append(
      // 我离他越来越近
      this.text[5].attr({
        opacity: 0,
        pos: [
          750 / 2,
          95 + 40 + 20 + 67 + 42 + 20 + 42 + 20 + 43 + 20 + 43 + 20
        ]
      })
    );
    this.group.append(
      // 梦想可以很大
      this.text[6].attr({
        opacity: 0,
        //越来越近
        pos: [750 / 2, 536 + 100]
      })
    );
    this.group.append(
      // 但最重要的是
      this.text[7].attr({
        opacity: 0,
        pos: [750 / 2, 636 + 42 + 20]
      })
    );
    this.group.append(
      // 记得迈出第一步
      this.text[8].attr({
        opacity: 0,
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20]
      })
    );
    this.group.append(
      // 留下你的
      this.text[9].attr({
        opacity: 0,
        // 记得迈出第一步
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20 + 43 + 20 + 120]
      })
    );
    this.group.append(
      this.text[10].attr({
        opacity: 0,
        pos: [750 / 2, 636 + 42 + 20 + 43 + 20 + 43 + 20 + 120 + 42 + 20]
      })
    );
    this.group.append(
      this.text[11].attr({
        opacity: 0,
        pos: [
          750 / 2,
          636 + 42 + 20 + 43 + 20 + 43 + 20 + 120 + 42 + 20 + 57 + 20
        ]
      })
    );
    this.group.append(
      this.text[12].attr({
        opacity: 0,
        pos: [750 / 2, 1083 + 44 + 20]
      })
    );
    this.Arrow = new Sprite(
      "https://test-1255639802.cos.ap-beijing.myqcloud.com/page6/%E7%AE%AD%E5%A4%B4-min.png"
    ).attr({
      anchor: 0.5,
      pos: [750 / 2, 1230],
      opacity: 0,
      zIndex: 5
    });
    this.group.append(this.Arrow);
    this.text.map((item, index) => {
      this.text[index].animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 500 * index,
        duration: 500,
        fill: "forwards"
      });
    });
    setTimeout(() => {
      this.Arrow.animate(
        [
          {
            opacity: 0
          },
          {
            opacity: 1
          }
        ],
        {
          duration: 500,
          fill: "forwards"
        }
      );
      this.Arrow.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, 30]
          },
          {
            translate: [0, 0]
          }
        ],
        {
          delay: 500,
          duration: 800,
          fill: "forwards",
          iterations: Infinity
        }
      );
    }, 500 * this.text.length);
  },
  methods: {
    nextPage() {
      this.$router.replace("/comment");
    }
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
