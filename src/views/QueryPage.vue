<template>
  <div id="query-page">
    <query-area></query-area>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QueryArea from "@/components/QueryArea.vue";

export default defineComponent({
  name: "QueryPage",
  components: {
    QueryArea
  }
});
</script>
