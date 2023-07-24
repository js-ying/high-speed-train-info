<template>
  <div id="about-btn" @click="goToAboutPage">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-info"
      viewBox="0 0 16 16"
    >
      <path
        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
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
  svg {
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
  }
}
</style>
