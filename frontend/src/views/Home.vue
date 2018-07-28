<template>
  <div class="home">
    <div class="layer" @click="nextPage()">
      <div id="canvas"></div>
    </div>
    <!-- <audio src="https://test-1255639802.cos.ap-beijing.myqcloud.com/10%20Naughty%20Ball%20%E5%A8%84%E8%89%BA%E6%BD%87%20DEMO.mp3" autoplay controls="controls"></audio> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { Scene, Sprite, Group } from "spritejs";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      step: 1,
      ratio: 0,
      layer: null,
      page1: {
        group: null,
        background: null,
        Girl: [],
        GirlIndex: 1,
        Man: [],
        ManIndex: 1,
        Woman: [],
        WomanIndex: 1,
        GasLeft: [],
        GasRight: [],
        GasIndex: 1
      },
      page2: null,
      page4: null,
      page1Animate: null,
      sprite: [],
      interval: null
    };
  },
  created() {
    this.ratio =
      document.documentElement.clientWidth /
      document.documentElement.clientHeight;
    // this.ratio = window.screen.availWidth / window.screen.availHeight;
  },

  mounted() {
    let stickMode = "height";
    if (this.ratio > 750 / 1331) stickMode = "width";
    const scene = new Scene("#canvas", {
      viewport: ["auto", "auto"],
      resolution: [750, 1331],
      stickMode
    });
    this.layer = scene.layer();
    this.loadAssetsPage1();
    // this.loadAssetsPage2();
    // this.layer.append(this.page2);
    // this.loadAssetsPage4();
    // layer.append(this.page4);

    // const gif = new Sprite(
    //   "https://test-1255639802.cos.ap-beijing.myqcloud.com/test.gif"
    // );

    // const robot = new Sprite(
    //   "https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png"
    // );

    // robot.attr({
    //   anchor: [0, 0.5],
    //   pos: [0, 0]
    // });
  },
  methods: {
    nextPage() {
      // this.page1Animate = setInterval(() => {
      //   this.page1.removeChild(this.index);
      //   this.index = this.index - 1;
      //   console.log(this.index);
      //   if (this.index === 0) clearInterval(this.page1Animate);
      // }, 100);
      // setInterval(() => {
      //   console.log(this.index);
      //   // this.page1.removeChild(item);
      // }, 50);
      if (this.step === 1) {
        clearInterval(this.interval);
        this.loadAssetsPage2();
        const flash = new Sprite({
          size: [750, 1331],
          pos: [0, 0],
          bgcolor: "#fff"
        }).attr({
          zIndex: 100
        });
        this.layer.append(flash);
        setTimeout(() => {
          flash.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 500,
            fill: "forwards"
          });
        }, 100);
        // this.page1.group.animate(
        //   [
        //     { size: [750, 1331], pos: [0, 0], borderRadius: 0 },
        //     { size: [126, 85], pos: [43, 442], borderRadius: 4 }
        //   ],
        //   {
        //     // iterations: Infinity,
        //     duration: 2000,
        //     fill: "forwards"
        //   }
        // );
        // this.page1.background[this.index - 1].animate(
        //   [{ scale: 1, pos: [0, 0] }, { scale: 0.2, pos: [-10, -20] }],
        //   {
        //     duration: 2000,
        //     fill: "forwards"
        //   }
        // );
      }
      if (this.step === 4) {
        this.page4.animate([{ x: 0 - 10 }, { x: 0 - 750 }], {
          // iterations: Infinity,
          duration: 2000
        });
      }
      // this.step++;
    },
    loadAssetsPage1() {
      this.page1.group = new Group();
      this.page1.background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/%E8%80%83%E8%AF%95-%E8%83%8C%E6%99%AF.jpg"
      );
      for (let index = 0; index <= 21; index++) {
        const Girl = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/girl/%E9%A2%84%E5%90%88%E6%88%90-3_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `);
        Girl.attr({ zIndex: 1 });
        this.page1.Girl.push(
          Girl.attr({
            pos: [60, 273]
          })
        );
      }
      for (let index = 0; index <= 21; index++) {
        const GasLeft = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/gas/%E6%B0%B4%E6%B1%BD_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `);
        const GasRight = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/gas/%E6%B0%B4%E6%B1%BD_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `);

        this.page1.GasLeft.push(
          GasLeft.attr({
            zIndex: 1,
            pos: [470, 1060]
          })
        );
        this.page1.GasRight.push(
          GasRight.attr({
            zIndex: 1,
            pos: [42, 1060]
          })
        );
      }
      for (let index = 4; index <= 21; index++) {
        const Man = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/man/%E5%8F%B3_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `);
        Man.attr({ zIndex: 1 });
        this.page1.Man.push(
          Man.attr({
            pos: [528, 1019]
          })
        );
      }
      for (let index = 4; index <= 21; index++) {
        //没有序号11
        if (index !== 11) {
          const Woman = new Sprite(`
          https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/woman/%E9%A2%84%E5%90%88%E6%88%90-7_000${
            index.toString().length === 1 ? `0${index}` : index
          }.png
          `);
          Woman.attr({ zIndex: 1 });
          this.page1.Woman.push(
            Woman.attr({
              pos: [62, 1036]
            })
          );
        }
      }

      this.page1.group.append(this.page1.background);
      this.page1.group.append(this.page1.Girl[0]);
      this.page1.group.append(this.page1.Man[0]);
      this.page1.group.append(this.page1.Woman[0]);
      this.page1.group.append(this.page1.GasLeft[0]);
      this.page1.group.append(this.page1.GasRight[0]);
      this.layer.append(this.page1.group);
      // if (index === 0) {
      //   background.attr({
      //     opacity: 1
      //   });
      // }
      // this.page1.background.push(background);
      // for (let index = 0; index <= 101; index++) {
      // const background = new Sprite(
      //   `https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/%E8%80%83%E8%AF%95_00${
      //     index.toString().length === 1
      //       ? `00${index}`
      //       : index.toString().length === 2
      //         ? `0${index}`
      //         : index
      //   }.jpg`
      // );

      // }
      this.autoAnimatPage1();
    },
    nextFrame(indexName, length, begin) {
      // console.log(indexName, length);
      if (this.page1[indexName] === length - 1) {
        this.page1[indexName] = begin;
      } else {
        this.page1[indexName] = this.page1[indexName] + 1;
      }
    },
    autoAnimatPage1() {
      this.interval = setInterval(() => {
        this.page1.group.clear();
        this.page1.group.append(this.page1.background);
        this.page1.group.append(this.page1.Girl[this.page1.GirlIndex]);
        this.page1.group.append(this.page1.GasLeft[this.page1.GasIndex]);
        this.page1.group.append(this.page1.GasRight[this.page1.GasIndex]);
        this.page1.group.append(this.page1.Man[this.page1.ManIndex]);
        this.page1.group.append(this.page1.Woman[this.page1.WomanIndex]);
        // this.nextFrame("GirlIndex", this.page1.Girl.length);
        // this.nextFrame("Man", this.page1.Man.length);
        this.nextFrame("GirlIndex", this.page1.Girl.length, 0);
        this.nextFrame("GasIndex", this.page1.GasLeft.length, 0);
        this.nextFrame("ManIndex", this.page1.Man.length, 4);
        this.nextFrame("WomanIndex", this.page1.Woman.length, 4);
        console.log(this.page1.WomanIndex);
        // console.log(this.index);
      }, 100);
    },
    loadAssetsPage2() {
      const background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87.png"
      );
      this.page2 = new Group();
      background.attr({
        pos: [-220, -2400],
        scale: 5.6
      });
      this.page2.append(background);
      this.layer.append(this.page2);
    },
    loadAssetsPage4() {
      const background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/bg.png"
      );
      const girl = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/lyx.png"
      );

      const boss = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/boss.png"
      );

      girl.animate(
        [
          {
            pos: [750, 764],
            rotate: 0
          },
          {
            pos: [760, 764],
            rotate: 2
          },
          {
            pos: [750, 764],
            rotate: 0
          }
        ],
        {
          duration: 1000,
          iterations: Infinity
        }
      );
      this.page4 = new Group();
      this.page4.attr({
        size: [750, 1331],
        pos: [0, 0],
        anchor: 0
      });

      girl.attr({
        anchor: [1, 0.5],
        pos: [750, 764]
      });

      boss.attr({
        anchor: 0,
        pos: [100, 464]
      });

      const newsman = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/newsman.png"
      );

      newsman.attr({
        anchor: 0,
        pos: [0, 1070]
      });

      this.page4.append(background);
      this.page4.append(girl);
      this.page4.append(boss);
      this.page4.append(newsman);
    },
    autoAnimatPage4() {}
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
