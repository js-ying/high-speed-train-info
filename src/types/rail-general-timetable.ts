export interface RailGeneralTimetable {
  EffectiveDate: string; // "2021-05-20"
  ExpiringDate: string; // ""
  GeneralTimetable: GeneralTimetable;
  UpdateTime: string; // "2021-05-20"
  VersionID: number; // 270
}

export interface GeneralTimetable {
  GeneralTrainInfo: RailGeneralTrainInfo; // 定期車次資料
  StopTimes: RailStopTime[]; // 停靠時間資料
  ServiceDay: ServiceDay; // 營運日型態
  SrcUpdateTime: Date; // 來源端平台資料更新時間 (ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
}

export interface RailGeneralTrainInfo {
  TrainNo: string; // 車次代碼 ,
  Direction: number; // 行駛方向 : [0:'南下',1:'北上'] ,
  StartingStationID?: string; // 列車起點車站代號 ,
  StartingStationName?: NameType; // 列車起點車站名稱 ,
  EndingStationID?: string; // 列車終點車站代號 ,
  EndingStationName?: NameType; //列車終點車站名稱 ,
  Note?: NameType; // 附註說明
}

export interface RailStopTime {
  StopSequence: number; // 跑法站序(由1開始) ,
  StationID: string; // 車站代碼 ,
  StationName: NameType; // 車站名稱 ,
  ArrivalTime?: string; // 到站時間(格式: HH:mm:ss) ,
  DepartureTime: string; // 離站時間(格式: HH:mm:ss)
}

export interface ServiceDay {
  Monday: number; // 星期一是否營運 : [0:'否',1:'是'] ,
  Tuesday: number; // 星期二是否營運 : [0:'否',1:'是'] ,
  Wednesday: number; // 星期三是否營運 : [0:'否',1:'是'] ,
  Thursday: number; // 星期四是否營運 : [0:'否',1:'是'] ,
  Friday: number; // 星期五是否營運 : [0:'否',1:'是'] ,
  Saturday: number; // 星期六是否營運 : [0:'否',1:'是'] ,
  Sunday: number; // 星期日是否營運 : [0:'否',1:'是']
}

export interface NameType {
  Zh_tw?: string; // 中文繁體名稱 ,
  En?: string; // 英文名稱
}
