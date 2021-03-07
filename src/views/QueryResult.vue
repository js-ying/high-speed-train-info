<template>
  <div class="mt-4" id="query-result">
    <time-table
      :fareList="fareList"
      :dataList="timeTableDataList"
      :queryDate="queryParams.date"
      v-if="!noTrain"
    />
    <div class="alert alert-gray" v-else>
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
import getOdTimeTableService from "@/services/get-od-time-table-service";
import getStationIdService from "@/services/get-station-id-service";
import getOdFareService from "@/services/get-od-fare-service";
import TimeTable from "@/components/TimeTable.vue";

export default defineComponent({
  name: "QueryResult",
  components: { TimeTable },
  setup() {
    const route = useRoute();
    const store = useStore();
    const myStorage = window.localStorage;

    const noTrain = ref(false);
    const fareList: Ref<OdFare[]> = ref([]);
    const timeTableDataList: Ref<OdTimeTable[]> = ref([]);

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

    const processQueryParams = (data: any) => {
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

      fareList.value = await getOdFareService(
        store,
        queryParams.start.selectedStation.id,
        queryParams.end.selectedStation.id
      );

      timeTableDataList.value = await getOdTimeTableService(
        store,
        queryParams.start.selectedStation.id,
        queryParams.end.selectedStation.id,
        queryParams.date,
        queryParams.time
      );

      noTrain.value = timeTableDataList.value.length <= 0 ? true : false;

      localStorageAction.saveLocalStorage();
      localStorageAction.saveHistoryLocalStorage();
    };

    onBeforeRouteUpdate(async to => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.query) {
        console.log(to.query);
        processQueryParams(to.query);
        query();
      }
    });

    onMounted(() => {
      processQueryParams(route.query);
      query();
    });

    return {
      noTrain,
      fareList,
      timeTableDataList,
      queryParams
    };
  }
});
</script>
