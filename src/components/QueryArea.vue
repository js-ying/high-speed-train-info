<template>
  <div id="query-area">
    <div class="row">
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>出發車站</div>
          <div>新竹</div>
        </button>
      </div>
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>抵達車站</div>
          <div>台北</div>
        </button>
      </div>
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>出發日期</div>
          <div>2021-01-09 22:03</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QueryArea",
  props: {
    msg: String
  },
  setup() {
    const test = "test";

    return {
      test
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.col {
  // border: 1px solid white;
  // border-radius: 0.5rem;
  // margin: 0 1rem;
}

.btn {
  width: 100%;
}
</style>
