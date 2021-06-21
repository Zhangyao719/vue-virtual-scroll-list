<template>
  <div>
    <div>123</div>
    <Viewer :images="captures">
      <img v-for="src in captures" :key="src.time_index" :src="src.image_url" />
    </Viewer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "viewerjs/dist/viewer.css";
import { component as Viewer } from "v-viewer";

export default {
  components: {
    Viewer,
  },
  computed: {
    ...mapState(["captures"]),
  },
};
</script>

<style></style>
