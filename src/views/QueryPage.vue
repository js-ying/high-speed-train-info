<template>
  <div id="query-page">
    <div class="text-center mb-4" id="web-title" @click="reset()">
      高鐵時刻查詢
    </div>
    <query-area ref="queryArea"></query-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import QueryArea from "@/components/QueryArea.vue";

export default defineComponent({
  name: "QueryPage",
  components: {
    QueryArea
  },
  setup() {
    const queryArea: any = ref(null);

    const reset = () => {
      queryArea.value.formAction.reset();
    };

    return {
      reset,
      queryArea
    };
  }
});
</script>
