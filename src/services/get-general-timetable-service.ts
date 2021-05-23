import { RailGeneralTimetable } from "@/types/rail-general-timetable";
import axios from "axios";
import { Store } from "vuex";
import { getAuthorizationHeaderService } from "./get-authorization-header-service";

export default async function getGeneralTimetableService(
  store: Store<any>
): Promise<RailGeneralTimetable[]> {
  store.commit("showLoading");

  const response = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/GeneralTimetable?$format=JSON`,
    { headers: getAuthorizationHeaderService() }
  );

  store.commit("hideLoading");

  return response.data;
}
