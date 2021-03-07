import { price } from "@/assets/fake-data/price";
import { OdFare } from "@/types/od-fare";
import axios from "axios";
import { Store } from "vuex";

export default async function getOdFare(
  store: Store<any>,
  startStaionId: string,
  endStationId: string
): Promise<OdFare[]> {
  store.commit("showLoading");

  const response = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare?$filter=OriginStationID%20eq%20'${startStaionId}'%20and%20DestinationStationID%20eq%20'${endStationId}'&$format=JSON`
  );

  store.commit("hideLoading");

  // const response = price.data;

  return response.data;
}
