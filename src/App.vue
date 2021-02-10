<template>
  <loading v-if="store.state.loading" />
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "App",
  components: {
    Loading
  },
  setup() {
    const store = useStore();

    return {
      store
    };
  }
});
</script>

<style lang="scss"></style>
