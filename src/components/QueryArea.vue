<template>
  <div id="query-area">
    <div class="row" id="query-confition-row">
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>出發車站</div>
          <div>{{ formData.start.selectedStation }}</div>
        </button>
      </div>
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>抵達車站</div>
          <div>台北</div>
        </button>
      </div>
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>出發日期</div>
          <div>2021-01-09 22:03</div>
        </button>
      </div>
    </div>
    <div class="row mt-4" v-if="stationList.length > 0">
      <div class="col-12 mb-3">
        <input
          class="input form-control"
          v-model="formData.start.inputText"
          placeholder="出發車站（e.g. 新竹）"
          v-on:keyup.enter="formData.start.setStartStation()"
        />
      </div>
      <div
        class="col-3"
        v-for="(station, $index) in formData.start.filterStationList"
        :key="$index"
      >
        <button
          class="btn btn-blue mb-3"
          @click="formData.start.setStartStation(station)"
        >
          {{ station }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
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
    const formData: QueryAreaForm = reactive({
      start: {
        inputText: "",
        filterStationList: computed(() => {
          if (formData.start.inputText) {
            return stationList.filter(station =>
              station.includes(formData.start.inputText)
            );
          } else {
            return stationList;
          }
        }),
        selectedStation: "",
        setStartStation: (station: string) => {
          // 如果有帶參數進來代表 user 點擊按鈕
          if (station) {
            formData.start.selectedStation = station;

            // 如果沒帶參數，但搜尋區域已經被過濾到剩一個車站，代表 user 已經查到他想要的車站
          } else if (formData.start.filterStationList.length === 1) {
            formData.start.selectedStation =
              formData.start.filterStationList[0];
          }
        }
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
      formData
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#query-confition-row {
  .btn {
    height: 62px;
  }
}

.btn {
  width: 100%;
}
</style>
