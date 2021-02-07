export interface OdTimeTable {
  DailyTrainInfo: DailyTrainInfo;
  DestinationStopTime: StopTime;
  OriginStopTime: StopTime;
  TrainDate: string;
  UpdateTime: string;
  VersionID: number;
}

export interface StationName {
  Zh_tw: string;
  En: string;
}

export interface DailyTrainInfo {
  Direction: number;
  EndingStationID: string;
  EndingStationName: StationName;
  Note: {};
  StartingStationID: string;
  StartingStationName: StationName;
  TrainNo: string;
}

export interface StopTime {
  StopSequence: number;
  StationID: string;
  StationName: StationName;
  ArrivalTime: string;
  DepartureTime: string;
}
