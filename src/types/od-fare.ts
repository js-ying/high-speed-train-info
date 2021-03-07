export interface OdFare {
  OriginStationID: string; // "0990"
  OriginStationName: StationName;
  DestinationStationID: string; // "1070"
  DestinationStationName: StationName;
  Direction: number; // 0
  Fares: Fare[];
  SrcUpdateTime: string; // "2020-07-23T09:13:41+08:00"
  UpdateTime: string; // "2020-07-24T06:49:13+08:00"
  VersionID: number; // 5
}

export interface StationName {
  Zh_tw: string;
  En: string;
}

export interface Fare {
  TicketType: string;
  Price: number;
}
