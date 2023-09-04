<template>
  <div class="mt-1" id="query-result">
    <time-table
      :selectedInfo="
        `${queryParams.start.selectedStation.name} - ${queryParams.end.selectedStation.name} ${queryParams.date} ${queryParams.time}`
      "
      :fareList="fareList"
      :freeSeatingCarList="freeSeatingCarList"
      :dataList="timeTableDataList"
      :queryDate="queryParams.date"
      :generalTimetable="generalTimetable"
      v-if="!noTrain"
    />
    <div class="alert alert-gray mt-4" v-else>
      沒有找到高鐵車次！有以下兩種可能：
      <ol class="mt-2 mb-0">
        <li>出發時間設定太晚，已無班次。</li>
        <li>起迄車站設定錯誤。</li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { SelectedStation } from "@/types/station";
import { OdTimeTable } from "@/types/od-time-table";
import { OdFare } from "@/types/od-fare";
import { FreeSeatingCar } from "@/types/daily-free-seating-car";
import { RailGeneralTimetable } from "@/types/rail-general-timetable";
import QueryParams from "@/types/query-params";
import getOdTimeTableService from "@/services/get-od-time-table-service";
import getStationIdService from "@/services/get-station-id-service";
import getOdFareService from "@/services/get-od-fare-service";
import getDailyFreeSeatingCarService from "@/services/get-daily-free-seating-car-service";
import TimeTable from "@/components/TimeTable.vue";
import getGeneralTimetableService from "@/services/get-general-timetable-service";

export default defineComponent({
  name: "QueryResult",
  components: { TimeTable },
  setup() {
    const route = useRoute();
    const store = useStore();
    const myStorage = window.localStorage;

    const noTrain = ref(false);
    const fareList: Ref<OdFare[]> = ref([]);
    const freeSeatingCarList: Ref<FreeSeatingCar[]> = ref([]);
    const timeTableDataList: Ref<OdTimeTable[]> = ref([]);
    const generalTimetable: Ref<RailGeneralTimetable[]> = ref([]);

    const queryParams = reactive({
      start: {
        selectedStation: {
          name: "",
          id: ""
        }
      },
      end: {
        selectedStation: {
          name: "",
          id: ""
        }
      },
      date: "",
      time: ""
    });

    const localStorageAction = reactive({
      saveLocalStorage() {
        myStorage.setItem(
          "selectedStation",
          JSON.stringify({
            start: queryParams.start.selectedStation,
            end: queryParams.end.selectedStation
          })
        );
      },
      saveHistoryLocalStorage() {
        let queryHistoryList: SelectedStation[][] = [];
        if (myStorage.queryHistoryList) {
          queryHistoryList = JSON.parse(myStorage.queryHistoryList);
          if (queryHistoryList.length > 5) {
            queryHistoryList.shift();
          }
        }
        const queryThisTime = [
          queryParams.start.selectedStation,
          queryParams.end.selectedStation
        ];
        let isDuplicate = false;
        let duplicateIndex = NaN;
        if (queryHistoryList.length > 0) {
          queryHistoryList.forEach((queryHistory, index: number) => {
            if (
              JSON.stringify(queryHistory) === JSON.stringify(queryThisTime)
            ) {
              isDuplicate = true;
              duplicateIndex = index;
            }
          });
        }
        if (isDuplicate) {
          queryHistoryList.splice(duplicateIndex, 1);
        }
        queryHistoryList.push(queryThisTime);
        myStorage.setItem("queryHistoryList", JSON.stringify(queryHistoryList));
      }
    });

    const processQueryParams = (data: QueryParams) => {
      queryParams.start.selectedStation.name = data.s as string;
      queryParams.start.selectedStation.id = getStationIdService(
        store.state.stationData,
        data.s as string
      );

      queryParams.end.selectedStation.name = data.e as string;
      queryParams.end.selectedStation.id = getStationIdService(
        store.state.stationData,
        data.e as string
      );

      queryParams.date = data.d;
      queryParams.time = data.t;
    };

    const getGeneralTimetable = async () => {
      if (
        !sessionStorage.getItem("gernalTimetable") ||
        sessionStorage.getItem("gernalTimetable") === "{}"
      ) {
        const gernalTimetable = await getGeneralTimetableService(store);
        sessionStorage.setItem(
          "gernalTimetable",
          JSON.stringify(gernalTimetable)
        );
      }

      return JSON.parse(sessionStorage.getItem("gernalTimetable") || "");
    };

    const query = async () => {
      timeTableDataList.value = [];
      noTrain.value = false;
      try {
        timeTableDataList.value = await getOdTimeTableService(
          store,
          queryParams.start.selectedStation.id,
          queryParams.end.selectedStation.id,
          queryParams.date,
          queryParams.time
        );

        noTrain.value = timeTableDataList.value.length <= 0 ? true : false;

        generalTimetable.value = await getGeneralTimetable();

        fareList.value = await getOdFareService(
          store,
          queryParams.start.selectedStation.id,
          queryParams.end.selectedStation.id
        );

        freeSeatingCarList.value = (
          await getDailyFreeSeatingCarService(store, queryParams.date)
        ).FreeSeatingCars;
      } catch (error) {
        store.commit("hideLoading");

        if (error.response) {
          if (error.response.status === 429) {
            if (error.config?.url.includes("DailyFreeSeatingCar")) {
              // 自由座 API 出錯不影響時刻表
            } else {
              alert("系統已達每日流量上限，請隔日再來⋯⋯");
            }
          } else {
            alert(
              `${error.response.status}: ${error.response.data.Message}，請聯繫系統管理員。`
            );
          }
        } else if (error.request) {
          alert(`API 無回應，請聯繫系統管理員。`);
          console.log(error.request);
        } else {
          alert(`未知錯誤，請聯繫系統管理員。`);
          console.log("Error", error.message);
        }
      }

      localStorageAction.saveLocalStorage();
      localStorageAction.saveHistoryLocalStorage();
    };

    onBeforeRouteUpdate(async to => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.query) {
        processQueryParams((to.query as unknown) as QueryParams);
        query();
      }
    });

    onMounted(() => {
      processQueryParams((route.query as unknown) as QueryParams);
      query();
    });

    return {
      noTrain,
      fareList,
      freeSeatingCarList,
      timeTableDataList,
      generalTimetable,
      queryParams
    };
  }
});
</script>
