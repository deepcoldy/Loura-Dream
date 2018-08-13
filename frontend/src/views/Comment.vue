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
import { Toast, MessageBox, Indicator } from "mint-ui";
import axios from "axios";

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
    _hmt.push(["_trackEvent", "留言页面", "浏览"]);
    __mixdataMn__("trans", 8);
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
      if (this.data.phone.length !== 11 || Number(this.data.phone[0]) !== 1) {
        MessageBox({
          title: "提示",
          message: "手机号填写有误",
          showCancelButton: false,
          confirmButtonText: "去填写"
        });
        return;
      }
      _hmt.push(["_trackEvent", "留言页面", "点击", "提交按钮"]);
      Indicator.open();
      axios.post("/api/", this.data).then(
        () => {
          Indicator.close();
          __mixdataMn__("reg", 1);
          _hmt.push(["_trackEvent", "留言页面", "留言", "提交成功"]);
          Toast({
            iconClass: "mintui mintui-success",
            message: "提交成功",
            duration: 2000
          });
          setTimeout(() => {
            this.nextPage();
          }, 2000);
        },
        () => {
          Indicator.close();
          Toast({
            message: "提交失败，请重试",
            duration: 2000
          });
        }
      );
    });
    this.group.append(this.button);
    this.notice = new Sprite("https://cdn.zoocer.com/page8/notice.png");
    this.notice.attr({
      anchor: 0.5,
      pos: [750 / 2, 1105]
    });
    this.group.append(
      this.notice.on("click", () => {
        MessageBox({
          title: "提示条款",
          message: `
          <div class="left">
您在提交有效个人身份信息前，应当认真阅读本提示条款。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。本提示条款有助于您了解活动的内容及您的权利和义务，请您仔细阅读（特别是以粗体标注的内容）。如果您对本提示条款的条款有疑问，您可给华纳音乐官方微信（warnermusic_china）留言。
<br/>当您按照页面提示填写信息、阅读本提示条款且完成全部程序后，即表示您已充分阅读、理解并接受本提示条款的全部内容。阅读本提示条款的过程中，如果您不同意本提示条款约定，您应立即停止该程序。
如您为无民事行为能力人或为限制民事行为能力人，请告知您的监护人，并在您监护人的指导下阅读本提示条款和运行此程序。若您是中国大陆以外的用户，您还需同时遵守您所属国家或地区的法律，且您确认，订立并履行本提示条款不受您所属、所居住或开展经营活动或其他业务的国家或地区法律法规的限制。
 <br/>
1. 活动内容
<br/>
填写完整“梦想留言板”中信息并留下真实有效的联系方式，分享本H5至朋友圈，我们将随机抽取3位幸运梦想人，帮他们迈出完成梦想的第一步。获奖名单将于2018年9月在@娄艺潇微博公布。
<br/>
2. 活动日期
<br/>
2018年8月15日0点至2018年8月31日24点。
<br/>
3. 活动细则及相关权利与义务
<br/>
每人仅限参加一次。华纳音乐对遗失的、延迟的、不合格的或联系方式错误的参与者不承担任何责任。
<br/>
-   获奖者将通过随机选取的方式从所有合格的参与者中选出。我们将通过短信的方式在2018年9月通知获奖者。若该获奖者无法被联系上或无法被验证，另一位获奖者将被随机选出作为替代。
<br/>
-   获奖者同意在参与本次抽奖过程中或在接受和使用任何奖品时，或是在进行任何与奖品有关的活动时，华纳音乐、艺人方及供应商对任何损失、伤害、损坏、费用或支出不负任何责任，这包括但不仅限于财产损失、人身伤害及/或死亡。
<br/>
-   用户上传内容需符合国家法律法规，不得有违法或违反风序良俗等内容，否则华纳音乐有权删除。
<br/>
-   用户保证向华纳音乐所提供客观真实的个人资料。
<br/>
-   用户保证不侵犯华纳音乐的知识产权。
<br/>
-   用户保证，对于在本活动中所获得的华纳音乐信息，包括但不限于商业秘密及产品信息，不向任何第三方进行披露。
<br/>
-   华纳音乐有权在中国法律法规允许的范围内修改本活动条款及细则，华纳音乐对活动规则的调整和解释不影响本提示条款的效力。如本本活动条款及细则发生变更，华纳音乐将通过官方微信公众号以公告的方式提前予以公布，变更后的本活动条款、细则、提示条款在公告期届满起生效。
<br/>
-   参加本活动的用户即视为了解并同意遵守本活动条款与细则，该抽奖活动与任何奖品方无关，活动最终解释权归华纳音乐所有。
          </div>
`,
          showCancelButton: false,
          confirmButtonText: "关闭"
        });
      })
    );
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
        _hmt.push(["_trackEvent", "留言页面", "点击", "跳过"]);
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
.mint-msgbox-message {
  max-height: 400px;
  overflow: scroll;
}
.mint-msgbox-message .left {
  text-align: left !important;
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
