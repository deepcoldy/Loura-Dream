<template>
  <div class="home">
    <div class="layer" style='-webkit-tap-highlight-color:rgba(255,0,0,0);'>
        <div id="comment"></div>
      </div>
  </div>
</template>

<script>
import { Scene, Sprite, Group } from "spritejs";

export default {
  data() {
    return {
      layer: null,
      background: null,
      group: null,
      comment: null,
      button: null,
      notice: null
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
      "https://cdn.zoocer.com/page8/%E8%83%8C%E6%99%AF.jpg"
    );
    this.group = new Group();
    this.group.append(this.background);
    this.layer.append(this.group);
    this.comment = new Sprite(
      "https://cdn.zoocer.com/page8/%E5%BC%B9%E5%B9%952-min.png"
    );
    this.group.append(this.comment);
    this.comment.animate([{ translate: [0, 0] }, { translate: [-2764, 0] }], {
      iterations: Infinity,
      duration: 20000,
      fill: "forwards"
    });
    this.button = new Sprite(
      "https://cdn.zoocer.com/page8/%E6%8F%90%E4%BA%A4.png"
    );
    this.button.attr({
      anchor: 0.5,
      pos: [750 / 2, 1220]
    });
    this.button.on("click", () => {
      this.nextPage();
    });
    this.group.append(this.button);
    this.notice = new Sprite("https://cdn.zoocer.com/page8/notice.png");
    this.notice.attr({
      anchor: 0.5,
      pos: [750 / 2, 1280]
    });
    this.group.append(this.notice);
  },
  methods: {
    nextPage() {
      this.$router.replace("/mv");
    }
  }
};
</script>
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
