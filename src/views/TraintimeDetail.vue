<template>
  <div id="train-time-detail">
    <div class="col-12 mb-3">
      <!-- 返回按鈕 -->
      <div class="row">
        <div class="text-left mb-3">
          <button
            type="button"
            class="btn btn-light-blue btn-sm"
            @click="goBack()"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-return-left"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.854 5.646a.5.5 0 0 1 0 .708L3.207 9l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M13.5 2.5a.5.5 0 0 1 .5.5v4a2.5 2.5 0 0 1-2.5 2.5H3a.5.5 0 0 1 0-1h8.5A1.5 1.5 0 0 0 13 7V3a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            返回結果列表
          </button>
        </div>
      </div>
      <!-- 詳細資訊 -->
      <div v-if="clickedTraintimeDetail">
        <div class="row mb-4 d-flex justify-content-center">
          <div class="col-12 text-center" id="train-name">
            {{ clickedTraintimeDetail.GeneralTrainInfo.TrainNo }}
          </div>
          <div class="col-12 text-center" id="train-note">
            {{ getServiceDays(clickedTraintimeDetail.ServiceDay) }}
          </div>
        </div>

        <div class="row text-center mb-3">
          <div class="col-4">
            <div class="badge rounded-pill bg-gray">站名</div>
          </div>
          <div class="col-4">
            <div class="badge rounded-pill bg-gray">
              到站時間
            </div>
          </div>
          <div class="col-4">
            <div class="badge rounded-pill bg-gray">
              離站時間
            </div>
          </div>
        </div>
        <template
          v-if="clickedTraintimeDetail && clickedTraintimeDetail.StopTimes"
        >
          <div
            class="row text-center mb-2"
            v-for="(stopTime, $index) in clickedTraintimeDetail.StopTimes"
            :key="$index"
          >
            <div
              class="col-4"
              :class="{
                'selected-station-text':
                  selectedStation.start.name === stopTime.StationName.Zh_tw ||
                  selectedStation.end.name === stopTime.StationName.Zh_tw
              }"
            >
              <span
                class="dot-text"
                v-if="
                  selectedStation.start.name === stopTime.StationName.Zh_tw ||
                    selectedStation.end.name === stopTime.StationName.Zh_tw
                "
                >{{ stopTime.StationName.Zh_tw }}</span
              >
              <span v-else>
                {{ stopTime.StationName.Zh_tw }}
              </span>
            </div>
            <div
              class="col-4"
              :class="{
                'selected-station-text':
                  selectedStation.start.name === stopTime.StationName.Zh_tw ||
                  selectedStation.end.name === stopTime.StationName.Zh_tw
              }"
            >
              {{ stopTime.ArrivalTime }}
            </div>
            <div
              class="col-4"
              :class="{
                'selected-station-text':
                  selectedStation.start.name === stopTime.StationName.Zh_tw ||
                  selectedStation.end.name === stopTime.StationName.Zh_tw
              }"
            >
              {{ stopTime.DepartureTime }}
            </div>
          </div>
        </template>
      </div>
      <!-- 資訊遺失（refresh） -->
      <div v-if="dataLose || noData">
        <div class="row">
          <div class="col-12 mb-3">
            <div class="alert alert-gray text-center">
              <span v-if="dataLose">請重新查詢。</span>
              <span v-if="noData">沒有找到此列車資訊，請聯絡網站管理員。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { GeneralTimetable } from "@/types/rail-general-timetable";

export default defineComponent({
  name: "TraintimeDetail",
  components: {},
  setup() {
    const route = useRoute();

    const clickedTraintimeDetail: Ref<GeneralTimetable | null> = ref(null);
    const selectedStation = ref("");

    const noData: Ref<boolean> = ref(false);
    const dataLose: Ref<boolean> = ref(false);

    const goBack = () => {
      window.history.back();
    };

    const getServiceDays = (data: Record<string, number>) => {
      // { "Monday": 1, "Tuesday": 1, "Wednesday": 1, "Thursday": 1, "Friday": 1, "Saturday": 1, "Sunday": 1 }
      const serviceDaysArray: string[] = [];

      const dayMap: Record<string, string> = {
        Monday: "一",
        Tuesday: "二",
        Wednesday: "三",
        Thursday: "四",
        Friday: "五",
        Saturday: "六",
        Sunday: "日"
      };

      Object.entries(data).forEach((day: [string, number]) => {
        if (day[1] === 1) {
          serviceDaysArray.push(dayMap[day[0]]);
        }
      });

      if (serviceDaysArray.length === 7) {
        return "每日行駛。";
      } else {
        return `星期${serviceDaysArray.join("、")}行駛。`;
      }
    };

    onMounted(() => {
      if (
        route.params.clickedTraintimeDetail &&
        route.params.clickedTraintimeDetail !== "undefined"
      ) {
        clickedTraintimeDetail.value = JSON.parse(
          route.params.clickedTraintimeDetail as string
        );
        selectedStation.value = JSON.parse(
          localStorage.getItem("selectedStation") as string
        );
      } else if (route.params.clickedTraintimeDetail === "undefined") {
        noData.value = true;
      } else {
        dataLose.value = true;
      }

      window.scrollTo(0, 0);
    });

    return {
      clickedTraintimeDetail,
      noData,
      dataLose,
      goBack,
      getServiceDays,
      selectedStation
    };
  }
});
</script>

<style lang="scss" scoped>
#train-name {
  font-size: 1.2rem;
  font-weight: 700;
}

#train-note {
  color: gray;
  font-size: 0.9rem;
}

.badge {
  font-size: 0.9rem;
}

.selected-station-text {
  color: $ice-berg;
  font-weight: 700;

  .dot-text {
    position: relative;

    &:before {
      content: "";
      display: block;
      height: 0.65em;
      width: 0.65em;
      background: $ice-berg;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: -1.35em; // size of bullet
      transform: translateY(-50%); // vertical alignment
      font-size: 0.6rem;
    }
  }
}
</style>
