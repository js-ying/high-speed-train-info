<template>
  <div id="time-table">
    <div class="col-12 pt-3 pb-3 sticky-top">
      <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-between">
          <div v-if="fareList && fareList[0]">
            <!-- 全票票價 -->
            <template v-for="(fare, $index) in adultFares" :key="$index">
              <span class="badge rounded-pill bg-gray me-2 fare">
                {{ fare.TicketType }} {{ fare.Price }} 元
              </span>
            </template>

            <!-- 其他票價 -->
            <template v-if="isShowOtherFareList">
              <template v-for="(fare, $index) in otherFareList" :key="$index">
                <span class="badge rounded-pill bg-gray me-2 fare">
                  {{ fare.TicketType }} {{ fare.Price }} 元
                </span>
              </template>
              <span
                class="badge rounded-pill bg-light-gray me-2 fare"
                @click="isShowOtherFareList = false"
                id="toggle-other-fare-list-btn"
              >
                - 隱藏
              </span>
            </template>
            <template v-else>
              <span
                class="badge rounded-pill bg-light-gray me-2 fare"
                @click="isShowOtherFareList = true"
                id="toggle-other-fare-list-btn"
              >
                + 其他
              </span>
            </template>
          </div>
          <div id="data-list-length">共 {{ dataList.length }} 筆</div>
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
              {{ data.DailyTrainInfo.TrainNo }}
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
          <div
            class="col-3 d-flex justify-content-center align-items-center train-table-right-side"
          >
            {{ data.DailyTrainInfo.StartingStationName.Zh_tw }}
            - {{ data.DailyTrainInfo.EndingStationName.Zh_tw }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { OdTimeTable } from "@/types/od-time-table";
import { Fare, OdFare } from "@/types/od-fare";
import getTimeDiffService from "@/services/get-time-diff-service";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref
} from "vue";
import {
  GeneralTimetable,
  RailGeneralTimetable
} from "@/types/rail-general-timetable";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TimeTable",
  components: {},
  props: {
    selectedInfo: {
      type: String as PropType<string>,
      required: true,
      defualt: ""
    },
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

    const adultFares = computed(() => {
      const fares = props.fareList[0].Fares.filter(
        fare => fare.TicketType.substr(0, 2) === "全票"
      );

      const adjustFares = JSON.parse(JSON.stringify(fares)) as Fare[];

      adjustFares.forEach(
        fare =>
          (fare.TicketType = fare.TicketType.slice(2, fare.TicketType.length))
      );
      return adjustFares;
    });

    const otherFareList = computed(() => {
      const fares = props.fareList[0].Fares.filter(
        fare => fare.TicketType.substr(0, 2) !== "全票"
      );
      return fares;
    });

    const isShowOtherFareList = ref(false);

    const openTraintimeDetail = (data: GeneralTimetable) => {
      router.push({
        name: "TraintimeDetail",
        params: {
          clickedTraintimeDetail: JSON.stringify(data)
        }
      });
    };

    const windowWidth = ref(window.innerWidth);
    const onWidthChange = () => (windowWidth.value = window.innerWidth);
    onMounted(() => window.addEventListener("resize", onWidthChange));
    onUnmounted(() => window.removeEventListener("resize", onWidthChange));

    return {
      service,
      adultFares,
      otherFareList,
      isShowOtherFareList,
      openTraintimeDetail,
      windowWidth
    };
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
      margin-bottom: 0.2rem;
    }
  }

  #toggle-other-fare-list-btn {
    cursor: pointer;
  }

  .sticky-top {
    position: sticky;
    top: 0;
    left: 0;
    background-color: $bg-color;
  }

  #data-list-length {
    color: $taupe-gray;
    font-size: 0.9rem;
    white-space: nowrap;
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

  .train-table-right-side {
    font-size: 0.9rem;
    color: $taupe-gray;
  }
}

@media screen and (max-width: 768px) {
  #time-table {
    .train-table-left-side {
      font-size: 0.9rem;
    }

    .train-table-right-side {
      font-size: 0.7rem;
    }
  }
}
</style>
