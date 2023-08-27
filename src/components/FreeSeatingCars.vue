<template>
  <div>
    自由座
  </div>
  <template
    v-if="getFreeSeatGroupListByTrainNo(freeSeatingCarList, trainNo).length > 0"
  >
    <div
      class="d-flex justify-content-center mt-1"
      :style="{ gap: '5px' }"
      v-for="(group, index) in getFreeSeatGroupListByTrainNo(
        freeSeatingCarList,
        trainNo
      )"
      :key="index"
    >
      <span class="free-seat-no"> {{ group.startCar }}</span
      >-<span class="free-seat-no">
        {{ group.endCar }}
      </span>
    </div>
  </template>
  <div class="text-small-gray" v-else>
    請於現場確認
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { getFreeSeatGroupListByTrainNo } from "@/utils/get-free-seat-group-list-by-train-no";
import { FreeSeatingCar } from "@/types/daily-free-seating-car";

export default defineComponent({
  name: "FreeseatingCars",
  components: {},
  props: {
    freeSeatingCarList: {
      type: Array as PropType<Array<FreeSeatingCar>>,
      required: true,
      default: () => []
    },
    trainNo: {
      type: String as PropType<string>,
      required: true,
      default: ""
    }
  },
  setup() {
    return {
      getFreeSeatGroupListByTrainNo
    };
  }
});
</script>

<style scoped lang="scss">
.free-seat-no {
  color: $erie-black;
  font-size: 0.8rem;
  background-color: $orange;
  height: 20px;
  line-height: 20px;
  width: 25px;
  border-radius: 5px;
}
</style>
