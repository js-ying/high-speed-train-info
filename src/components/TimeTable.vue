<template>
  <div id="time-table">
    <div class="col-12 mb-3">
      <div class="row">
        <div
          class="col-12 col-md-10 mb-2 mb-md-0 d-flex align-items-center"
          v-if="fareList && fareList[0]"
        >
          <template v-for="(fare, $index) in fareList[0].Fares" :key="$index">
            <span class="badge rounded-pill bg-gray me-2 fare"
              >{{ fare.TicketType }} {{ fare.Price }} 元</span
            >
          </template>
        </div>
        <div
          class="col-12 col-md-2 d-flex justify-content-end align-items-center"
          id="data-list-length"
        >
          共 {{ dataList.length }} 筆
        </div>
      </div>
    </div>
    <div class="col-12 mb-3" v-for="(data, index) in dataList" :key="index">
      <button
        class="btn btn-outline-light"
        @click="
          openTraintimeDetail(
            service.getGeneralTrainInfo(data.DailyTrainInfo.TrainNo)
          )
        "
      >
        <div class="row py-1">
          <div
            class="col-3 d-flex justify-content-center align-items-center train-table-left-side"
          >
            <div>
              {{ data.DailyTrainInfo.TrainNo }}<br />
              {{ data.DailyTrainInfo.StartingStationName.Zh_tw }} -
              {{ data.DailyTrainInfo.EndingStationName.Zh_tw }}
            </div>
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
import {
  GeneralTimetable,
  RailGeneralTimetable
} from "@/types/rail-general-timetable";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TimeTable",
  components: {},
  props: {
    fareList: {
      type: Array as PropType<OdFare[]>,
      required: true,
      defualt: () => []
    },
    dataList: {
      type: Array as PropType<OdTimeTable[]>,
      required: true,
      defualt: () => []
    },
    queryDate: {
      type: String as PropType<string>,
      required: true,
      defualt: ""
    },
    generalTimetable: {
      type: Array as PropType<RailGeneralTimetable[]>,
      required: true,
      defualt: () => []
    }
  },
  setup(props) {
    const router = useRouter();

    const service = reactive({
      getTimeDiffService: getTimeDiffService,
      getGeneralTrainInfo: (trainNo: string) => {
        if (props.generalTimetable.length > 0) {
          return props.generalTimetable.find((gtt: RailGeneralTimetable) => {
            return gtt.GeneralTimetable.GeneralTrainInfo.TrainNo === trainNo;
          })?.GeneralTimetable;
        }

        return null;
      }
    });

    const openTraintimeDetail = (data: GeneralTimetable) => {
      router.push({
        name: "TraintimeDetail",
        params: {
          clickedTraintimeDetail: JSON.stringify(data)
        }
      });
    };

    return { service, openTraintimeDetail };
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

  #data-list-length {
    color: $taupe-gray;
    font-size: 0.9rem;
  }

  .btn-outline-light {
    &:hover {
      background-color: transparent;
      color: white;
    }
  }

  .time-diff {
    color: $taupe-gray;
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 768px) {
  .train-table-left-side {
    font-size: 0.9rem;
  }
}
</style>
