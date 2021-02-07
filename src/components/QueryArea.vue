<template>
  <div id="query-area">
    <!-- 查詢條件列（出發車站、抵達車站、出發日期） -->
    <div class="row" id="query-condition-row">
      <div class="col col-md-4 text-center">
        <button
          class="btn btn-outline-light"
          :class="{ active: nowSelected === 'start' }"
          @click="formAction.setNowSelected('start')"
        >
          <div>出發車站</div>
          <div>{{ inputStationData.start.selectedStation }}</div>
        </button>
      </div>
      <div class="col col-md-4 text-center">
        <button
          class="btn btn-outline-light"
          :class="{ active: nowSelected === 'end' }"
          @click="formAction.setNowSelected('end')"
        >
          <div>抵達車站</div>
          <div>{{ inputStationData.end.selectedStation }}</div>
        </button>
      </div>
      <div class="col-12 col-md-4 text-center mt-4 mt-md-0">
        <button
          class="btn btn-outline-light"
          :class="{ active: nowSelected === 'datetime' }"
          @click="formAction.setNowSelected('datetime')"
        >
          <div>出發日期</div>
          <div>
            {{ processDateToYyyyMmDd(inputDatetimeData.datetime.inputText) }}
            {{ porcessTimeToHhMm(inputDatetimeData.datetime.inputText) }}
          </div>
        </button>
      </div>
    </div>
    <!-- 查詢車站相關顯示 -->
    <div
      class="row mt-4"
      id="query-station-ui"
      v-if="
        stationList.length > 0 &&
          (nowSelected === 'start' || nowSelected === 'end')
      "
    >
      <!-- 車站搜尋框 -->
      <div class="col-12">
        <input
          class="input form-control"
          v-model="inputStationData[nowSelected].inputText"
          :placeholder="inputStationData[nowSelected].placeholder"
          v-on:keyup.enter="formAction.setStation(nowSelected)"
          ref="stationInputDom"
        />
      </div>
      <!-- 車站清單按鈕 -->
      <div
        class="col-3"
        v-for="(station, $index) in inputStationData[nowSelected]
          .filterStationList"
        :key="$index"
      >
        <button
          class="btn btn-gray mt-3"
          @click="formAction.setStation(nowSelected, station)"
        >
          {{ station }}
        </button>
      </div>
      <!-- 無符合車站 -->
      <div
        class="col-3 mt-3"
        v-if="inputStationData[nowSelected].filterStationList.length <= 0"
      >
        無符合車站。
      </div>
    </div>
    <!-- 出發日期相關顯示 -->
    <div
      class="row mt-4"
      id="datetime-picker-ui"
      v-if="nowSelected === 'datetime'"
    >
      <div class="col text-center">
        <date-picker
          mode="dateTime"
          color="blue"
          is-dark
          :min-date="nowDate"
          v-model="inputDatetimeData.datetime.inputText"
        ></date-picker>
      </div>
    </div>
    <!-- 搜尋按鈕 -->
    <div class="text-center mt-4">
      <button type="button" class="btn btn-light-blue">
        搜尋
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { DatePicker } from "v-calendar";
import { fakeStation } from "@/assets/fake-data/station";
import getNowDate from "@/services/get-now-date";
import processDate from "@/services/process-date";
import processTime from "@/services/process-time";
import { Station } from "@/types/station";
import InputStationData from "@/types/input-station-data";

export default defineComponent({
  name: "QueryArea",
  components: { DatePicker },
  setup() {
    const axios = require("axios").default;

    const stationList: string[] = reactive([]);

    const nowSelected = ref("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stationInputDom: any = ref(null);

    const nowDate = ref(getNowDate());

    const processDateToYyyyMmDd = processDate;
    const porcessTimeToHhMm = processTime;

    const inputStationData: InputStationData = reactive({
      start: {
        inputText: "",
        placeholder: "出發車站（e.g. 新竹）",
        selectedStation: "",
        filterStationList: computed(() => {
          if (inputStationData.start.inputText) {
            return stationList.filter(station =>
              station.includes(inputStationData.start.inputText)
            );
          } else {
            return stationList;
          }
        })
      },
      end: {
        inputText: "",
        placeholder: "抵達車站（e.g. 台北）",
        selectedStation: "",
        filterStationList: computed(() => {
          if (inputStationData.end.inputText) {
            return stationList.filter(station =>
              station.includes(inputStationData.end.inputText)
            );
          } else {
            return stationList;
          }
        })
      }
    });
    const inputDatetimeData = reactive({
      datetime: {
        inputText: new Date()
      }
    });
    const formAction = reactive({
      setNowSelected: (selected: string) => {
        if (nowSelected.value === selected) {
          nowSelected.value = "";
          return;
        }

        nowSelected.value = selected;

        if (selected === "start" || selected === "end") {
          setTimeout(() => {
            stationInputDom.value.focus();
          }, 10);
        }
      },
      setStation: (direction: string, station?: string) => {
        // 如果有帶參數進來代表 user 點擊按鈕
        if (station) {
          inputStationData[direction].selectedStation = station;

          // 如果沒帶參數，但搜尋區域已經被過濾到剩一個車站，代表 user 已經查到他想要的車站
        } else if (inputStationData[direction].filterStationList.length === 1) {
          inputStationData[direction].selectedStation =
            inputStationData[direction].filterStationList[0];
        }

        if (
          station ||
          inputStationData[direction].filterStationList.length === 1
        ) {
          nowSelected.value = "";
          inputStationData.start.inputText = "";
          inputStationData.end.inputText = "";

          // if (direction === "start") {
          //   nowSelected.value = "end";
          // }
        }
      },
      resetQueryCondition: () => {
        inputStationData.start.inputText = "";
        inputStationData.start.selectedStation = "";
        inputStationData.end.inputText = "";
        inputStationData.end.selectedStation = "";
        inputDatetimeData.datetime.inputText = new Date();
        nowSelected.value = "";
      }
    });

    const processStation = (data: Station[]) => {
      data.forEach(item => {
        stationList.push(item.StationName.Zh_tw);
      });
      console.log(stationList);
    };

    async function getStationList() {
      try {
        // const response = await axios.get(
        //   "https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station",
        //   {
        //     params: {
        //       format: JSON
        //     }
        //   }
        // );

        // console.log(response.data);
        // processStation(response.data);
        processStation(fakeStation);
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(() => {
      getStationList();
    });

    return {
      stationList,
      nowSelected,
      nowDate,
      processDateToYyyyMmDd,
      porcessTimeToHhMm,
      stationInputDom,
      inputStationData,
      inputDatetimeData,
      formAction
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#query-condition-row {
  .btn {
    height: 62px;
  }
}

#query-condition-row,
#query-station-ui {
  .btn {
    width: 100%;
  }
}
</style>
