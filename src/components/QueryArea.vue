<template>
  <div id="query-area">
    <div class="row" id="query-confition-row">
      <div class="col text-center">
        <button class="btn btn-outline-light">
          <div>出發車站</div>
          <div>{{ selectedStartStation }}</div>
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
          v-model="startStationInputText"
          placeholder="出發車站（e.g. 新竹）"
          v-on:keyup.enter="setStartStation()"
        />
      </div>
      <div
        class="col-3"
        v-for="(station, $index) in filterStartStationList"
        :key="$index"
      >
        <button class="btn btn-blue mb-3" @click="setStartStation(station)">
          {{ station }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { Station } from "@/types/station";
import { fakeStation } from "@/assets/fake-data/station";

export default defineComponent({
  name: "QueryArea",
  props: {
    msg: String
  },
  setup() {
    const axios = require("axios").default;

    const stationList: string[] = reactive([]);
    const startStationInputText = ref("");
    const filterStartStationList = computed(() => {
      if (startStationInputText.value) {
        return stationList.filter(station =>
          station.includes(startStationInputText.value)
        );
      } else {
        return stationList;
      }
    });
    const selectedStartStation = ref("");

    const setStartStation = (station: string) => {
      // 如果有帶參數進來代表 user 點擊按鈕
      if (station) {
        selectedStartStation.value = station;

        // 如果沒帶參數，但搜尋區域已經被過濾到剩一個車站，代表 user 已經查到他想要的車站
      } else if (filterStartStationList.value.length === 1) {
        selectedStartStation.value = filterStartStationList.value[0];
      }
    };

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
      startStationInputText,
      filterStartStationList,
      selectedStartStation,
      setStartStation
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
