<template>
  <div class="home">
    <div class="layer" style='-webkit-tap-highlight-color:rgba(255,0,0,0);'>
      <div id="video"></div>
    </div>
    <iframe v-if="shadow && mv === 1" class="iframe" frameborder="0" src="https://v.qq.com/iframe/player.html?vid=o00279bx3os&tiny=0" allowfullscreen="auto"></iframe>
    <iframe v-if="shadow && mv === 2" class="iframe" frameborder="0" src="https://v.qq.com/iframe/player.html?vid=y0027v6mg9l&tiny=0" allowfullscreen="auto"></iframe>
    <iframe v-if="shadow && mv === 3" class="iframe" frameborder="0" src="https://v.qq.com/iframe/player.html?vid=d0027090gk5&tiny=0" allowfullscreen="auto"></iframe>
    <img class="back" @click="toMainPage()" src="https://cdn.zoocer.com/prepage/menu.png" alt="">
  </div>
</template>
<script>
import { Scene, Sprite, Group, Path } from "spritejs";
import { MessageBox } from "mint-ui";
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
      button3: null,
      button3Active: null,
      shadow: null,
      mv: 3, // 使用最新的
      qqmusic: null,
      time: 0
    };
  },
  mounted() {
    _hmt.push(["_trackEvent", "mv页面", "浏览"]);
    __mixdataMn__("trans", 9);
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

    this.playButton = new Path().attr({
      path: {
        d:
          "M19.5,2H4.5A4.505,4.505,0,0,0,0,6.5v11A4.505,4.505,0,0,0,4.5,22h15A4.505,4.505,0,0,0,24,17.5V6.5A4.505,4.505,0,0,0,19.5,2ZM15.935,13.342l-5.764,2.882A1.5,1.5,0,0,1,8,14.882V9.118a1.5,1.5,0,0,1,2.171-1.342l5.764,2.882A1.5,1.5,0,0,1,15.935,13.342Z",
        transform: { scale: 4 }
      },
      zIndex: 2,
      fillColor: "#FFFFFF",
      opacity: 0.8,
      pos: [260, 280]
    });
    this.group.append(
      this.playButton.on("click", () => {
        this.toggleShadow();
        console.log(this.shadow);
      })
    );
    this.addMV1();
    this.addMV2();
    this.addMV3();

    this.addQQmusic();
    const unClickButton = new Sprite({
      size: [300, 100],
      pos: [260, 980]
      // border: [2, "#f77"]
    });
    this.layer.append(unClickButton);
    unClickButton.on("click", () => {
      MessageBox({
        title: "开放时间",
        message: "「缱绻」期待上映</br>「Naughty Ball」期待上映",
        showCancelButton: false,
        confirmButtonText: "关闭"
      });
    });
  },
  methods: {
    addMV1() {
      this.cover = new Sprite(
        "https://cdn.zoocer.com/page9/%E9%9D%9E%E7%B1%BB-min.png"
      ).attr({
        pos: [110, 190]
      });
      this.button1Active = new Sprite(
        "https://cdn.zoocer.com/page9/button1-active.png"
      ).attr({
        pos: [240, 650]
      });
      this.button1 = new Sprite(
        "https://cdn.zoocer.com/page9/button1.png"
      ).attr({
        pos: [240, 650]
      });
      this.group.append(this.button1Active);
      this.group.append(this.button1);
      this.group.append(this.cover);
      this.button1.on("click", () => {
        this.group.append(this.button1Active);
        this.group.append(this.button2);
        this.group.append(this.button3);
        this.mv = 1;
        this.group.append(this.cover);
      });
    },
    addMV2() {
      this.cover2 = new Sprite(
        "https://cdn.zoocer.com/page9%2F%E5%A5%BD%E6%83%B3%E4%BB%96.jpg"
      ).attr({
        pos: [110, 190]
      });
      this.group.append(this.cover2);
      this.button2 = new Sprite(
        "https://cdn.zoocer.com/page9/button2.png"
      ).attr({
        pos: [230, 710]
      });
      this.button2Active = new Sprite(
        "https://cdn.zoocer.com/page9/button2-active.png"
      ).attr({
        pos: [230, 710]
      });
      this.group.append(this.button2Active);
      this.group.append(this.button2);

      this.button2.on("click", () => {
        this.group.append(this.button2Active);
        this.group.append(this.button1);
        this.group.append(this.button3);
        this.mv = 2;
        this.group.append(this.cover2);
      });
    },
    addMV3() {
      this.cover3 = new Sprite(
        "https://cdn.zoocer.com/page9%2F%E6%B5%B7%E5%B8%82%E8%9C%83%E6%A5%BC%E5%B0%81%E9%9D%A2.jpg"
      ).attr({
        pos: [110, 190]
      });
      this.button3Active = new Sprite(
        "https://cdn.zoocer.com/page9/button3.jpg"
      ).attr({
        pos: [395, 948],
        anchor: 0.5
      });
      this.button3 = new Sprite(
        "https://cdn.zoocer.com/page9/button3-active.jpg"
      ).attr({
        pos: [395, 948],
        anchor: 0.5
      });
      this.group.append(this.cover3);
      this.group.append(this.button3);
      this.group.append(this.button3Active);
      this.button3.on("click", () => {
        this.group.append(this.button3Active);
        this.group.append(this.button1);
        this.group.append(this.button2);
        this.mv = 3;
        this.group.append(this.cover3);
      });
    },
    addQQmusic() {
      this.qqmusic = new Sprite(
        "https://cdn.zoocer.com/page9%2FQQ%E9%9F%B3%E4%B9%90-min.png"
      )
        .attr({
          anchor: 0.5,
          pos: [750 / 2, 1200]
        })
        .on("click", () => {
          _hmt.push(["_trackEvent", "mv页面", "点击", "跳转QQ音乐"]);
          __mixdataMn__("trans", "qq_music_click");
          setTimeout(() => {
            location.href = "https://y.qq.com/n/yqq/album/001TxHfD0pkRc1.html";
          }, 100);
        });
      this.group.append(this.qqmusic);
    },
    nextPage() {
      this.$router.replace("/comment");
    },
    toggleShadow() {
      if (!this.shadow) {
        this.time = new Date().getTime();
      } else {
        _hmt.push([
          "_trackEvent",
          "mv页面",
          "观看",
          `mv${this.mv}`,
          (new Date().getTime() - this.time) / 1000
        ]);
        __mixdataMn__(
          `video${this.mv}_watch_time`,
          (new Date().getTime() - this.time) / 1000
        );
      }
      if (!this.shadow) {
        this.$parent.musicPlay(false);
        this.shadow = new Sprite({
          bgcolor: "rgba(0, 0, 0, 0.9)",
          size: [750, 1331],
          zIndex: 3
        }).on("click", () => {
          this.toggleShadow();
        });
        this.group.append(this.shadow);
      } else {
        this.$parent.musicPlay(true);
        this.group.removeChild(this.shadow);
        this.shadow = null;
      }
    },
    toMainPage() {
      this.$router.replace("/");
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
