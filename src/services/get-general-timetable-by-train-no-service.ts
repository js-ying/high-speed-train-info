import { RailGeneralTimetable } from "@/types/rail-general-timetable";
import axios from "axios";
import { Store } from "vuex";
import { getAuthorizationHeaderService } from "./get-authorization-header-service";

export default async function getGeneralTimetableByTrainNoService(
  store: Store<any>,
  trainNo: string
): Promise<RailGeneralTimetable[]> {
  store.commit("showLoading");

  const response: RailGeneralTimetable[] = await axios.get(
    `https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/GeneralTimetable/TrainNo/${trainNo}?$format=JSON`,
    { headers: getAuthorizationHeaderService() }
  );

  store.commit("hideLoading");

  return response;
}
