<template>
  <div id="disclaimer">
    <div class="alert alert-orange mt-4" v-if="type === 'alert'">
      本站所提供之資訊僅供參考，請依照現場鐵路狀況或高鐵官方單位所公佈之資訊為準。
    </div>

    <div class="text-center text-small-gray mt-4 mb-4" v-else>
      本站所提供之資訊僅供參考，請依照現場鐵路狀況或高鐵官方單位所公佈之資訊為準。
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

export default defineComponent({
  name: "Disclaimer",
  components: {},
  props: {
    type: {
      type: String as PropType<string>,
      required: false,
      default: "alert"
    }
  },
  setup() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
