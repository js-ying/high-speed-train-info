export interface Station {
  LocationCity: string;
  LocationCityCode: string;
  LocationTown: string;
  LocationTownCode: string;
  OperatorID: string;
  StationAddress: string;
  StationCode: string;
  StationID: string;
  StationName: {
    Zh_tw: string;
    En: string;
  };
  StationPosition: {
    GeoHash: string;
    PositionLat: number;
    PositionLon: number;
  };
  StationUID: string;
  UpdateTime: string;
  VersionID: number;
}
