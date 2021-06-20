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
import { mapMutations } from "vuex";
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
  methods: {
    ...mapMutations(["setCaptureDirection", "setCapturePositionInfo"]),
    rotate: debounce(function (status) {
      this.setCaptureDirection();
      const images = document.querySelectorAll(".cover");
      const currentAngle = getAngle(images[0]); // 保存当前图片旋转的角度
      switch (status) {
        case 1:
          // 只转90度
          if (currentAngle === 90) {
            this.setCaptureDirection(true);
            break;
          }
          this.setCapturePositionInfo({
            rotateType: 1,
            currentAngle: currentAngle + 90,
          });
          break;
        case -1:
          if (currentAngle === -90) {
            this.setCaptureDirection(true);
            break;
          }
          this.setCapturePositionInfo({
            rotateType: -1,
            currentAngle: currentAngle - 90,
          });
          break;
      }
    }, 300),
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
