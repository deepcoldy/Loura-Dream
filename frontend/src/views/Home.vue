<template>
  <div class="home">
    <div id="loading"></div>
    <div class="layer" @click="nextPage()">
      <div id="canvas"></div>
    </div>
    <!-- <audio src="https://test-1255639802.cos.ap-beijing.myqcloud.com/10%20Naughty%20Ball%20%E5%A8%84%E8%89%BA%E6%BD%87%20DEMO.mp3" autoplay controls="controls"></audio> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { Scene, Sprite, Group, Label } from "spritejs";
import lottie from "lottie-web";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      preload: [
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/%E8%83%8C%E6%99%AF.jpg",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/%E8%81%9A%E4%BC%9A%E8%83%8C%E6%99%AF%202.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/%E6%AD%8C%E7%8E%8B%E8%83%8C%E6%99%AF.jpg",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/%E5%A4%A9%E7%A9%BA%E8%83%8C%E6%99%AF.jpg",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/%E4%B8%AD%E9%97%B4%E8%BF%87%E6%B8%A1.jpg",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/1%E4%BA%91.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/2%E4%BA%91.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/3%E4%BA%91.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/%E7%AD%BE%E7%BA%A6-%E8%83%8C%E6%99%AF.jpg",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/eye/%E9%A2%84%E5%90%88%E6%88%90%203_00007-min.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/%E6%A0%91.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/%E6%8C%89%E9%92%AE-%E8%8A%B1.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash1.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash2.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash3.png",
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash4.png"
      ],
      step: 1,
      ratio: 0,
      scene: null,
      layer: null,
      newlayer: null,
      page1: {
        group: null,
        background: null,
        microphone: null,
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
      page2: {
        group: null,
        background: null,
        Man1: [],
        Man1Index: 1,
        Girl2: [],
        Girl2Index: 1,
        Girl3: [],
        Girl3Index: 1,
        Eye4: [],
        Eye4Index: 1,
        Girl5: [],
        Girl5Index: 1,
        Man6: [],
        Man6Index: 1
      },
      transto3: {
        group: null,
        transBackground: null
      },
      page3: {
        group: null,
        background: null,
        Girl: [],
        GirlIndex: 1
      },
      transto4: {
        group: null,
        Sky: {
          group: null,
          background: null,
          cloud1: null,
          cloud2: null,
          cloud3: null,
          tree: null
        }
      },
      page4: {
        group: null,
        background: null,
        Girl: [],
        GirlIndex: 1,
        Eye: null,
        EyeIndex: 1,
        FlashLight: [],
        FlashLightIndex: 1,
        GirlLoop: [],
        GirlLoopIndex: 1,
        Signature: [],
        SignatureIndex: 1,
        Flower: null,
        Flash1: null,
        Flash2: null,
        Flash3: null,
        Flash4: null
      },
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

  async mounted() {
    this.preloadimg();
    console.log(this.preload);
    let stickMode = "height";
    if (this.ratio > 750 / 1331) stickMode = "width";
    this.scene = new Scene("#canvas", {
      viewport: ["auto", "auto"],
      resolution: [750 / 2, 1331 / 2],
      width: 750 / 2,
      height: 1331 / 2,
      stickMode
    });
    this.layer = this.scene.layer();
    const loading = lottie.loadAnimation({
      container: document.getElementById("canvas"),
      renderer: `canvas`,
      loop: true,
      autoplay: true,
      path: `https://test-1255639802.cos.ap-beijing.myqcloud.com/loading.json`
    });
    loading.setSpeed(0.8);
    const label = new Label(this.loadingText).attr({
      pos: [750 / 2 / 2, 1331 / 2 / 2 + 500],
      font: "bold 34px Arial",
      anchor: 0.5
    });
    this.scene.on("preload", evt => {
      label.text = `${Math.floor(
        (evt.loaded.length / evt.resources.length) * 100
      )}%`;
    });
    this.layer.append(label);

    await this.scene.preload(...this.preload);
    this.Init("#canvas", "layer");
    this.loadAssetsPage1();
    // this.nextPage();
    // setTimeout(() => {
    //   this.nextPage();
    // }, 2500);
    // setTimeout(() => {
    //   this.nextPage();
    // }, 6000);

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
    preloadimg() {
      let IMG = "";
      for (let index = 0; index <= 21; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/girl/%E9%A2%84%E5%90%88%E6%88%90-3_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 21; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/gas/%E6%B0%B4%E6%B1%BD_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 4; index <= 21; index++) {
        IMG = `https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/man/%E5%8F%B3_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png`;
        this.preload.push(IMG);
      }
      for (let index = 4; index <= 21; index++) {
        //没有序号11
        if (index !== 11) {
          IMG = `https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/woman/%E9%A2%84%E5%90%88%E6%88%90-7_000${
            index.toString().length === 1 ? `0${index}` : index
          }.png`;
          this.preload.push(IMG);
        }
      }
      for (let index = 0; index <= 9; index++) {
        IMG = `https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left1/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png`;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 9; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/meijia/%E7%BE%8E%E5%98%89_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 9; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left2/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 9; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/eye/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 15; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left3/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 10; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left4/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 11; index++) {
        IMG = `
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/girl/%E6%AD%8C%E7%8E%8B-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 0; index <= 27; index++) {
        if ([2, 5, 8, 12, 15, 18, 23, 26].indexOf(index) === -1) {
          IMG = `
              https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/girl/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
                index.toString().length === 1 ? `0${index}` : index
              }-min.png
            `;
          this.preload.push(IMG);
        }
      }
      for (let index = 28; index <= 44; index++) {
        IMG = `
          https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/girlloop/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `;
        this.preload.push(IMG);
      }
      for (let index = 10; index <= 24; index++) {
        IMG = `
          https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/signature/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `;
        this.preload.push(IMG);
      }
    },
    Init(canvasid, name) {
      let stickMode = "height";
      if (this.ratio > 750 / 1331) stickMode = "width";
      this.scene = new Scene(canvasid, {
        viewport: ["auto", "auto"],
        resolution: [750, 1331],
        stickMode
      });
      this[name] = this.scene.layer();
    },
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
        this.loadAssetsPage1(false);
        this.loadAssetsPage2();
        const flash = new Sprite({
          size: [750 * 1.5, 1331 * 1.5],
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
        }, 150);
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
      }
      if (this.step === 2) {
        this.Page2TransToPage3();
      }
      if (this.step === 3) {
        this.Page3TransToPage4();
      }
      if (this.step === 4) {
        // this.page4.animate([{ x: 0 - 10 }, { x: 0 - 750 }], {
        //   // iterations: Infinity,
        //   duration: 2000
        // });
        // this.Page3TransToPage4();
      }
      this.step++;
    },
    clearFream({ page, name, indexName, special, begin, length }) {
      if (this[page][indexName] === begin) {
        if (special === "once") return;
        this[page].group.removeChild(this[page][name][length - 1]);
      } else {
        this[page].group.removeChild(
          this[page][name][this[page][indexName] - 1]
        );
      }
    },
    nextFrame(name, indexName, length, begin, page = "page1", special = "") {
      // const name = indexName.replace("Index", "");
      if (Array.isArray(name)) {
        name.map(item =>
          this.clearFream({
            page,
            name: item,
            indexName,
            special,
            begin,
            length
          })
        );
      } else {
        this.clearFream({
          page,
          name,
          indexName,
          special,
          begin,
          length
        });
      }
      if (this[page][indexName] === length - 1) {
        if (special === "once") return;
        this[page][indexName] = begin;
      } else {
        this[page][indexName] = this[page][indexName] + 1;
      }
    },
    loadAssetsPage1(auto = true) {
      this.page1.group = new Group();
      this.page1.background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/%E8%83%8C%E6%99%AF.jpg"
      );
      this.page1.microphone = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page1/%E9%BA%A6%E5%85%8B%E9%A3%8E.png"
      ).attr({
        pos: [122, 400],
        zIndex: 2
      });
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

        this.page1.GasRight.push(
          GasLeft.attr({
            zIndex: 1,
            pos: [470, 1090]
          })
        );
        this.page1.GasLeft.push(
          GasRight.attr({
            zIndex: 1,
            pos: [39, 1080]
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
      this.page1.group.append(this.page1.microphone);
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
      auto ? this.autoAnimatPage1() : "";
    },
    autoAnimatPage1() {
      this.interval = setInterval(() => {
        this.page1.group.append(this.page1.background);
        this.page1.group.append(this.page1.microphone);
        this.page1.group.append(this.page1.Girl[this.page1.GirlIndex]);
        this.page1.group.append(this.page1.GasLeft[this.page1.GasIndex]);
        this.page1.group.append(this.page1.GasRight[this.page1.GasIndex]);
        this.page1.group.append(this.page1.Man[this.page1.ManIndex]);
        this.page1.group.append(this.page1.Woman[this.page1.WomanIndex]);
        this.nextFrame("Girl", "GirlIndex", this.page1.Girl.length, 0);
        this.nextFrame(
          ["GasLeft", "GasRight"],
          "GasIndex",
          this.page1.GasLeft.length,
          0
        );
        this.nextFrame("Man", "ManIndex", this.page1.Man.length, 4);
        this.nextFrame("Woman", "WomanIndex", this.page1.Woman.length, 4);
      }, 100);
    },
    async loadAssetsPage2() {
      const scene = new Scene("#canvas", {
        viewport: ["auto", "auto"],
        resolution: [750 * 1.5, 1331 * 1.5]
      });
      this.layer = scene.layer();
      this.layer.removeChild(this.page1.group);
      this.page2.background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/%E8%81%9A%E4%BC%9A%E8%83%8C%E6%99%AF%202.png"
      );
      this.page2.group = new Group();

      this.page2.group.append(
        this.page2.background.attr({
          zIndex: 4,
          width: 750 * 1.5,
          height: 1331 * 1.5
        })
      );

      this.page2.group.attr({
        x: -600 * 1.5,
        y: 1800 * 1.5,
        anchor: 0.5,
        scale: 5.5 * 1.5,
        width: 750 * 1.5,
        height: 1331 * 1.5
      });
      this.page2.group.append(
        this.page1.group.attr({
          pos: [485 * 1.5, 330 * 1.5],
          scale: 0.18 * 1.5,
          zIndex: 3,
          width: 750 * 1.5,
          height: 1331 * 1.5
        })
      );
      // Page2 Man1
      for (let index = 0; index <= 9; index++) {
        const Man1 = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left1/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `);
        Man1.attr({ zIndex: 5 });
        this.page2.Man1.push(
          Man1.attr({
            width: 140 * 1.5,
            height: 490 * 1.5,
            pos: [51 * 1.5, 654 * 1.5]
          })
        );
      }
      // Page2 Girl2
      for (let index = 0; index <= 9; index++) {
        const Girl2 = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/meijia/%E7%BE%8E%E5%98%89_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `);
        Girl2.attr({ zIndex: 5 });
        this.page2.Girl2.push(
          Girl2.attr({
            width: 150 * 1.5,
            height: 350 * 1.5,
            pos: [148 * 1.5, 777 * 1.5],
            zIndex: 5
          })
        );
      }
      // Page2 Girl3
      for (let index = 0; index <= 9; index++) {
        const Girl3 = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left2/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `);
        Girl3.attr({ zIndex: 5 });
        this.page2.Girl3.push(
          Girl3.attr({
            width: 160 * 1.5,
            height: 380 * 1.5,
            pos: [277 * 1.5, 755 * 1.5],
            zIndex: 5
          })
        );
      }
      // Page2 Eye4
      for (let index = 0; index <= 9; index++) {
        const Eye4 = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/eye/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `);
        Eye4.attr({ zIndex: 5 });
        this.page2.Eye4.push(
          Eye4.attr({
            width: 30 * 1.5,
            height: 10 * 1.5,
            pos: [418 * 1.5, 654 * 1.5],
            zIndex: 5
          })
        );
      }
      // Page2 Girl5
      for (let index = 0; index <= 15; index++) {
        const Girl5 = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left3/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `);
        Girl5.attr({ zIndex: 5 });
        this.page2.Girl5.push(
          Girl5.attr({
            width: 160 * 1.5,
            height: 350 * 1.5,
            pos: [413 * 1.5, 786 * 1.5],
            zIndex: 5
          })
        );
      }
      // Page2 Man6
      for (let index = 0; index <= 10; index++) {
        const Man6 = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page2/left4/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `);
        Man6.attr({ zIndex: 5 });
        this.page2.Man6.push(
          Man6.attr({
            width: 250 * 1.5,
            height: 390 * 1.5,
            pos: [546 * 1.5, 748 * 1.5],
            zIndex: 5
          })
        );
      }
      this.page2.group.append(this.page2.Man1[0]);
      this.page2.group.append(this.page2.Girl2[0]);
      this.page2.group.append(this.page2.Girl3[0]);
      this.page2.group.append(this.page2.Eye4[0]);
      this.page2.group.append(this.page2.Girl5[0]);
      this.page2.group.append(this.page2.Man6[0]);

      this.layer.append(this.page2.group);
      await this.page2.group.animate(
        [
          {
            x: -600 * 1.5,
            y: 1800 * 1.5,
            anchor: 0.5,
            scale: 5.5
          },
          {
            x: 375 * 1.5,
            y: 668 * 1.5,
            anchor: 0.5,
            scale: 1
          }
        ],
        {
          duration: 1000,
          fill: "forwards"
        }
      ).finished;

      this.autoAnimatPage2();
    },
    autoAnimatPage2() {
      this.interval = setInterval(() => {
        this.page2.group.append(this.page2.background);
        this.page2.group.append(this.page1.group);
        this.page2.group.append(this.page2.Man1[this.page2.Man1Index]);
        this.page2.group.append(this.page2.Girl2[this.page2.Girl2Index]);
        this.page2.group.append(this.page2.Girl3[this.page2.Girl3Index]);
        this.page2.group.append(this.page2.Eye4[this.page2.Eye4Index]);
        this.page2.group.append(this.page2.Girl5[this.page2.Girl5Index]);
        this.page2.group.append(this.page2.Man6[this.page2.Man6Index]);
        this.nextFrame("Man1", "Man1Index", this.page2.Man1.length, 0, "page2");
        this.nextFrame(
          "Girl2",
          "Girl2Index",
          this.page2.Girl2.length,
          0,
          "page2"
        );
        this.nextFrame(
          "Girl3",
          "Girl3Index",
          this.page2.Girl3.length,
          0,
          "page2",
          "once"
        );
        this.nextFrame("Eye4", "Eye4Index", this.page2.Eye4.length, 0, "page2");
        this.nextFrame(
          "Girl5",
          "Girl5Index",
          this.page2.Girl5.length,
          0,
          "page2"
        );
        this.nextFrame("Man6", "Man6Index", this.page2.Man6.length, 0, "page2");
      }, 100);
    },
    async Page2TransToPage3() {
      clearInterval(this.interval);
      this.transto3.group = new Group();
      this.layer.append(this.transto3.group);
      this.transto3.group.attr({
        pos: [750 * 1.5, 0],
        zIndex: 5
      });
      this.page3.transBackground = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/%E4%B8%AD%E9%97%B4%E8%BF%87%E6%B8%A1.jpg"
      );
      this.transto3.group.append(
        this.page3.transBackground.attr({
          width: 711 * 1.5,
          height: 1331 * 1.5
        })
      );
      await this.page2.group.animate(
        [
          {
            scale: 1,
            x: 562.5,
            y: 1002
          },
          {
            scale: 1.6,
            x: 224,
            y: 449
          }
        ],
        {
          duration: 1000,
          fill: "forwards"
        }
      ).finished;
      this.transto3.group.attr({
        x: 1975,
        y: 448,
        scale: 1.6,
        anchor: 0.5
      });
      this.page2.group.animate([{ x: 224 }, { x: -960 }], {
        duration: 500,
        fill: "forwards",
        easing: "ease-in"
      });
      await this.transto3.group.animate([{ x: 1975 }, { x: 781 }], {
        duration: 500,
        fill: "forwards",
        easing: "ease-in"
      }).finished;
      await this.transto3.group.animate([{ x: 781 }, { x: 270 }], {
        duration: 100,
        fill: "forwards",
        easing: "linear"
      }).finished;
      this.loadAssetsPage3();
    },
    async loadAssetsPage3() {
      this.page3.background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/%E6%AD%8C%E7%8E%8B%E8%83%8C%E6%99%AF.jpg"
      ).attr({
        width: 750 * 1.5,
        height: 1331 * 1.5
      });
      this.page3.group = new Group();
      this.layer.append(this.page3.group);
      this.page3.group.attr({
        zIndex: 6,
        anchor: 0.5,
        // x: 1950,
        x: 2020,
        y: 450,
        scale: 1.6
      });
      this.page3.group.append(this.page3.background);
      this.transto3.group.animate([{ x: 270 }, { x: -950 }], {
        // this.transto3.group.animate([{ x: 270 }, { x: 200 }], {
        duration: 300,
        easing: "ease-out",
        fill: "forwards"
      });
      await this.page3.group.animate([{ x: 2020 }, { x: 800 }], {
        duration: 300,
        easing: "ease-out",
        fill: "forwards"
      }).finished;
      this.page3.group.animate(
        [
          { scale: 1.6, x: 800, y: 450 },
          { scale: 1, x: 375 * 1.5, y: 668 * 1.5 }
        ],
        {
          duration: 500,
          fill: "forwards"
        }
      );
      for (let index = 0; index <= 11; index++) {
        const Girl = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/girl/%E6%AD%8C%E7%8E%8B-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `);
        Girl.attr({ zIndex: 6 });
        this.page3.Girl.push(
          Girl.attr({
            width: 260 * 1.5,
            height: 600 * 1.5,
            pos: [226 * 1.5, 510 * 1.5]
          })
        );
      }
      this.page3.group.append(this.page3.Girl[0]);
      this.autoAnimatPage3();
    },
    autoAnimatPage3() {
      this.interval = setInterval(() => {
        this.page3.group.append(this.page3.background);
        this.page3.group.append(this.page3.Girl[this.page3.GirlIndex]);

        this.nextFrame("Girl", "GirlIndex", this.page3.Girl.length, 0, "page3");
      }, 100);
    },
    async Page3TransToPage4() {
      clearInterval(this.interval);
      this.Init("#canvas", "layer");
      this.transto4.group = new Group();

      this.transto4.group.append(
        this.page3.background.attr({
          width: 750,
          height: 1331,
          zIndex: 5
        })
      );
      this.transto4.group.append(
        this.page3.Girl[0].attr({
          width: 260,
          height: 600,
          pos: [226, 510]
        })
      );
      this.layer.append(this.transto4.group);
      this.transto4.Sky.group = new Group().attr({
        translate: [0, -1331],
        zIndex: 9
      });
      this.transto4.Sky.background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/%E5%A4%A9%E7%A9%BA%E8%83%8C%E6%99%AF.jpg"
      );
      this.transto4.Sky.cloud1 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/1%E4%BA%91.png"
      );
      this.transto4.Sky.cloud2 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/2%E4%BA%91.png"
      );
      this.transto4.Sky.cloud3 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page3/3%E4%BA%91.png"
      );
      this.transto4.Sky.group.append(this.transto4.Sky.background);

      this.transto4.Sky.group.append(
        this.transto4.Sky.cloud1.attr({
          pos: [310, 276]
        })
      );
      this.transto4.Sky.group.append(
        this.transto4.Sky.cloud2.attr({
          pos: [33, 523]
        })
      );
      this.transto4.Sky.group.append(
        this.transto4.Sky.cloud3.attr({
          pos: [338, 716]
        })
      );
      this.layer.append(this.transto4.Sky.group);
      this.transto4.group.animate(
        [{ translate: [0, 0] }, { translate: [0, 1331] }],
        {
          duration: 1000,
          fill: "forwards"
        }
      );
      await this.transto4.Sky.group.animate(
        [{ translate: [0, -1331] }, { translate: [0, 0] }],
        {
          duration: 1000,
          fill: "forwards"
        }
      ).finished;

      this.loadAssetsPage4();
    },
    async loadAssetsPage4() {
      this.page4.background = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/%E7%AD%BE%E7%BA%A6-%E8%83%8C%E6%99%AF.jpg"
      ).attr({
        height: 1331
      });
      for (let index = 0; index <= 27; index++) {
        if ([2, 5, 8, 12, 15, 18, 23, 26].indexOf(index) === -1) {
          const Girl = new Sprite(`
            https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/girl/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
              index.toString().length === 1 ? `0${index}` : index
            }-min.png
          `);
          Girl.attr({ zIndex: 6, pos: [460, 430] });
          this.page4.Girl.push(Girl);
        }
      }
      for (let index = 28; index <= 44; index++) {
        const GirlLoop = new Sprite(`
          https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/girlloop/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `);
        GirlLoop.attr({ zIndex: 6, pos: [460, 430] });
        this.page4.GirlLoop.push(GirlLoop);
      }
      for (let index = 10; index <= 24; index++) {
        const Signature = new Sprite(`
          https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/signature/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `);
        Signature.attr({ zIndex: 6, pos: [410, 666] });
        this.page4.Signature.push(Signature);
      }
      this.page4.Eye = new Sprite(`
        https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/eye/%E9%A2%84%E5%90%88%E6%88%90%203_00007-min.png
      `);
      this.page4.Eye.attr({ zIndex: 6, pos: [122, 486], opacity: 0 });
      this.page4.group = new Group();
      this.page4.group.attr({
        translate: [0, 1331 + 400]
      });
      this.page4.Flower = new Sprite(
        `https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/%E6%8C%89%E9%92%AE-%E8%8A%B1.png`
      ).attr({
        pos: [315 + 45, 750 + 71 / 2],
        anchor: 0.5
      });
      this.page4.Flash1 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash1.png"
      ).attr({
        pos: [120, 1045],
        opacity: 0
      });
      this.page4.Flash2 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash2.png"
      ).attr({
        pos: [250, 1080],
        opacity: 0
      });
      this.page4.Flash3 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash3.png"
      ).attr({
        pos: [340, 1130],
        opacity: 0
      });
      this.page4.Flash4 = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/flash4.png"
      ).attr({
        pos: [505, 1090],
        opacity: 0
      });
      this.page4.group.append(this.page4.Flower);
      this.page4.group.append(this.page4.background);
      this.page4.group.append(this.page4.Girl[0]);
      this.page4.group.append(this.page4.Signature[0]);
      this.page4.group.append(this.page4.Flash1);
      this.page4.group.append(this.page4.Flash2);
      this.page4.group.append(this.page4.Flash3);
      this.page4.group.append(this.page4.Flash4);
      this.page4.group.append(this.page4.Eye);
      // this.page4.append(girl);
      // this.page4.append(boss);
      // this.page4.append(newsman);
      this.layer.append(this.page4.group);

      this.transto4.Sky.tree = new Sprite(
        "https://test-1255639802.cos.ap-beijing.myqcloud.com/page4/%E6%A0%91.png"
      );
      this.transto4.Sky.group.append(
        this.transto4.Sky.tree.attr({
          pos: [0, 1331]
        })
      );
      this.transto4.Sky.group.animate(
        [{ translate: [0, 0] }, { translate: [0, -1331 - 400] }],
        {
          duration: 1000,
          fill: "forwards"
        }
      );
      await this.page4.group.animate(
        [{ translate: [0, 1331 + 400] }, { translate: [0, 0] }],
        {
          duration: 1000,
          fill: "forwards"
        }
      ).finished;
      this.animatPage4Once();
      this.persistAnimatePage4();
      setTimeout(() => {
        clearInterval(this.interval);
        this.autoAnimatPage4();
      }, this.page4.Girl.length * 100);
    },
    persistAnimatePage4() {
      this.page4.Flash1.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
        {
          duration: 300,
          fill: "forwards",
          iterations: Infinity,
          delay: 250
        }
      );
      this.page4.Flash2.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
        {
          duration: 300,
          fill: "forwards",
          iterations: Infinity,
          delay: 0
        }
      );
      this.page4.Flash3.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
        {
          duration: 300,
          fill: "forwards",
          iterations: Infinity,
          delay: 170
        }
      );
      this.page4.Flash4.animate(
        [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
        {
          duration: 300,
          fill: "forwards",
          iterations: Infinity,
          delay: 30
        }
      );
      setInterval(() => {
        this.page4.Eye.animate(
          [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }],
          {
            duration: 200,
            fill: "forwards",
            delay: 0
          }
        );
      }, 1500);
    },
    animatPage4Once() {
      let flag = 0;
      this.interval = setInterval(() => {
        this.page4.group.append(this.page4.Girl[this.page4.GirlIndex]);
        this.nextFrame(
          "Girl",
          "GirlIndex",
          this.page4.Girl.length,
          0,
          "page4",
          "once"
        );
        if (flag >= 3 && flag <= 16) {
          this.page4.group.append(
            this.page4.Signature[this.page4.SignatureIndex]
          );
          console.log(this.page4.SignatureIndex);
          this.nextFrame(
            "Signature",
            "SignatureIndex",
            this.page4.Signature.length,
            0,
            "page4"
          );
        } else if (flag > 16) {
          this.page4.group.append(
            this.page4.Signature[this.page4.Signature.length - 1]
          );
        }
        flag++;
      }, 100);
    },
    autoAnimatPage4() {
      let flag = 0;
      let plus = false;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.page4.group.append(
          this.page4.Signature[this.page4.Signature.length - 1]
        );

        this.page4.group.append(this.page4.GirlLoop[this.page4.GirlLoopIndex]);
        this.nextFrame(
          "GirlLoop",
          "GirlLoopIndex",
          this.page4.GirlLoop.length,
          0,
          "page4"
        );
        if (flag % 10 === 0) plus = !plus;
        const scale = plus ? 1 + (flag % 10) / 20 : 1.5 - (flag % 10) / 20;
        this.page4.group.append(
          this.page4.Flower.attr({
            scale
          })
        );
        flag++;
      }, 100);
    }
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
