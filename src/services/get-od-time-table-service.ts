import axios from "axios";
import { useStore } from "vuex";
import { OdTimeTable } from "../types/od-time-table";

export default async function getOdTimeTableService(
  startStation: string,
  endStation: string,
  date: string,
  time: string
): Promise<OdTimeTable[]> {
  const store = useStore();

  store.commit("showLoading");

  const response = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?&$orderby=OriginStopTime/DepartureTime&$filter=OriginStopTime/DepartureTime ge '${time}'&$format=JSON`
  );

  store.commit("hideLoading");

  return response.data;
}
