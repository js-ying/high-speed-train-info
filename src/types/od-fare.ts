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
  TicketType: number; // [1:'一般票(單程票)',2:'來回票',3:'電子票証(悠遊卡/一卡通)',4:'回數票',5:'定期票(30天期)',6:'定期票(60天期)',7:'早鳥票',8:'團體票']
  Price: number;
  FareClass: number; // [1:'成人',2:'學生',3:'孩童',4:'敬老',5:'愛心',6:'愛心孩童',7:'愛心優待/愛心陪伴',8:'軍警',9:'法優']
  CabinClass: number; // [1:'標準座車廂',2:'商務座車廂',3:'自由座車廂']
}

export const ticketTypeMap = {
  1: "一般票",
  2: "來回票",
  3: "電子票證",
  4: "回數票",
  5: "定期票(30天)",
  6: "定期票(60天)",
  7: "早鳥票",
  8: "團體票"
};

export const fareClassMap = {
  1: "成人",
  2: "學生",
  3: "孩童",
  4: "敬老",
  5: "愛心",
  6: "愛心孩童",
  7: "愛心優待/愛心陪伴",
  8: "軍警",
  9: "法優"
};

export const cabinClassMap = {
  1: "標準",
  2: "商務",
  3: "自由"
};

export const fareMap = {
  ticketTypeMap,
  fareClassMap,
  cabinClassMap
};
