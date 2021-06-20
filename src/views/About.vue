<template>
  <div class="about common-container">
    <h1>This is an about page</h1>
    <div class="action">
      <icon-counterclockwise @click="rotate(-1)" />
      <icon-clockwise @click="rotate(1)" />
    </div>
    <VirtualList />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VirtualList from "./virtual-list/virtual-list.vue";
import { getAngle } from "@/utils";
import { debounce } from "lodash";
const iconClockwise = require("@/assets/svg/rotate+90.svg");
const iconCounterclockwise = require("@/assets/svg/rotate-90.svg");

export default {
  components: {
    VirtualList,
    iconClockwise,
    iconCounterclockwise,
  },
  computed: {
    ...mapState(["isHorizontal"]),
  },
  methods: {
    ...mapMutations(["setPositionState"]),
    rotate: debounce(function (status) {
      this.setPositionState();
      const images = document.querySelectorAll(".cover");
      const currentAngle = getAngle(images[0]); // 保存当前图片旋转的角度
      switch (status) {
        case 1:
          // 只转90度
          if (currentAngle === 90) {
            this.setPositionState(true);
            break;
          }
          images.forEach((img) => {
            img.style.transform = `rotate(${currentAngle + 90}deg)`;
            this.resetStyle(img);
          });
          break;
        case -1:
          if (currentAngle === -90) {
            this.setPositionState(true);
            break;
          }
          images.forEach((img) => {
            img.style.transform = `rotate(${currentAngle - 90}deg)`;
            this.resetStyle(img);
          });
          break;
      }
    }, 300),
    resetStyle(dom) {
      if (this.isHorizontal) {
        // 调整图片样式
        // dom.style.width = "40%";
        // dom.style.margin = "0 10px 0 0";
        // 父级高度
        dom.parentNode.style.height = dom.offsetWidth + 17 + "px";
        // 字体定位
        // dom.nextElementSibling.style =
        //   "position: absolute; left: 50%; bottom: -10px; transform: translate(-50%)";
      } else {
        // dom.nextElementSibling.style = "position: unset; transform: unset";
        // dom.style.width = "50%";
        // dom.parentNode.style.height = "unset";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
svg {
  width: 30px;
  height: 30px;
  fill: #a0a0a0;
  vertical-align: text-bottom;
  cursor: pointer;

  &:hover {
    fill: #bdc3c7;
  }

  &:first-child {
    margin-right: 10px;
  }
}
</style>
