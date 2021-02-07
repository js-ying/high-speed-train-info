import axios from "axios";
import { OdTimeTable } from "../types/od-time-table";

export default async function getOdTimeTable(
  startStation: string,
  endStation: string,
  date: string
): Promise<OdTimeTable[]> {
  const response = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?&$format=JSON`
  );

  return response.data;
}
