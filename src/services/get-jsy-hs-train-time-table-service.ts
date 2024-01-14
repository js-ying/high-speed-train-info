import { JsyHsTrainTimeTable } from "@/types/jsy-hs-train-time-table";
import axios from "axios";
import { Store } from "vuex";

export default async function getJsyHsTrainTimeTableService(
  store: Store<any>,
  startStation: string,
  endStation: string,
  date: string,
  time: string
): Promise<JsyHsTrainTimeTable> {
  store.commit("showLoading");

  const response = await axios.post(`/api/getHsTrainTimeTable`, {
    startStationId: startStation,
    endStationId: endStation,
    date: date,
    time: time,
  });

  store.commit("hideLoading");

  return response.data;
}
