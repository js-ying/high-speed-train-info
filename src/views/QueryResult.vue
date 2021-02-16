<template>
  <div class="mt-4" id="query-result">
    <time-table :dataList="timeTableDataList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useStore } from "vuex";
import TimeTable from "@/components/TimeTable.vue";
import getOdTimeTableService from "@/services/get-od-time-table-service";
import { OdTimeTable } from "@/types/od-time-table";
import { SelectedStation } from "@/types/station";
import { useRoute } from "vue-router";
import getStationIdService from "@/services/get-station-id-service";

export default defineComponent({
  name: "QueryResult",
  components: { TimeTable },
  setup() {
    const route = useRoute();
    const store = useStore();
    const myStorage = window.localStorage;

    const noTrain = ref(false);
    const timeTableDataList: Ref<OdTimeTable[]> = ref([]);

    const inputStationData = reactive({
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
      }
    });

    const localStorageAction = reactive({
      saveLocalStorage() {
        myStorage.setItem(
          "selectedStation",
          JSON.stringify({
            start: inputStationData.start.selectedStation,
            end: inputStationData.end.selectedStation
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
          inputStationData.start.selectedStation,
          inputStationData.end.selectedStation
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
      inputStationData.start.selectedStation.name = data.s as string;
      inputStationData.start.selectedStation.id = getStationIdService(
        store.state.stationData,
        data.s as string
      );

      inputStationData.end.selectedStation.name = data.e as string;
      inputStationData.end.selectedStation.id = getStationIdService(
        store.state.stationData,
        data.e as string
      );
    };

    const search = async () => {
      timeTableDataList.value = await getOdTimeTableService(
        inputStationData.start.selectedStation.id,
        inputStationData.end.selectedStation.id,
        route.query.d as string,
        route.query.t as string
      );

      noTrain.value = timeTableDataList.value.length <= 0 ? true : false;

      localStorageAction.saveLocalStorage();
      localStorageAction.saveHistoryLocalStorage();
    };

    onMounted(() => {
      processQueryParams(route.query);
      search();
    });

    return {
      noTrain,
      timeTableDataList
    };
  }
});
</script>
