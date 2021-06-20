<template>
  <div class="card-container">
    <VirtualList
      style="height: 700px; overflow-y: auto; background-color: #f9f9f9"
      data-key="rowIndex"
      :data-sources="captureChunks"
      :data-component="VirtualItem"
      :keeps="30"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import VirtualList from "vue-virtual-scroll-list";
import VirtualItem from "./components/virtual-item.vue";
import { chunk } from "lodash";

export default {
  components: { VirtualList },
  computed: {
    ...mapState(["captures"]),
    captureChunks() {
      return chunk(this.captures, 4).map((item, index) => ({
        rowLine: item,
        rowIndex: index,
      }));
    },
  },
  data() {
    return {
      VirtualItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
}
</style>
