<template>
  <div id="about-btn" @click="goToAboutPage">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-house-door-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Loading",
  components: {},
  setup() {
    const router = useRouter();

    const goToAboutPage = () => {
      router.push({ name: "About" });
    };

    return { goToAboutPage };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#about-btn {
  position: fixed;
  z-index: 10;
  right: 20px;
  bottom: 20px;
  font-size: 2em;
  cursor: pointer;
  background-color: $davys-grey;
  border-radius: 50%;
  height: 32px;
  width: 32px;

  svg {
    left: 8px;
    position: absolute;
    top: 7px;
  }
}
</style>
