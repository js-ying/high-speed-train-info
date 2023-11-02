import { queryResult } from "@/assets/fake-data/query-result";
import axios from "axios";
import { Store, useStore } from "vuex";
import { OdTimeTable } from "../types/od-time-table";
import { getAuthorizationHeaderService } from "./get-authorization-header-service";

export default async function getOdTimeTableService(
  store: Store<any>,
  startStation: string,
  endStation: string,
  date: string,
  time: string
): Promise<OdTimeTable[]> {
  store.commit("showLoading");

  const response = await axios.get(
    `https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?&$orderby=OriginStopTime/DepartureTime&$filter=OriginStopTime/DepartureTime ge '${time}'&$format=JSON`,
    { headers: getAuthorizationHeaderService() }
  );

  store.commit("hideLoading");

  return response.data;
  // return queryResult;
}
