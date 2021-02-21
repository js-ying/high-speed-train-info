import { queryResult } from "@/assets/fake-data/query-result";
import axios from "axios";
import { Store, useStore } from "vuex";
import { OdTimeTable } from "../types/od-time-table";

export default async function getOdTimeTableService(
  store: Store<any>,
  startStation: string,
  endStation: string,
  date: string,
  time: string
): Promise<OdTimeTable[]> {
  store.commit("showLoading");

  const response = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?&$orderby=OriginStopTime/DepartureTime&$filter=OriginStopTime/DepartureTime ge '${time}'&$format=JSON`
  );

  store.commit("hideLoading");

  return response.data;
  // return queryResult;
}
