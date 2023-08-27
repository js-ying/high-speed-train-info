<template>
  <div id="time-table">
    <div class="col-12 pt-3 pb-3 sticky-top" v-if="fareList && fareList[0]">
      <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-between">
          <div>
            <!-- 全票票價 -->
            <template v-for="(fare, $index) in adultFares" :key="$index">
              <span class="badge rounded-pill bg-gray me-2 fare">
                {{ fareMap.fareClassMap[fare.FareClass] }}
                {{ fareMap.cabinClassMap[fare.CabinClass] }} {{ fare.Price }} 元
              </span>
            </template>

            <!-- 其他票價 -->
            <template v-if="isShowOtherFareList">
              <template v-for="(fare, $index) in otherFareList" :key="$index">
                <span class="badge rounded-pill bg-gray me-2 fare">
                  {{ fareMap.fareClassMap[fare.FareClass] }}
                  {{ fareMap.cabinClassMap[fare.CabinClass] }}
                  {{ fare.Price }} 元
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
        :class="{ 'train-is-pass': isTrainPass(data) }"
        @click="
          openTraintimeDetail(
            service.getGeneralTrainInfo(data.DailyTrainInfo.TrainNo)
          )
        "
      >
        <div class="row py-1">
          <div class="col-3 d-flex justify-content-center align-items-center">
            <div>
              <div class="train-no">
                {{ data.DailyTrainInfo.TrainNo }}
              </div>
              <div class="text-small">
                {{ data.DailyTrainInfo.StartingStationName.Zh_tw }}-{{
                  data.DailyTrainInfo.EndingStationName.Zh_tw
                }}
              </div>
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
          <div class="col-3 d-flex flex-column text-small">
            <free-seating-cars
              :freeSeatingCarList="freeSeatingCarList"
              :trainNo="data.DailyTrainInfo.TrainNo"
            />
          </div>
        </div>
      </button>

      <!-- 服務日 -->
      <div class="row">
        <div class="text-small-gray pt-1 pl-2">
          {{
            getServiceDays(
              service.getGeneralTrainInfo(data.DailyTrainInfo.TrainNo)
                ?.ServiceDay
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref
} from "vue";
import { useRouter } from "vue-router";
import FreeSeatingCars from "@/components/FreeSeatingCars.vue";
import getTimeDiffService from "@/services/get-time-diff-service";
import getNowDate from "@/utils/get-now-date";
import { getServiceDays } from "@/utils/get-service-days";
import { OdTimeTable } from "@/types/od-time-table";
import { Fare, OdFare, fareMap } from "@/types/od-fare";
import { FreeSeatingCar } from "@/types/daily-free-seating-car";
import {
  GeneralTimetable,
  RailGeneralTimetable
} from "@/types/rail-general-timetable";

export default defineComponent({
  name: "TimeTable",
  components: { FreeSeatingCars },
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
    freeSeatingCarList: {
      type: Array as PropType<FreeSeatingCar[]>,
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
      getGeneralTrainInfo: (
        trainNo?: string
      ): GeneralTimetable | null | undefined => {
        if (!trainNo) return null;

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
        fare => fare.FareClass === 1 && fare.TicketType === 1
      );

      const adjustFares = JSON.parse(JSON.stringify(fares)) as Fare[];

      return adjustFares;
    });

    const otherFareList = computed(() => {
      const fares = props.fareList[0].Fares.filter(
        fare => fare.FareClass !== 1 && fare.TicketType === 1
      );
      return fares;
    });

    const isShowOtherFareList = ref(false);

    const isTrainPass = (data: OdTimeTable) => {
      // 若查詢日期與當下日期相同
      if (props.queryDate === getNowDate()) {
        const trainDatetime = new Date(
          `${props.queryDate.replace(/-/g, "/")} ${
            data.OriginStopTime.DepartureTime
          }`
        );
        const nowDatetime = new Date();
        // 若火車時間小於當下時間則代表火車已過時
        if (trainDatetime < nowDatetime) {
          return true;
        }
      }

      return false;
    };

    const openTraintimeDetail = (data?: GeneralTimetable | null) => {
      if (!data) return;

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
      windowWidth,
      service,
      fareMap,
      adultFares,
      otherFareList,
      isShowOtherFareList,
      isTrainPass,
      openTraintimeDetail,
      getServiceDays
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

  .train-is-pass {
    opacity: 0.5;
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
}

@media screen and (max-width: 768px) {
  #time-table {
    .train-no {
      font-size: 0.9rem;
    }
  }
}
</style>
