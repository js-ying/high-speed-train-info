<template>
  <div id="query-area">
    <!-- 查詢條件列（出發車站、抵達車站、出發日期） -->
    <div class="row" id="query-condition-row">
      <div class="col text-center">
        <button
          class="btn btn-outline-light"
          :class="{ active: nowSelected === 'start' }"
          @click="formAction.clickStationCondition('start')"
        >
          <div>出發車站</div>
          <div>{{ formData.start.selectedStation }}</div>
        </button>
      </div>
      <div class="col text-center">
        <button
          class="btn btn-outline-light"
          :class="{ active: nowSelected === 'end' }"
          @click="formAction.clickStationCondition('end')"
        >
          <div>抵達車站</div>
          <div>{{ formData.end.selectedStation }}</div>
        </button>
      </div>
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>出發日期</div>
          <div>2021-01-09 22:03</div>
        </button>
      </div>
    </div>
    <!-- 查詢條件列相關顯示 -->
    <div class="row mt-4" v-if="stationList.length > 0 && nowSelected">
      <!-- 車站搜尋框 -->
      <div class="col-12 mb-3">
        <input
          class="input form-control"
          v-model="formData[nowSelected].inputText"
          :placeholder="formData[nowSelected].placeholder"
          v-on:keyup.enter="formAction.setStation(nowSelected)"
          ref="inputText"
        />
      </div>
      <!-- 車站清單 -->
      <div
        class="col-3"
        v-for="(station, $index) in formData[nowSelected].filterStationList"
        :key="$index"
      >
        <button
          class="btn btn-blue mb-3"
          @click="formAction.setStation(nowSelected, station)"
        >
          {{ station }}
        </button>
      </div>
      <!-- 無符合車站 -->
      <div
        class="col-3"
        v-if="formData[nowSelected].filterStationList.length <= 0"
      >
        無符合車站。
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { Station } from "@/types/station";
import { fakeStation } from "@/assets/fake-data/station";
import QueryAreaForm from "@/types/query-area-form";

export default defineComponent({
  name: "QueryArea",
  props: {
    msg: String
  },
  setup() {
    const axios = require("axios").default;

    const stationList: string[] = reactive([]);
    const nowSelected = ref("");
    const inputText: any = ref(null);
    const formData: QueryAreaForm = reactive({
      start: {
        inputText: "",
        placeholder: "出發車站（e.g. 新竹）",
        selectedStation: "",
        filterStationList: computed(() => {
          if (formData.start.inputText) {
            return stationList.filter(station =>
              station.includes(formData.start.inputText)
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
          if (formData.end.inputText) {
            return stationList.filter(station =>
              station.includes(formData.end.inputText)
            );
          } else {
            return stationList;
          }
        })
      }
    });
    const formAction = reactive({
      clickStationCondition: (direction: string) => {
        if (direction === "start") {
          nowSelected.value = direction;
        }

        if (direction === "end") {
          nowSelected.value = direction;
        }

        setTimeout(() => {
          inputText.value.focus();
        }, 10);
      },
      setStation: (direction: string, station?: string) => {
        // 如果有帶參數進來代表 user 點擊按鈕
        if (station) {
          formData[direction].selectedStation = station;

          // 如果沒帶參數，但搜尋區域已經被過濾到剩一個車站，代表 user 已經查到他想要的車站
        } else if (formData[direction].filterStationList.length === 1) {
          formData[direction].selectedStation =
            formData[direction].filterStationList[0];
        }

        if (station || formData[direction].filterStationList.length === 1) {
          nowSelected.value = "";
          formData.start.inputText = "";
          formData.end.inputText = "";

          if (direction === "start") {
            nowSelected.value = "end";
          }
        }
      },
      resetQueryCondition: () => {
        formData.start.inputText = "";
        formData.start.selectedStation = "";
        formData.end.inputText = "";
        formData.end.selectedStation = "";
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
      inputText,
      formData,
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

.btn {
  width: 100%;
}
</style>
