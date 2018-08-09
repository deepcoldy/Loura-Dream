<template>
  <div class="home">
    <div id="loading"></div>
    <div class="layer">
      <div id="canvas" style='-webkit-tap-highlight-color:rgba(255,0,0,0);'></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Scene, Sprite, Group, Label } from "spritejs";

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      preload: [],
      step: 0,
      ratio: 0,
      scene: null,
      layer: null,
      newlayer: null,
      prePage: {
        group: null,
        curtainLeft: null,
        curtainRight: null,
        Light: null,
        Text1: null,
        Text2: null,
        Text3: null,
        Slate: null
      },
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
        GasIndex: 1,
        Camera: null
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
        Girl5: null,
        Girl5Hand: null,
        Box: null,
        Microphone: null,
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
      page5: {
        group: null,
        Translation: [],
        TranslationIndex: 1,
        Loop: [],
        LoopIndex: 1,
        ToPage6: [],
        ToPage6Index: 1,
        Moon: null
      },
      page6: {
        group: null,
        CD: null,
        Star: null,
        Arrow: null
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
      resolution: [750, 1331],
      width: 750,
      height: 1331,
      stickMode,
      stickExtend: true
    });
    this.layer = this.scene.layer();

    const label = new Label("加载中...").attr({
      pos: [750 / 2, 1331 / 2 + 500],
      font: "bold 34px Arial",
      anchor: 0.5,
      color: "#FFFFFF"
    });
    this.scene.on("preload", evt => {
      label.text = `${Math.floor(
        (evt.loaded.length / evt.resources.length) * 100
      )}%`;
      console.log(label.text);
    });
    this.layer.append(label);

    await this.scene.preload(...this.preload);
    this.Init("#canvas", "layer");
    this.loadPrePage();
  },
  methods: {
    toNextPage() {
      this.$router.replace("/dream");
    },
    preloadimg() {
      this.preload = [
        "https://cdn.zoocer.com/music-on1.png",
        "https://cdn.zoocer.com/music-off1.png",
        "https://cdn.zoocer.com/prepage/curtainLeft.png",
        "https://cdn.zoocer.com/prepage/curtainRight.png",
        "https://cdn.zoocer.com/prepage/light.png",
        "https://cdn.zoocer.com/prepage/1.png",
        "https://cdn.zoocer.com/prepage/2.png",
        "https://cdn.zoocer.com/prepage/3.png",
        "https://cdn.zoocer.com/prepage/%E5%9C%BA%E8%AE%B0%E6%9D%BF-min.png",
        "https://cdn.zoocer.com/page1/%E8%83%8C%E6%99%AF.jpg",
        "https://cdn.zoocer.com/page1/%E8%83%8C%E6%99%AF.jpg",
        "https://cdn.zoocer.com/page1/%E9%BA%A6%E5%85%8B%E9%A3%8E.png",
        "https://cdn.zoocer.com/page1%2F%E7%85%A7%E7%9B%B8%E6%9C%BA.png", // camera
        "https://cdn.zoocer.com/page2%2F%E8%81%9A%E4%BC%9A%E8%83%8C%E6%99%AF.png",
        "https://cdn.zoocer.com/page2/left3/%E8%BA%AB%E4%BD%93-min.png",
        "https://cdn.zoocer.com/page2/left3/%E6%89%8B-min.png",
        "https://cdn.zoocer.com/page2/left3/%E9%BA%A6%E5%85%8B%E9%A3%8E-min.png",
        "https://cdn.zoocer.com/page2/left3/%E7%A4%BC%E7%9B%92%E7%9B%96%E5%AD%90-min.png",
        "https://cdn.zoocer.com/page3/%E4%B8%AD%E9%97%B4%E8%BF%87%E6%B8%A1.jpg",
        "https://cdn.zoocer.com/page3/3%E6%AD%8C%E7%8E%8B-%E5%8A%A0%E5%AD%97.jpg",
        "https://cdn.zoocer.com/page3/%E5%A4%A9%E7%A9%BA%E8%83%8C%E6%99%AF.jpg",
        "https://cdn.zoocer.com/page3/1%E4%BA%91.png",
        "https://cdn.zoocer.com/page3/2%E4%BA%91.png",
        "https://cdn.zoocer.com/page3/3%E4%BA%91.png",
        "https://cdn.zoocer.com/page4/%E7%AD%BE%E7%BA%A6-%E8%83%8C%E6%99%AF.jpg",
        "https://cdn.zoocer.com/page4/eye/%E9%A2%84%E5%90%88%E6%88%90%203_00007-min.png",
        `https://cdn.zoocer.com/page4/%E6%8C%89%E9%92%AE-%E8%8A%B1.png`,
        "https://cdn.zoocer.com/page4/flash1.png",
        "https://cdn.zoocer.com/page4/flash2.png",
        "https://cdn.zoocer.com/page4/flash3.png",
        "https://cdn.zoocer.com/page4/flash4.png",
        "https://cdn.zoocer.com/page4/%E6%A0%91.png",
        `https://cdn.zoocer.com/page5/%E6%9C%88%E4%BA%AE-min.png`,
        "https://cdn.zoocer.com/page6/%E6%98%9F%E5%BA%A7-min.png",
        "https://cdn.zoocer.com/page6/%E4%B8%93%E8%BE%91%E5%9C%86-min.png",
        "https://cdn.zoocer.com/page6/%E7%AE%AD%E5%A4%B4-min.png",

        "https://cdn.zoocer.com/page7%2Fa%E8%83%8C%E6%99%AF.jpg",
        "https://cdn.zoocer.com/page7%2Fa%E7%AE%AD%E5%A4%B4.png",
        "https://cdn.zoocer.com/page8%2F8%E7%95%99%E8%A8%80%E6%9D%BF-%E6%9B%B4%E6%94%B9.jpg",
        "https://cdn.zoocer.com/page8%2Fsubmit.png",
        "https://cdn.zoocer.com/page8/notice.png",
        "https://cdn.zoocer.com/page8%2F%E7%AE%AD%E5%A4%B4.png",
        "https://cdn.zoocer.com/page8%2Funcheck.png",
        "https://cdn.zoocer.com/page8%2Fcheck.png",
        "https://cdn.zoocer.com/page9/%E8%83%8C%E6%99%AF.jpg",
        "https://cdn.zoocer.com/page9/%E7%94%B5%E8%A7%86-min.png",
        "https://cdn.zoocer.com/page9/%E9%9D%9E%E7%B1%BB-min.png",
        "https://cdn.zoocer.com/page9%2F%E5%A5%BD%E6%83%B3%E4%BB%96.jpg",
        "https://cdn.zoocer.com/page9/button1.png",
        "https://cdn.zoocer.com/page9/button1-active.png",
        "https://cdn.zoocer.com/page9/button2-active.png",
        "https://cdn.zoocer.com/page9/button2.png",
        "https://cdn.zoocer.com/page9%2FQQ%E9%9F%B3%E4%B9%90-min.png"
      ];
      for (let index = 0; index <= 19; index++) {
        const Girl = `
        https://cdn.zoocer.com/page1/girl/%E9%A2%84%E5%90%88%E6%88%90%203_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(Girl);
      }
      for (let index = 0; index <= 21; index++) {
        const GasLeft = `
        https://cdn.zoocer.com/page1/gas/%E6%B0%B4%E6%B1%BD_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `;
        this.preload.push(GasLeft);
      }
      for (let index = 4; index <= 21; index++) {
        const Man = `
        https://cdn.zoocer.com/page1/man/%E5%8F%B3_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `;
        this.preload.push(Man);
      }
      for (let index = 4; index <= 21; index++) {
        //没有序号11
        if (index !== 11) {
          const Woman = `
          https://cdn.zoocer.com/page1/woman/%E9%A2%84%E5%90%88%E6%88%90-7_000${
            index.toString().length === 1 ? `0${index}` : index
          }.png
          `;
          this.preload.push(Woman);
        }
      }
      // Page2 Man1
      for (let index = 0; index <= 9; index++) {
        const Man1 = `
        https://cdn.zoocer.com/page2/left1/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(Man1);
      }
      // Page2 Girl2
      for (let index = 0; index <= 9; index++) {
        const Girl2 = `
        https://cdn.zoocer.com/page2/meijia/%E7%BE%8E%E5%98%89_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(Girl2);
      }
      // Page2 Girl3
      for (let index = 0; index <= 9; index++) {
        const Girl3 = `
        https://cdn.zoocer.com/page2/left2/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(Girl3);
      }
      for (let index = 0; index <= 9; index++) {
        const Eye4 = `
        https://cdn.zoocer.com/page2/eye/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `;
        this.preload.push(Eye4);
      }
      for (let index = 0; index <= 10; index++) {
        const Man6 = `
        https://cdn.zoocer.com/page2/left4/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(Man6);
      }
      for (let index = 0; index <= 11; index++) {
        const Girl = `
        https://cdn.zoocer.com/page3/girl/%E6%AD%8C%E7%8E%8B-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `;
        this.preload.push(Girl);
      }
      for (let index = 0; index <= 27; index++) {
        if ([2, 5, 8, 12, 15, 18, 23, 26].indexOf(index) === -1) {
          const Girl = `
            https://cdn.zoocer.com/page4/girl/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
              index.toString().length === 1 ? `0${index}` : index
            }-min.png
          `;
          this.preload.push(Girl);
        }
      }
      for (let index = 28; index <= 44; index++) {
        const GirlLoop = `
          https://cdn.zoocer.com/page4/girlloop/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `;
        this.preload.push(GirlLoop);
      }
      for (let index = 10; index <= 24; index++) {
        const Signature = `
          https://cdn.zoocer.com/page4/signature/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `;
        this.preload.push(Signature);
      }
      for (let index = 23; index <= 35; index++) {
        const Translation = `
          https://cdn.zoocer.com/page5/translation/%E8%AF%9D%E5%89%A7-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }.jpg
        `;
        this.preload.push(Translation);
      }
      for (let index = 25; index <= 37; index++) {
        const Loop = `
          https://cdn.zoocer.com/page5/loop/%E9%9F%B3%E4%B9%90%E5%89%A7_000${
            index.toString().length === 1 ? `0${index}` : index
          }.jpg
        `;
        this.preload.push(Loop);
      }

      for (let index = 94; index <= 183; index++) {
        const ToPage6 = `https://cdn.zoocer.com/page5%2Ftopage6%2F%E9%9F%B3%E4%B9%90%E5%89%A7_00${
          index.toString().length === 2 ? "0" + index : index
        }.jpg`;
        this.preload.push(ToPage6);
      }

      for (let index = 1; index <= 6; index++) {
        const Text = `https://cdn.zoocer.com/page7/a${index}.png`;
        this.preload.push(Text);
      }
    },
    Init(canvasid, name) {
      let stickMode = "height";
      if (this.ratio > 750 / 1331) stickMode = "width";
      console.log(stickMode);
      this.scene = new Scene(canvasid, {
        viewport: ["auto", "auto"],
        resolution: [750, 1331],
        stickMode,
        stickExtend: true
      });
      this[name] = this.scene.layer();
    },
    async nextPage() {
      if (this.step === 0) {
        this.prePageTransToPage1();
      } else if (this.step === 1) {
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
      } else if (this.step === 2) {
        this.Page2TransToPage3();
      } else if (this.step === 3) {
        this.Page3TransToPage4();
      } else if (this.step === 4) {
        this.Page4TransToPage5();
      } else if (this.step === 5) {
        this.Page5TransToPage6();
      } else {
        this.toNextPage();
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
    loadPrePage() {
      this.prePage.group = new Group();
      this.prePage.curtainLeft = new Sprite(
        "https://cdn.zoocer.com/prepage/curtainLeft.png"
      ).attr({
        translate: [0 + 1, 0]
      });
      this.prePage.curtainRight = new Sprite(
        "https://cdn.zoocer.com/prepage/curtainRight.png"
      ).attr({
        translate: [750 / 2 - 8, 0]
      });
      this.prePage.Light = new Sprite(
        "https://cdn.zoocer.com/prepage/light.png"
      );
      this.prePage.Text1 = new Sprite("https://cdn.zoocer.com/prepage/1.png");
      this.prePage.Text2 = new Sprite("https://cdn.zoocer.com/prepage/2.png");
      this.prePage.Text3 = new Sprite("https://cdn.zoocer.com/prepage/3.png");
      this.prePage.Slate = new Sprite(
        "https://cdn.zoocer.com/prepage/%E5%9C%BA%E8%AE%B0%E6%9D%BF-min.png"
      ).on("touchstart", async () => {
        SlateAnimate.finish();
        this.nextPage();
        this.prePage.Slate.off("touchstart");
      });

      this.prePage.group.append(this.prePage.curtainLeft);
      this.prePage.group.append(this.prePage.curtainRight);
      this.prePage.group.append(this.prePage.Light);
      this.prePage.group.append(
        this.prePage.Slate.attr({
          pos: [750 / 2, 900],
          anchor: 0.5,
          opacity: 0,
          zIndex: 9
        })
      );
      this.prePage.group.append(
        this.prePage.Text1.attr({
          pos: [750 / 2, 500],
          anchor: 0.5,
          opacity: 0,
          zIndex: 9
        })
      );
      this.prePage.group.append(
        this.prePage.Text2.attr({
          pos: [750 / 2, 500 + 67 + 20],
          anchor: 0.5,
          opacity: 0,
          zIndex: 9
        })
      );
      this.prePage.group.append(
        this.prePage.Text3.attr({
          pos: [750 / 2, 500 + 67 + 20 + 68 + 20],
          anchor: 0.5,
          opacity: 0,
          zIndex: 9
        })
      );
      this.layer.append(
        this.prePage.group.attr({
          zIndex: 2
        })
      );
      this.prePage.Text1.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards"
      });
      this.prePage.Text2.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 1500,
        duration: 1000,
        fill: "forwards"
      });
      this.prePage.Text3.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 3000,
        duration: 1000,
        fill: "forwards"
      });
      const SlateAnimate = this.prePage.Slate.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          delay: 4500,
          duration: 1000,
          fill: "forwards"
        }
      );
      this.prePage.Slate.animate(
        [{ scale: 0.9 }, { scale: 1 }, { scale: 0.9 }],
        {
          delay: 4500,
          duration: 2000,
          fill: "forwards",
          iterations: Infinity
        }
      );
    },
    async prePageTransToPage1() {
      this.loadAssetsPage1();
      this.prePage.Text1.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards"
      });
      this.prePage.Text2.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards"
      });
      this.prePage.Text3.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards"
      });
      await this.prePage.Slate.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards"
      }).finished;
      this.prePage.Light.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        fill: "forwards"
      });
      this.prePage.curtainLeft.animate(
        [
          {
            translate: [0 + 1, 0]
          },
          {
            translate: [-375, 0]
          }
        ],
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-in"
        }
      );
      this.prePage.curtainRight.animate(
        [
          {
            translate: [750 / 2 - 8, 0]
          },
          {
            translate: [750, 0]
          }
        ],
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-in"
        }
      );
    },
    loadAssetsPage1(auto = true) {
      this.page1.group = new Group();
      if (auto) {
        // page1
        this.page1.background = new Sprite(
          "https://cdn.zoocer.com/page1/%E8%83%8C%E6%99%AF.jpg"
        );
        this.page1.Camera = new Sprite(
          "https://cdn.zoocer.com/page1%2F%E7%85%A7%E7%9B%B8%E6%9C%BA.png"
        ).attr({
          rotate: -5,
          opacity: 0,
          zIndex: 3,
          anchor: 0.5,
          scale: 0.6,
          pos: [130 + 174 / 2, 815 + 119 / 2]
        });
      } else {
        // page2用到
        this.page1.background = new Sprite(
          "https://cdn.zoocer.com/page1/%E8%83%8C%E6%99%AF.jpg"
        );
      }
      this.page1.microphone = new Sprite(
        "https://cdn.zoocer.com/page1/%E9%BA%A6%E5%85%8B%E9%A3%8E.png"
      ).attr({
        pos: [0, 415],
        zIndex: 2
      });
      for (let index = 0; index <= 19; index++) {
        const Girl = new Sprite(`
        https://cdn.zoocer.com/page1/girl/%E9%A2%84%E5%90%88%E6%88%90%203_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
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
        https://cdn.zoocer.com/page1/gas/%E6%B0%B4%E6%B1%BD_000${
          index.toString().length === 1 ? `0${index}` : index
        }.png
        `);
        const GasRight = new Sprite(`
        https://cdn.zoocer.com/page1/gas/%E6%B0%B4%E6%B1%BD_000${
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
        https://cdn.zoocer.com/page1/man/%E5%8F%B3_000${
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
          https://cdn.zoocer.com/page1/woman/%E9%A2%84%E5%90%88%E6%88%90-7_000${
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
      this.page1.group.append(this.page1.Camera);
      this.page1.group.append(this.page1.Girl[0]);
      this.page1.group.append(this.page1.Man[0]);
      this.page1.group.append(this.page1.Woman[0]);
      this.page1.group.append(this.page1.GasLeft[0]);
      this.page1.group.append(this.page1.GasRight[0]);
      this.page1.Camera.on("touchstart", () => {
        this.page1.Camera.off("touchstart");
        this.nextPage();
        this.page1.group.removeChild(this.page1.Camera);
      });
      this.layer.append(this.page1.group);
      auto ? this.autoAnimatPage1() : "";
    },
    autoAnimatPage1() {
      this.page1.Camera.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: 3000,
        fill: "forwards",
        duration: 1000
      });
      this.page1.Camera.animate(
        [{ scale: 0.6 }, { scale: 0.8 }, { scale: 0.6 }],
        {
          delay: 5000,
          fill: "forwards",
          duration: 2000,
          iterations: Infinity
        }
      );
      this.interval = setInterval(() => {
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
      let stickMode = "height";
      if (this.ratio > 750 / 1331) stickMode = "width";
      console.log(stickMode);
      const scene = new Scene("#canvas", {
        // 为了提高page1所需的分辨率
        viewport: ["auto", "auto"],
        resolution: [750 * 1.5, 1331 * 1.5],
        stickMode,
        stickExtend: true
      });
      this.layer = scene.layer();
      this.page2.background = new Sprite(
        "https://cdn.zoocer.com/page2%2F%E8%81%9A%E4%BC%9A%E8%83%8C%E6%99%AF.png"
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
        https://cdn.zoocer.com/page2/left1/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
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
        https://cdn.zoocer.com/page2/meijia/%E7%BE%8E%E5%98%89_000${
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
        https://cdn.zoocer.com/page2/left2/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
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
        https://cdn.zoocer.com/page2/eye/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
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
      this.page2.Girl5 = new Sprite(
        "https://cdn.zoocer.com/page2/left3/%E8%BA%AB%E4%BD%93-min.png"
      ).attr({
        width: 160 * 1.5,
        height: 350 * 1.5,
        pos: [413 * 1.5, 786 * 1.5],
        zIndex: 5
      });

      this.page2.Girl5Hand = new Sprite(
        "https://cdn.zoocer.com/page2/left3/%E6%89%8B-min.png"
      ).attr({
        width: 35 * 1.5,
        height: 26 * 1.5,
        pos: [480 * 1.5, 928 * 1.5],
        zIndex: 5
      });

      this.page2.Microphone = new Sprite(
        "https://cdn.zoocer.com/page2/left3/%E9%BA%A6%E5%85%8B%E9%A3%8E-min.png"
      ).attr({
        width: 42 * 1.5,
        height: 39 * 1.5,
        pos: [440 * 1.5 + 42 * 0.8, 910 * 1.5 + 39 * 0.8],
        anchor: 0.5,
        zIndex: 5,
        scale: 0.9
      });
      this.page2.Box = new Sprite(
        "https://cdn.zoocer.com/page2/left3/%E7%A4%BC%E7%9B%92%E7%9B%96%E5%AD%90-min.png"
      ).attr({
        width: 72 * 1.5,
        height: 56 * 1.5,
        pos: [430 * 1.5, 890 * 1.5],
        zIndex: 6
      });
      // Page2 Man6
      for (let index = 0; index <= 10; index++) {
        const Man6 = new Sprite(`
        https://cdn.zoocer.com/page2/left4/%E8%81%9A%E4%BC%9A-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
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
      this.page2.group.append(this.page2.Girl5);
      this.page2.group.append(this.page2.Girl5Hand);
      this.page2.group.append(this.page2.Box);
      this.page2.group.append(this.page2.Microphone);
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
            y: 666 * 1.5,
            anchor: 0.5,
            scale: 1
          }
        ],
        {
          duration: 1500,
          fill: "forwards"
        }
      ).finished;

      this.autoAnimatPage2();
    },
    autoAnimatPage2() {
      this.page2.Box.animate(
        [
          {
            pos: [430 * 1.5, 890 * 1.5],
            opacity: 1,
            scale: 1
          },
          {
            pos: [440 * 1.5, 880 * 1.5],
            opacity: 0,
            scale: 1.1
          }
        ],
        {
          duration: 1500,
          fill: "forwards",
          easing: "ease-in"
        }
      );
      this.page2.Microphone.animate(
        [
          {
            scale: 1
          },
          {
            scale: 1.6
          },
          {
            scale: 1
          }
        ],
        {
          duration: 1500,
          fill: "forwards",
          easing: "ease-in",
          iterations: Infinity
        }
      );
      setTimeout(() => {
        this.page2.Girl5.on("touchstart", () => {
          this.page2.Microphone.off("touchstart");
          this.page2.Girl5.off("touchstart");
          this.nextPage();
        });
      }, 1000);
      let flag = 0;
      this.interval = setInterval(() => {
        this.page2.group.append(this.page2.background);
        this.page2.group.append(this.page1.group);
        this.page2.group.append(this.page2.Man1[this.page2.Man1Index]);
        this.page2.group.append(this.page2.Girl2[this.page2.Girl2Index]);
        this.page2.group.append(this.page2.Girl3[this.page2.Girl3Index]);
        this.page2.group.append(this.page2.Eye4[this.page2.Eye4Index]);
        // this.page2.group.append(this.page2.Girl5[this.page2.Girl5Index]);
        this.page2.group.append(this.page2.Man6[this.page2.Man6Index]);
        this.nextFrame("Man1", "Man1Index", this.page2.Man1.length, 0, "page2");
        this.nextFrame(
          "Girl2",
          "Girl2Index",
          this.page2.Girl2.length,
          0,
          "page2"
        );
        if (flag > 15) {
          this.nextFrame(
            "Girl3",
            "Girl3Index",
            this.page2.Girl3.length,
            0,
            "page2",
            "once"
          );
        }
        this.nextFrame("Eye4", "Eye4Index", this.page2.Eye4.length, 0, "page2");
        // this.nextFrame(
        //   "Girl5",
        //   "Girl5Index",
        //   this.page2.Girl5.length,
        //   0,
        //   "page2"
        // );
        flag++;
        this.nextFrame("Man6", "Man6Index", this.page2.Man6.length, 0, "page2");
      }, 100);
    },
    async Page2TransToPage3() {
      clearInterval(this.interval);
      // this.transto3.group = new Group();
      // this.layer.append(this.transto3.group);
      // this.transto3.group.attr({
      //   translate: [750 * 1.5, 0],
      //   zIndex: 5,
      //   anchor: 0
      // });
      this.page3.transBackground = new Sprite(
        "https://cdn.zoocer.com/page3/%E4%B8%AD%E9%97%B4%E8%BF%87%E6%B8%A1.jpg"
      ).attr({
        width: 711 * 1.5,
        height: 1331 * 1.5,
        translate: [750 * 1.5, 0]
      });
      this.page3.background = new Sprite(
        "https://cdn.zoocer.com/page3/3%E6%AD%8C%E7%8E%8B-%E5%8A%A0%E5%AD%97.jpg"
      ).attr({
        width: 750 * 1.5,
        height: 1331 * 1.5,
        translate: [750 * 1.5 + 711 * 1.5, 0]
      });
      this.page2.group.attr({
        width: [750 * 1.5 + 711 * 1.5 + 750 * 1.5],
        anchor: [375 / (750 + 711 + 750), 0.5]
      });
      this.page2.group.append(this.page3.transBackground);
      this.page2.group.append(this.page3.background);
      let count = 0;
      setInterval(() => {
        count++;
      }, 1000);
      for (let index = 0; index <= 11; index++) {
        const Girl = new Sprite(`
        https://cdn.zoocer.com/page3/girl/%E6%AD%8C%E7%8E%8B-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
          index.toString().length === 1 ? `0${index}` : index
        }-min.png
        `).on("touchstart", () => {
          if (count < 3) return;
          this.nextPage();
          this.page3.Girl.map(item => {
            item.off("touchstart");
          });
        });
        Girl.attr({ zIndex: 6 });
        this.page3.Girl.push(
          Girl.attr({
            width: 260,
            height: 600,
            pos: [226, 510]
          })
        );
      }
      this.page2.group.append(
        this.page3.Girl[0].attr({
          width: 260 * 1.5,
          height: 600 * 1.5,
          pos: [226 * 1.5 + 750 * 1.5 + 711 * 1.5, 510 * 1.5]
        })
      );

      await this.page2.group.animate(
        //缩小
        [
          {
            scale: 1
          },
          {
            scale: 1.6,
            translate: [(-750 / 2) * 0.6, (-1331 / 2) * 0.6]
          }
        ],
        {
          duration: 1000,
          fill: "forwards"
        }
      ).finished;

      await this.page2.group.animate(
        // 画面二转三
        [
          { translate: [(-750 / 2) * 0.6, (-1331 / 2) * 0.6] },
          { translate: [(-750 / 2) * 0.6 - 711 - 750 - 375, (-1331 / 2) * 0.6] }
        ],
        {
          duration: 800,
          fill: "forwards",
          easing: "ease-in-out"
        }
      ).finished;

      await this.page2.group.animate(
        //画面三恢复
        [
          {
            scale: 1.6,
            translate: [(-750 / 2) * 0.6 - 711 - 750 - 375, (-1331 / 2) * 0.6]
          },
          {
            scale: 1,
            translate: [-750 - 375 - 132, 0]
          }
        ],
        {
          duration: 800,
          fill: "forwards"
        }
      ).finished;
      this.loadAssetsPage3();
    },
    async loadAssetsPage3() {
      let stickMode = "height";
      if (this.ratio > 750 / 1331) stickMode = "width";
      const scene = new Scene("#canvas", {
        // 还原分辨率
        viewport: ["auto", "auto"],
        resolution: [750, 1331],
        stickMode,
        stickExtend: true
      });
      this.layer = scene.layer();
      this.page3.group = new Group();
      this.layer.append(this.page3.group);
      this.page3.group;

      this.page3.group.append(
        this.page3.background.attr({
          width: 750,
          height: 1331,
          translate: [0, 0]
        })
      );
      this.page3.group.append(
        this.page3.Girl[0].attr({
          width: 260,
          height: 600,
          pos: [226, 510]
        })
      );
      this.autoAnimatPage3();
    },
    autoAnimatPage3() {
      this.interval = setInterval(() => {
        this.page3.group.append(this.page3.Girl[this.page3.GirlIndex]);

        this.nextFrame("Girl", "GirlIndex", this.page3.Girl.length, 0, "page3");
      }, 100);
    },
    async Page3TransToPage4() {
      clearInterval(this.interval);
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
        translate: [0, -1462],
        zIndex: 9
      });
      this.transto4.Sky.background = new Sprite(
        "https://cdn.zoocer.com/page3/%E5%A4%A9%E7%A9%BA%E8%83%8C%E6%99%AF.jpg"
      );
      this.transto4.Sky.cloud1 = new Sprite(
        "https://cdn.zoocer.com/page3/1%E4%BA%91.png"
      );
      this.transto4.Sky.cloud2 = new Sprite(
        "https://cdn.zoocer.com/page3/2%E4%BA%91.png"
      );
      this.transto4.Sky.cloud3 = new Sprite(
        "https://cdn.zoocer.com/page3/3%E4%BA%91.png"
      );
      this.transto4.Sky.group.append(this.transto4.Sky.background);

      this.transto4.Sky.group.append(
        this.transto4.Sky.cloud1.attr({
          pos: [750, 276]
          // pos: [310, 276]
        })
      );
      this.transto4.Sky.group.append(
        this.transto4.Sky.cloud2.attr({
          pos: [-362, 523]
          // pos: [33, 523]
        })
      );
      this.transto4.Sky.group.append(
        this.transto4.Sky.cloud3.attr({
          pos: [750, 716]
          // pos: [338, 716]
        })
      );
      this.layer.append(this.transto4.Sky.group);
      this.transto4.group.animate(
        [{ translate: [0, 0] }, { translate: [0, 1331] }],
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-in"
        }
      );
      this.transto4.Sky.group.animate(
        [{ translate: [0, -1462] }, { translate: [0, 0] }],
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-in"
        }
      ); // 天空进场完毕
      // 云进场
      this.transto4.Sky.cloud1.animate(
        [{ pos: [750, 276] }, { pos: [-318, 276] }],
        {
          duration: 2000,
          delay: 800
        }
      );
      this.transto4.Sky.cloud2.animate(
        [{ pos: [-362, 523] }, { pos: [750, 523] }],
        {
          duration: 2000,
          delay: 800
        }
      );
      this.transto4.Sky.cloud3.animate(
        [{ pos: [750, 716] }, { pos: [-393, 716] }],
        {
          duration: 2000,
          delay: 800
        }
      );
      setTimeout(() => {
        this.loadAssetsPage4();
      }, 1300);
    },
    async loadAssetsPage4() {
      this.page4.background = new Sprite(
        "https://cdn.zoocer.com/page4/%E7%AD%BE%E7%BA%A6-%E8%83%8C%E6%99%AF.jpg"
      ).attr({
        height: 1331
      });
      for (let index = 0; index <= 27; index++) {
        if ([2, 5, 8, 12, 15, 18, 23, 26].indexOf(index) === -1) {
          const Girl = new Sprite(`
            https://cdn.zoocer.com/page4/girl/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
              index.toString().length === 1 ? `0${index}` : index
            }-min.png
          `);
          Girl.attr({ zIndex: 7, pos: [460, 450] });
          this.page4.Girl.push(Girl);
        }
      }
      for (let index = 28; index <= 44; index++) {
        const GirlLoop = new Sprite(`
          https://cdn.zoocer.com/page4/girlloop/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `);
        GirlLoop.attr({ zIndex: 7, pos: [460, 450] });
        this.page4.GirlLoop.push(GirlLoop);
      }
      for (let index = 10; index <= 24; index++) {
        const Signature = new Sprite(`
          https://cdn.zoocer.com/page4/signature/%E7%AD%BE%E7%BA%A6%E4%BB%AA%E5%BC%8F-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }-min.png
        `);
        Signature.attr({ zIndex: 6, pos: [410, 666] });
        this.page4.Signature.push(Signature);
      }
      this.page4.Eye = new Sprite(`
        https://cdn.zoocer.com/page4/eye/%E9%A2%84%E5%90%88%E6%88%90%203_00007-min.png
      `);
      this.page4.Eye.attr({ zIndex: 6, pos: [122, 486], opacity: 0 });
      this.page4.group = new Group();
      this.page4.group.attr({
        translate: [0, 1331 + 400]
      });
      this.page4.Flower = new Sprite(
        `https://cdn.zoocer.com/page4/%E6%8C%89%E9%92%AE-%E8%8A%B1.png`
      ).attr({
        pos: [315 + 45, 750 + 71 / 2],
        anchor: 0.5,
        zIndex: 11,
        opacity: 0
      });
      this.page4.Flash1 = new Sprite(
        "https://cdn.zoocer.com/page4/flash1.png"
      ).attr({
        pos: [120, 1045],
        opacity: 0,
        anchor: 0.5,
        zIndex: 10
      });
      this.page4.Flash2 = new Sprite(
        "https://cdn.zoocer.com/page4/flash2.png"
      ).attr({
        pos: [250, 1080],
        opacity: 0,
        anchor: 0.5,
        zIndex: 10
      });
      this.page4.Flash3 = new Sprite(
        "https://cdn.zoocer.com/page4/flash3.png"
      ).attr({
        pos: [340, 1130],
        opacity: 0,
        anchor: 0.5,
        zIndex: 10
      });
      this.page4.Flash4 = new Sprite(
        "https://cdn.zoocer.com/page4/flash4.png"
      ).attr({
        pos: [505, 1090],
        opacity: 0,
        anchor: 0.5,
        zIndex: 10
      });
      this.page4.group.append(this.page4.Flower);
      this.page4.group.append(this.page4.background);
      this.page4.group.append(this.page4.Girl[0]);
      this.page4.group.append(this.page4.Signature[0]);
      this.layer.append(this.page4.Flash1);
      this.layer.append(this.page4.Flash2);
      this.layer.append(this.page4.Flash3);
      this.layer.append(this.page4.Flash4);
      this.page4.group.append(this.page4.Eye);
      // this.page4.append(girl);
      // this.page4.append(boss);
      // this.page4.append(newsman);
      this.layer.append(
        this.page4.group.attr({
          zIndex: 2
        })
      );

      this.transto4.Sky.tree = new Sprite(
        "https://cdn.zoocer.com/page4/%E6%A0%91.png"
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
          fill: "forwards",
          easing: "ease-in"
        }
      );
      await this.page4.group.animate(
        [{ translate: [0, 1331 + 400] }, { translate: [0, 0] }],
        {
          duration: 1000,
          fill: "forwards",
          easing: "ease-in"
        }
      ).finished;
      this.animatPage4Once();
      this.persistAnimatePage4();
      setTimeout(() => {
        clearInterval(this.interval);
        this.autoAnimatPage4();
      }, this.page4.Girl.length * 100);
      this.page3.group.clear();
    },
    controlFlash(time) {
      this.page4.Flash1.animate(
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
      this.page4.Flash2.animate(
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
      this.page4.Flash3.animate(
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
      this.page4.Flash4.animate(
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
    },
    persistAnimatePage4() {
      this.controlFlash(1500);
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
      this.page4.Flower.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        fill: "forwards"
      });
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
      this.page4.Flower.animate([{ scale: 1 }, { scale: 1.3 }, { scale: 1 }], {
        duration: 1500,
        iterations: Infinity,
        fill: "forwards"
      });
      this.page4.Flower.on("touchstart", () => {
        this.nextPage();
        this.page4.Flower.off("touchstart");
      });
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
      }, 100);
    },
    Page4TransToPage5() {
      this.controlFlash(200);
      this.page5.group = new Group();
      for (let index = 23; index <= 35; index++) {
        const Translation = new Sprite(`
          https://cdn.zoocer.com/page5/translation/%E8%AF%9D%E5%89%A7-%E5%8A%A8%E7%94%BB%E5%87%86%E5%A4%87_000${
            index.toString().length === 1 ? `0${index}` : index
          }.jpg
        `);
        this.page5.Translation.push(
          Translation.attr({
            zIndex: 1
          })
        );
      }
      this.page5.group.append(this.page5.Translation[0]);
      this.layer.append(
        this.page5.group.attr({
          zIndex: 1
        })
      );

      this.page4.group.animate(
        [
          {
            opacity: 1
          },
          {
            opacity: 0
          }
        ],
        {
          easing: "ease-in",
          duration: 1000,
          fill: "forwards"
        }
      );
      const upDelay = 300;
      this.page4.group.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, -1000]
          }
        ],
        {
          delay: upDelay,
          duration: 1000,
          fill: "forwards"
        }
      );
      this.page4.Flash1.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, -1000]
          }
        ],
        {
          delay: upDelay,
          duration: 1000,
          fill: "forwards"
        }
      );
      this.page4.Flash2.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, -1000]
          }
        ],
        {
          delay: upDelay,
          duration: 1000,
          fill: "forwards"
        }
      );
      this.page4.Flash3.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, -1000]
          }
        ],
        {
          delay: upDelay,
          duration: 1000,
          fill: "forwards"
        }
      );
      this.page4.Flash4.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, -1000]
          }
        ],
        {
          delay: upDelay,
          duration: 1000,
          fill: "forwards"
        }
      );
      this.page4.Flash1.animate([{ scale: 1 }, { scale: 0.2 }], {
        delay: 950 + upDelay,
        duration: 1000,
        fill: "forwards"
      });
      this.page4.Flash2.animate([{ scale: 1 }, { scale: 0.2 }], {
        delay: 950 + upDelay,
        duration: 1000,
        fill: "forwards"
      });
      this.page4.Flash3.animate([{ scale: 1 }, { scale: 0.2 }], {
        delay: 950 + upDelay,
        duration: 1000,
        fill: "forwards"
      });
      this.page4.Flash4.animate([{ scale: 1 }, { scale: 0.2 }], {
        delay: 950 + upDelay,
        duration: 1000,
        fill: "forwards"
      });
      clearInterval(this.interval);
      setTimeout(() => {
        this.interval = setInterval(() => {
          this.page5.group.append(
            this.page5.Translation[this.page5.TranslationIndex]
          );
          console.log(this.page5.TranslationIndex);
          this.nextFrame(
            "Translation",
            "TranslationIndex",
            this.page5.Translation.length,
            0,
            "page5",
            "once"
          );
          this.controlFlash(2000);
        }, 150);
        setTimeout(() => {
          clearInterval(this.interval);
          this.loadAssetsPage5();
        }, this.page5.Translation.length * 150);
      }, 1200);
    },
    loadAssetsPage5() {
      for (let index = 25; index <= 37; index++) {
        const Loop = new Sprite(`
          https://cdn.zoocer.com/page5/loop/%E9%9F%B3%E4%B9%90%E5%89%A7_000${
            index.toString().length === 1 ? `0${index}` : index
          }.jpg
        `);
        this.page5.Loop.push(
          Loop.attr({
            zIndex: 2
          })
        );
      }
      this.page5.Moon = new Sprite(
        `https://cdn.zoocer.com/page5/%E6%9C%88%E4%BA%AE-min.png`
      ).attr({
        zIndex: 4,
        pos: [500 + 209 / 2, 100 + 225 / 2],
        opacity: 0,
        anchor: 0.5
      });
      this.page5.group.append(this.page5.Moon);
      this.page5.group.append(this.page5.Loop[0]);
      this.page5.group.append(this.page5.Loop[0]);
      this.autoAnimatPage5();
    },
    autoAnimatPage5() {
      this.page5.Moon.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        fill: "forwards"
      });
      this.page5.Moon.animate([{ scale: 1 }, { scale: 0.9 }, { scale: 1 }], {
        delay: 500,
        duration: 2000,
        fill: "forwards",
        iterations: Infinity
      });
      this.page5.Moon.on("touchstart", () => {
        this.page5.Moon.off("touchstart");
        this.nextPage();
      });
      this.interval = setInterval(() => {
        this.page5.group.append(this.page5.Loop[this.page5.LoopIndex]);
        this.nextFrame("Loop", "LoopIndex", this.page5.Loop.length, 0, "page5");
      }, 125);
    },
    Page5TransToPage6() {
      for (let index = 94; index <= 183; index++) {
        const ToPage6 = new Sprite(
          `https://cdn.zoocer.com/page5%2Ftopage6%2F%E9%9F%B3%E4%B9%90%E5%89%A7_00${
            index.toString().length === 2 ? "0" + index : index
          }.jpg`
        );
        this.page5.ToPage6.push(
          ToPage6.attr({
            zIndex: 3
          })
        );
      }
      this.page5.group.append(this.page5.ToPage6[0]);
      this.page5.Moon.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        fill: "forwards"
      });
      this.page6.Star = new Sprite(
        "https://cdn.zoocer.com/page6/%E6%98%9F%E5%BA%A7-min.png"
      ).attr({
        zIndex: 5,
        pos: [280, 20],
        opacity: 0,
        rotate: -10
      });

      this.page5.group.append(this.page6.Star);
      this.page6.Star.animate([{ opacity: 0 }, { opacity: 1 }], {
        delay: this.page5.ToPage6.length * 50,
        duration: 500,
        fill: "forwards"
      });
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.page5.group.append(this.page5.ToPage6[this.page5.ToPage6Index]);
        this.nextFrame(
          "ToPage6",
          "ToPage6Index",
          this.page5.ToPage6.length,
          0,
          "page5",
          "once"
        );
      }, 50);
      setTimeout(() => {
        this.autoAnimatPage6();
      }, this.page5.ToPage6.length * 50);
    },
    autoAnimatPage6() {
      this.page6.CD = new Sprite(
        "https://cdn.zoocer.com/page6/%E4%B8%93%E8%BE%91%E5%9C%86-min.png"
      ).attr({
        zIndex: 4,
        anchor: 0.5,
        pos: [388, 708]
      });

      this.page5.group.append(this.page6.CD);
      this.page6.CD.animate([{ rotate: 0 }, { rotate: 360 }], {
        delay: 500,
        duration: 5000,
        iterations: Infinity
      });
      this.page6.Star.animate([{ rotate: -10 }, { rotate: 5 }], {
        duration: 500,
        fill: "forwards"
      });
      this.page6.Arrow = new Sprite(
        "https://cdn.zoocer.com/page6/%E7%AE%AD%E5%A4%B4-min.png"
      ).attr({
        anchor: 0.5,
        pos: [750 / 2, 1200],
        opacity: 0,
        zIndex: 5
      });
      this.page5.group.append(this.page6.Arrow);
      this.page6.Arrow.animate(
        [
          {
            opacity: 0
          },
          {
            opacity: 1
          }
        ],
        {
          delay: 1000,
          duration: 500,
          fill: "forwards"
        }
      );
      this.page6.Arrow.animate(
        [
          {
            translate: [0, 0]
          },
          {
            translate: [0, 50]
          },
          {
            translate: [0, 0]
          }
        ],
        {
          delay: 1500,
          duration: 800,
          iterations: Infinity,
          fill: "forwards"
        }
      );
      this.page6.Arrow.on("touchstart", () => {
        this.nextPage();
        this.page6.Arrow.off("touchstart");
      });
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
