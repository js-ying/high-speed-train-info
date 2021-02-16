import { Station } from "@/types/station";

export default function getStationIdService(
  stationData: Station[],
  stationName: string
): string {
  console.log("getStationIdService");
  if (stationData) {
    return (
      stationData.find(station => station.StationName.Zh_tw === stationName)
        ?.StationID || ""
    );
  }
  return "";
}
