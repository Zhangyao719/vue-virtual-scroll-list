import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    capturePositionInfo: {
      isHorizontal: false, // 图片是否水平
      rotateType: 0, // 顺逆时针 1顺指针 -1逆时针
      rowHeight: 0, // 行高
      currentAngle: 0, // 当前角度
    },
    captureHover: {
      // 判断截图是否被hover
      hover: false,
      current: null,
    },
  },
  getters: {
    images() {
      let list = [];
      for (let i = 0; i < 1000; i++) {
        list.push({
          error_id: i % 2,
          image_index: i,
          image_url: require("@/assets/cover.jpg"),
          time_index: i + 1,
        });
      }
      return list;
    },
  },
  mutations: {
    setCaptureDirection(state, boolean) {
      state.capturePositionInfo.isHorizontal =
        typeof boolean !== "undefined"
          ? boolean
          : !state.capturePositionInfo.isHorizontal;
    },
    setCaptureHover(state, payload) {
      Object.assign(state.captureHover, payload);
    },
    setCapturePositionInfo(state, payload) {
      Object.assign(state.capturePositionInfo, payload);
    },
  },
  actions: {},
  modules: {},
});
