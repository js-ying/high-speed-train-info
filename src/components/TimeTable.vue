<template>
  <div class="row" id="time-table">
    <div class="col-12">
      {{ dataList }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "TimeTable",
  components: {},
  props: ["dataList"],
  setup() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
