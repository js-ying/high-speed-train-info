<template>
  <div id="query-page">
    <div
      class="text-center mb-4"
      id="web-title"
      @click="reset()"
      v-if="route.name !== 'TraintimeDetail'"
    >
      高鐵時刻查詢
    </div>

    <query-area
      ref="queryArea"
      :notReset="notReset"
      @set-not-reset="setNotReset"
    ></query-area>

    <disclaimer type="text" v-if="route.name === 'QueryPage'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import QueryArea from "@/components/QueryArea.vue";
import Disclaimer from "@/components/Disclaimer.vue";

export default defineComponent({
  name: "QueryPage",
  components: {
    QueryArea,
    Disclaimer
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const queryArea: any = ref(null);

    const notReset = ref(true);

    const reset = () => {
      queryArea.value.formAction.reset();
      notReset.value = false;
      router.push({ path: "/" });
    };

    const setNotReset = () => {
      notReset.value = true;
    };

    return {
      route,
      notReset,
      reset,
      queryArea,
      setNotReset
    };
  }
});
</script>
