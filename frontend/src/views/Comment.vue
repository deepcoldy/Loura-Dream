<template>
  <div class="home">
    <div class="layer" style='-webkit-tap-highlight-color:rgba(255,0,0,0);'>
      <div id="comment"></div>
    </div>
    <input class="dream" maxlength="128" v-model="data.dream" type="text">
    <input class="step" maxlength="128"  v-model="data.step" type="text">
    <input class="name" maxlength="11"  v-model="data.name" type="text">
    <input class="phone" maxlength="11" v-model="data.phone" type="text">
  </div>
</template>

<script>
import { Scene, Sprite, Group } from "spritejs";
import { Toast, MessageBox } from "mint-ui";

export default {
  data() {
    return {
      layer: null,
      background: null,
      group: null,
      comment: null,
      button: null,
      notice: null,
      arrow: null,
      check: null,
      uncheck: null,
      agree: true,
      data: {
        dream: "",
        step: "",
        name: "",
        phone: ""
      }
    };
  },
  mounted() {
    this.ratio =
      document.documentElement.clientWidth /
      document.documentElement.clientHeight;

    let stickMode = "height";
    if (this.ratio > 750 / 1331) stickMode = "width";
    this.scene = new Scene("#comment", {
      viewport: ["auto", "auto"],
      resolution: [750, 1331],
      stickMode
    });
    this.layer = this.scene.layer();
    this.background = new Sprite(
      "https://cdn.zoocer.com/page8%2F8%E7%95%99%E8%A8%80%E6%9D%BF-%E6%9B%B4%E6%94%B9.jpg"
    );
    this.group = new Group();
    this.group.append(this.background);
    this.layer.append(this.group);
    this.CommentMove();
    this.button = new Sprite("https://cdn.zoocer.com/page8%2Fsubmit.png");
    this.button.attr({
      anchor: 0.5,
      pos: [750 / 2, 985]
    });
    this.button.on("click", () => {
      if (!this.agree) {
        MessageBox({
          title: "提示",
          message: "请先了解并同意条款哦",
          showCancelButton: false,
          confirmButtonText: "知道了"
        });
        return;
      }
      if (!this.data.dream) {
        MessageBox({
          title: "提示",
          message: "请填写您的梦想",
          showCancelButton: false,
          confirmButtonText: "去填写"
        });
        return;
      }
      if (!this.data.step) {
        MessageBox({
          title: "提示",
          message: "您迈出的第一步是？",
          showCancelButton: false,
          confirmButtonText: "去填写"
        });
        return;
      }
      if (!this.data.name) {
        MessageBox({
          title: "提示",
          message: "请填写昵称",
          showCancelButton: false,
          confirmButtonText: "去填写"
        });
        return;
      }
      if (this.data.phone.length !== 11) {
        MessageBox({
          title: "提示",
          message: "手机号填写有误",
          showCancelButton: false,
          confirmButtonText: "去填写"
        });
        return;
      }

      Toast({
        iconClass: "mintui mintui-success",
        message: "提交成功",
        duration: 2000
      });
      setTimeout(() => {
        this.nextPage();
      }, 2000);
    });
    this.group.append(this.button);
    this.notice = new Sprite("https://cdn.zoocer.com/page8/notice.png");
    this.notice.attr({
      anchor: 0.5,
      pos: [750 / 2, 1105]
    });
    this.group.append(this.notice);
    this.arrow = new Sprite(
      "https://cdn.zoocer.com/page8%2F%E7%AE%AD%E5%A4%B4.png"
    );
    this.arrow
      .attr({
        anchor: 0.5,
        pos: [750 / 2, 1190],
        opacity: 0
      })
      .on("click", () => {
        this.nextPage();
      });
    this.group.append(this.arrow);
    this.arrow.animate(
      [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ],
      {
        delay: 500,
        duration: 500,
        fill: "forwards"
      }
    );
    this.arrow.animate(
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
  },
  methods: {
    nextPage() {
      this.$router.replace("/mv");
    },
    CommentMove() {
      this.comment = new Sprite(
        "https://cdn.zoocer.com/page8/%E5%BC%B9%E5%B9%952-min.png"
      );
      this.comment2 = new Sprite(
        "https://cdn.zoocer.com/page8/%E5%BC%B9%E5%B9%952-min.png"
      ).attr({
        translate: [750, 0]
      });
      this.comment.on("touchstart", () => {
        move.pause();
        move2.pause();
      });
      this.comment.on("touchend", () => {
        move.play();
        move2.play();
      });
      this.comment2.on("touchstart", () => {
        move.pause();
        move2.pause();
      });
      this.comment2.on("touchend", () => {
        move.play();
        move2.play();
      });
      this.group.append(this.comment);
      this.group.append(this.comment2);
      const move = this.comment.animate(
        [
          { translate: [750, 0] },
          { translate: [-4331 + 750, 0] },
          { translate: [-4331 - 4331 + 750, 0] }
        ],
        {
          iterations: Infinity,
          duration: 80000,
          fill: "forwards"
        }
      );
      const move2 = this.comment2.animate(
        [
          { translate: [4331, 0] },
          { translate: [750, 0] },
          { translate: [-4331, 0] }
        ],
        {
          iterations: Infinity,
          duration: 80000,
          fill: "forwards"
        }
      );
      this.addStar();
      this.addCheckBox();
    },
    addCheckBox() {
      this.uncheck = new Sprite(
        "https://cdn.zoocer.com/page8%2Funcheck.png"
      ).attr({
        pos: [135, 1096],
        scale: 0.4
      });
      this.check = new Sprite("https://cdn.zoocer.com/page8%2Fcheck.png").attr({
        pos: [135, 1096],
        scale: 0.4
      });
      this.group.append(this.check);
      this.check.on("click", () => {
        this.group.removeChild(this.check);
        this.group.append(this.uncheck);
        this.agree = false;
      });
      this.uncheck.on("click", () => {
        this.group.removeChild(this.uncheck);
        this.group.append(this.check);
        this.agree = true;
      });
    },
    addStar() {
      this.Flash1 = new Sprite("https://cdn.zoocer.com/page4/flash1.png").attr({
        pos: [100, 645],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash2 = new Sprite("https://cdn.zoocer.com/page4/flash2.png").attr({
        pos: [80, 830],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash3 = new Sprite("https://cdn.zoocer.com/page4/flash3.png").attr({
        pos: [690, 630],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.Flash4 = new Sprite("https://cdn.zoocer.com/page4/flash4.png").attr({
        pos: [650, 900],
        opacity: 0,
        anchor: 0.5,
        scale: 0.3
      });
      this.group.append(this.Flash1);
      this.group.append(this.Flash2);
      this.group.append(this.Flash3);
      this.group.append(this.Flash4);
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
    }
  }
};
</script>
<style>
.mint-toast {
  z-index: 999;
}
</style>

<style scoped>
#comment {
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
<style lang="scss" scoped>
input {
  background: none;
  outline: none;
  border: 0px;
}
input.dream {
  position: fixed;
  top: 44%;
  left: 230px;
  height: 30px;
  width: 38%;
}
input.step {
  position: fixed;
  top: 51.7%;
  left: 230px;
  height: 30px;
  width: 38%;
}
input.name {
  position: fixed;
  top: 59.5%;
  left: 230px;
  height: 30px;
  width: 38%;
}
input.phone {
  position: fixed;
  top: 67.5%;
  left: 230px;
  height: 30px;
  width: 38%;
}
</style>
