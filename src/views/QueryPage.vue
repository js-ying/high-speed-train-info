<template>
  <div id="query-page">
    <div class="text-center mb-4" id="web-title" @click="reset()">
      高鐵時刻查詢
    </div>
    <query-area ref="queryArea"></query-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import QueryArea from "@/components/QueryArea.vue";

export default defineComponent({
  name: "QueryPage",
  components: {
    QueryArea
  },
  setup() {
    const router = useRouter();
    const queryArea: any = ref(null);

    const reset = () => {
      queryArea.value.formAction.reset();
      router.push({ path: "/" });
    };

    return {
      reset,
      queryArea
    };
  }
});
</script>
