<template>
  <div id="time-table">
    <div class="col-12 d-flex justify-content-end mb-3">
      <div id="data-list-length">{{ dataList.length }} 筆</div>
    </div>
    <div class="col-12 mb-3" v-for="(data, index) in dataList" :key="index">
      <button class="btn btn-outline-light">
        <div class="row">
          <div class="col-3">
            {{ data.DailyTrainInfo.TrainNo }}<br />
            {{ data.DailyTrainInfo.StartingStationName.Zh_tw }} -
            {{ data.DailyTrainInfo.EndingStationName.Zh_tw }}
          </div>
          <div class="col-6">
            <div>
              {{ data.OriginStopTime.DepartureTime }} -
              {{ data.DestinationStopTime.ArrivalTime }}
            </div>
            <div>
              {{
                service.getTimeDiffService(
                  data.OriginStopTime.DepartureTime,
                  data.DestinationStopTime.ArrivalTime,
                  queryDate
                )
              }}
            </div>
          </div>
          <div class="col-3"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { OdTimeTable } from "@/types/od-time-table";
import getTimeDiffService from "@/services/get-time-diff-service";
import { defineComponent, PropType, reactive } from "vue";

export default defineComponent({
  name: "TimeTable",
  components: {},
  props: {
    dataList: { type: Array as PropType<OdTimeTable[]> },
    queryDate: { type: String as PropType<string> }
  },
  setup() {
    const service = reactive({
      getTimeDiffService: getTimeDiffService
    });

    return { service };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#time-table {
  .btn {
    width: 100%;
  }

  .btn-outline-light {
    &:hover {
      background-color: transparent;
      color: white;
    }
  }

  #data-list-length {
    color: $light-gray;
    font-size: 0.9rem;
  }
}
</style>
