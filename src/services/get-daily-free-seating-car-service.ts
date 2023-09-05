import { freeSeat } from "@/assets/fake-data/free-seat";
import { THSRFreeSeatingCar } from "@/types/daily-free-seating-car";
import axios from "axios";
import { Store } from "vuex";

export default async function getDailyFreeSeatingCarService(
  store: Store<any>,
  trainDate: string
): Promise<THSRFreeSeatingCar> {
  store.commit("showLoading");

  const response = await axios.get(
    `https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/DailyFreeSeatingCar/TrainDate/${trainDate}`
  );

  store.commit("hideLoading");

  return response.data;
  // return freeSeat as any;
}
