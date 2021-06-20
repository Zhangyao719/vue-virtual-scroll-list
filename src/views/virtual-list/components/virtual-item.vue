<template>
  <ul class="row-imgs">
    <li
      :class="[
        'img-container',
        { 'vertical-li': !capturePositionInfo.isHorizontal },
      ]"
      v-for="item in source.rowLine"
      :key="item.time_index"
      :style="`height: ${
        capturePositionInfo.isHorizontal ? horizontalLiHeight + 'px;' : 'unset;'
      }`"
    >
      <img
        :src="item.image_url"
        alt=""
        :class="[
          'cover',
          { 'vertical-img': !capturePositionInfo.isHorizontal },
          { 'horizontal-img': capturePositionInfo.isHorizontal },
          { 'error-capture': item.error_id },
          {
            'hover-capture':
              captureHover.hover && captureHover.current === item.time_index,
          },
        ]"
        :style="`transform: rotate(${capturePositionInfo.currentAngle}deg);`"
        @mouseover="onMouseMove({ hover: true, current: item.time_index })"
        @mouseleave="onMouseMove({ hover: false, current: item.time_index })"
      />
      <span
        :class="[
          'test-time',
          { 'vertical-time': !capturePositionInfo.isHorizontal },
          { 'horizontal-time': capturePositionInfo.isHorizontal },
        ]"
      >
        {{ format(item.time_index) }}
      </span>
    </li>
  </ul>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { format } from "@/utils";
export default {
  name: "item-component",
  props: {
    source: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      horizontalLiHeight: null,
    };
  },
  computed: {
    ...mapState(["captureHover", "capturePositionInfo"]),
  },
  watch: {
    capturePositionInfo: {
      deep: true,
      handler(val) {
        if (val.isHorizontal) {
          setTimeout(() => {
            this.horizontalLiHeight =
              document.querySelector(".cover").offsetWidth + 17;
          });
        }
      },
    },
  },
  methods: {
    ...mapMutations(["setCaptureHover"]),
    format,
    onMouseMove(e) {
      this.setCaptureHover(e);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  justify-content: flex-start;
  padding-left: unset;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 25%;

  img {
    max-width: 200px;
    transform-origin: center;
    padding: 8px;
    box-sizing: content-box;
    border: 1px solid transparent;
  }

  .test-time {
    text-align: center;
    font-size: 14px;
    color: #333333;
  }
}
.vertical-li {
  height: unset;
}
.vertical-img {
  margin-bottom: 5px;
  width: 50%;
  height: unset;
}
.vertical-time {
  position: unset;
  transform: unset;
}
.horizontal-img {
  width: 40%;
  margin: 0 10px 0 0;
}
.horizontal-time {
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translate(-50%);
}
.hover-capture {
  cursor: pointer;
  border: 1px solid rgba(179, 229, 252, 0.8);
  background-color: rgba(179, 229, 252, 0.3);

  & ~ .test-time {
    color: #757575;
    font-weight: 600;
  }
}
</style>
