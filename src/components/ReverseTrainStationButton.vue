<template>
  <div id="reverse-train-station-button" @click="swapSeletedStation()">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      class="bi bi-arrow-left-right"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10.146 7.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 11l-2.647-2.646a.5.5 0 0 1 0-.708z"
      />
      <path
        fill-rule="evenodd"
        d="M2 11a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 11zm3.854-9.354a.5.5 0 0 1 0 .708L3.207 5l2.647 2.646a.5.5 0 1 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
      />
      <path
        fill-rule="evenodd"
        d="M2.5 5a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReverseTrainStationButton",
  components: {},
  emits: ["swapSeletedStation"],
  setup(props, { emit }) {
    const swapSeletedStation = () => {
      emit("swapSeletedStation");
    };

    return { swapSeletedStation };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#reverse-train-station-button {
  position: absolute;
  z-index: 10;
  top: 0.8rem;
  right: -1.25rem;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  cursor: pointer;
  color: $light-gray;
}

#reverse-train-station-button:hover {
  color: white;
}
</style>
