<template>
  <div id="time-table">
    <div class="col-12 d-flex justify-content-between align-items-center mb-3">
      <div v-if="fareList && fareList[0]">
        <template v-for="(fare, $index) in fareList[0].Fares" :key="$index">
          <span class="badge rounded-pill bg-gray me-2 fare"
            >{{ fare.TicketType }} {{ fare.Price }} 元</span
          >
        </template>
      </div>
      <div id="data-list-length">共 {{ dataList.length }} 筆</div>
    </div>
    <div class="col-12 mb-3" v-for="(data, index) in dataList" :key="index">
      <button class="btn btn-outline-light">
        <div class="row py-1">
          <div class="col-3">
            {{ data.DailyTrainInfo.TrainNo }}<br />
            {{ data.DailyTrainInfo.StartingStationName.Zh_tw }} -
            {{ data.DailyTrainInfo.EndingStationName.Zh_tw }}
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center">
            <div>
              <div>
                {{ data.OriginStopTime.DepartureTime }} -
                {{ data.DestinationStopTime.ArrivalTime }}
              </div>
              <div class="time-diff">
                {{
                  service.getTimeDiffService(
                    data.OriginStopTime.DepartureTime,
                    data.DestinationStopTime.ArrivalTime,
                    queryDate
                  )
                }}
              </div>
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
import { OdFare } from "@/types/od-fare";
import getTimeDiffService from "@/services/get-time-diff-service";
import { defineComponent, PropType, reactive } from "vue";

export default defineComponent({
  name: "TimeTable",
  components: {},
  props: {
    fareList: { type: Array as PropType<OdFare[]> },
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

  .badge {
    &.fare {
      font-size: 0.8rem;
    }
  }

  .btn-outline-light {
    &:hover {
      background-color: transparent;
      color: white;
    }
  }

  #data-list-length {
    color: $taupe-gray;
    font-size: 0.9rem;
  }

  .time-diff {
    color: $taupe-gray;
    font-size: 0.9rem;
  }
}
</style>
