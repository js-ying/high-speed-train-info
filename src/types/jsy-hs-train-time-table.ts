import { THSRFreeSeatingCar } from "./daily-free-seating-car";
import { OdFare } from "./od-fare";
import { OdTimeTable } from "./od-time-table";
import { RailGeneralTimetable } from "./rail-general-timetable";

export interface JsyHsTrainTimeTable {
  timeTable: OdTimeTable[];
  fareList: OdFare[];
  generalTimeTable: RailGeneralTimetable[];
  dailyFreeSeatingCar: THSRFreeSeatingCar;
}
