<template>
  <div class="card-container">
    <!-- <button @click="aa">2</button>
    <button @click="bb">10</button>
    <button @click="cc">bottom</button> -->
    <!-- <img src="@/assets/cover.jpg" alt="" /> -->
    <VirtualList
      :style="listStyle"
      data-key="rowIndex"
      :data-sources="captureChunks"
      :data-component="VirtualItem"
      :keeps="10"
      ref="virtual"
      v-viewer="{ movable: false }"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VirtualList from "vue-virtual-scroll-list";
import VirtualItem from "./components/virtual-item.vue";
import { chunk } from "lodash";
import "viewerjs/dist/viewer.css";
import { directive as viewer } from "v-viewer";

export default {
  components: { VirtualList },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  computed: {
    ...mapState(["captures"]),
    ...mapGetters(["images"]),
    captureChunks() {
      return chunk(this.images, 4).map((item, index) => ({
        rowLine: item,
        rowIndex: index,
      }));
    },
  },
  data() {
    return {
      VirtualItem,
      listStyle: `
        width: 1220px;
        height: 700px;
        overflow-y: auto;
        background-color: #f9f9f9;
      `,
    };
  },
  methods: {
    aa() {
      this.$refs.virtual.scrollToIndex(1);
    },
    bb() {
      this.$refs.virtual.scrollToIndex(9);
    },
    cc() {
      this.$refs.virtual.scrollToBottom();
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
}
</style>
