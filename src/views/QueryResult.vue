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
    <div class="mb-4" v-else>
      <div class="alert alert-gray mt-4">
        沒有找到高鐵車次！有以下兩種可能：
        <ol class="mt-2 mb-0">
          <li>出發時間設定太晚，已無班次。</li>
          <li>起迄車站設定錯誤。</li>
        </ol>
      </div>
      <!-- traintime-ads -->
      <AdBanner />
    </div>
  </div>
</template>

<script lang="ts">
import AdBanner from "@/components/AdBanner.vue";
import TimeTable from "@/components/TimeTable.vue";
import getJsyHsTrainTimeTableService from "@/services/get-jsy-hs-train-time-table-service";
import getStationIdService from "@/services/get-station-id-service";
import { FreeSeatingCar } from "@/types/daily-free-seating-car";
import { JsyHsTrainTimeTable } from "@/types/jsy-hs-train-time-table";
import { OdFare } from "@/types/od-fare";
import { OdTimeTable } from "@/types/od-time-table";
import QueryParams from "@/types/query-params";
import { RailGeneralTimetable } from "@/types/rail-general-timetable";
import { SelectedStation } from "@/types/station";
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "QueryResult",
  components: { TimeTable, AdBanner },
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

    const query = async () => {
      timeTableDataList.value = [];
      noTrain.value = false;
      try {
        const jsyHsTrainTimeTableResult: JsyHsTrainTimeTable = await getJsyHsTrainTimeTableService(
          store,
          queryParams.start.selectedStation.id,
          queryParams.end.selectedStation.id,
          queryParams.date,
          queryParams.time
        );

        timeTableDataList.value = jsyHsTrainTimeTableResult.timeTable;

        noTrain.value = timeTableDataList.value.length <= 0 ? true : false;

        generalTimetable.value = jsyHsTrainTimeTableResult.generalTimeTable;

        fareList.value = jsyHsTrainTimeTableResult.fareList;

        freeSeatingCarList.value =
          jsyHsTrainTimeTableResult.dailyFreeSeatingCar.FreeSeatingCars;
      } catch (error) {
        store.commit("hideLoading");

        if (error.response) {
          alert(
            `${error.response.data.message}`
          );
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
