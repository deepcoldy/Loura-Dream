<template>
  <div class="home">
    <div class="layer"  style='-webkit-tap-highlight-color:rgba(255,0,0,0);'>
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
    __mixdataMn__("trans", 7);
    _hmt.push(["_trackEvent", "字幕页面", "浏览"]);
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
      "https://cdn.zoocer.com/page7%2Fa%E8%83%8C%E6%99%AF.jpg"
    );
    this.group = new Group();
    this.group.append(this.background);
    this.layer.append(this.group);

    const array = Array.from({ length: 6 });
    array.map((item, index) => {
      console.log(item);
      this.text.push(
        new Sprite(`https://cdn.zoocer.com/page7/a${index + 1}.png`).attr({
          anchor: 0.5
        })
      );
    });
    this.group.append(
      // 一步一步
      this.text[0].attr({
        opacity: 0,
        pos: [750 / 2, 320]
      })
    );
    this.group.append(
      // 关于音乐
      this.text[1].attr({
        opacity: 0,
        pos: [750 / 2, 320 + 42 + 50]
      })
    );
    this.group.append(
      // 梦想可以很大
      this.text[2].attr({
        opacity: 0,
        pos: [750 / 2, 412 + 40 + 120]
      })
    );
    this.group.append(
      // 你的第一步准备怎么走
      this.text[3].attr({
        opacity: 0,
        pos: [750 / 2, 572 + 41 + 50]
      })
    );
    this.group.append(
      // 告诉我
      this.text[4].attr({
        opacity: 0,
        pos: [750 / 2, 663 + 44 + 160]
      })
    );
    this.group.append(
      // 让我帮你一起实现它
      this.text[5].attr({
        opacity: 0,
        pos: [750 / 2, 867 + 40 + 50]
      })
    );

    this.Arrow = new Sprite(
      "https://cdn.zoocer.com/page7%2Fa%E7%AE%AD%E5%A4%B4.png"
    )
      .attr({
        anchor: 0.5,
        pos: [750 / 2, 1110],
        opacity: 0,
        zIndex: 5
      })
      .on("touchstart", () => {
        this.nextPage();
        _hmt.push(["_trackEvent", "字幕页面", "点击", "箭头"]);
      });
    this.group.append(this.Arrow);
    this.text.map((item, index) => {
      this.text[index].animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 1500 * index,
        duration: 1000,
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
          duration: 1500,
          fill: "forwards",
          iterations: Infinity
        }
      );
    }, 1500 * this.text.length);
    this.addStar();
  },
  methods: {
    nextPage() {
      this.$router.replace("/comment");
    },
    addStar() {
      this.Flash1 = new Sprite("https://cdn.zoocer.com/page4/flash1.png").attr({
        pos: [120, 145],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash2 = new Sprite("https://cdn.zoocer.com/page4/flash2.png").attr({
        pos: [250, 180],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash3 = new Sprite("https://cdn.zoocer.com/page4/flash3.png").attr({
        pos: [340, 230],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash4 = new Sprite("https://cdn.zoocer.com/page4/flash4.png").attr({
        pos: [505, 190],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash5 = new Sprite("https://cdn.zoocer.com/page4/flash1.png").attr({
        pos: [100, 445],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash6 = new Sprite("https://cdn.zoocer.com/page4/flash2.png").attr({
        pos: [230, 480],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash7 = new Sprite("https://cdn.zoocer.com/page4/flash3.png").attr({
        pos: [370, 530],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash8 = new Sprite("https://cdn.zoocer.com/page4/flash4.png").attr({
        pos: [525, 490],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.group.append(this.Flash1);
      this.group.append(this.Flash2);
      this.group.append(this.Flash3);
      this.group.append(this.Flash4);
      this.group.append(this.Flash5);
      this.group.append(this.Flash6);
      this.group.append(this.Flash7);
      this.group.append(this.Flash8);
      this.controlFlash(2000);
    },
    controlFlash(time) {
      this.Flash1.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 250
        }
      );
      this.Flash2.animate(
        [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 0
        }
      );
      this.Flash3.animate(
        [
          { opacity: 1 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 170
        }
      );
      this.Flash4.animate(
        [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 30
        }
      );
      this.Flash5.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 550
        }
      );
      this.Flash6.animate(
        [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 500
        }
      );
      this.Flash7.animate(
        [
          { opacity: 1 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 670
        }
      );
      this.Flash8.animate(
        [
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 0 },
          { opacity: 1 }
        ],
        {
          duration: time,
          fill: "forwards",
          iterations: Infinity,
          delay: 530
        }
      );
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
