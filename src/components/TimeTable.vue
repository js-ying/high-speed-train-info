<template>
  <div id="time-table">
    <div class="col-12 mb-4" v-for="(data, index) in dataList" :key="index">
      <button class="btn btn-outline-light">
        {{ data.TrainDate }} {{ data.OriginStopTime.DepartureTime }} -
        {{ data.DestinationStopTime.ArrivalTime }}<br />
        {{ data.DailyTrainInfo.TrainNo }}<br />
        {{ data.DailyTrainInfo.StartingStationName.Zh_tw }} -
        {{ data.DailyTrainInfo.EndingStationName.Zh_tw }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { OdTimeTable } from "@/types/od-time-table";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref
} from "vue";

export default defineComponent({
  name: "TimeTable",
  components: {},
  props: { dataList: { type: Array as PropType<OdTimeTable[]> } },
  setup() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#time-table {
  .btn {
    width: 100%;
  }
}
</style>
