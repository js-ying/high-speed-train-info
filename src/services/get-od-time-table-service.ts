import axios from "axios";
import { OdTimeTable } from "../types/od-time-table";

export default async function getOdTimeTableService(
  startStation: string,
  endStation: string,
  date: string,
  time: string
): Promise<OdTimeTable[]> {
  const response = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?&$orderby=OriginStopTime/DepartureTime&$filter=OriginStopTime/DepartureTime ge '${time}'&$format=JSON`
  );

  return response.data;
}
