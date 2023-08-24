/* eslint-disable @typescript-eslint/camelcase */
export const price = {
  data: [
    {
      OriginStationID: "0990",
      OriginStationName: { Zh_tw: "南港", En: "Nangang" },
      DestinationStationID: "1070",
      DestinationStationName: { Zh_tw: "左營", En: "Zuoying" },
      Direction: 0,
      Fares: [
        { TicketType: 1, Price: 2500, FareClass: 1, CabinClass: 2 },
        { TicketType: 1, Price: 1530, FareClass: 1, CabinClass: 1 },
        { TicketType: 1, Price: 1480, FareClass: 1, CabinClass: 3 }
      ],
      SrcUpdateTime: "2020-07-23T09:13:41+08:00",
      UpdateTime: "2020-07-24T06:49:13+08:00",
      VersionID: 5
    }
  ],
  status: 200,
  statusText: "OK",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "last-modified": "Thu, 23 Jul 2020 22:49:13 GMT"
  },
  config: {
    url:
      "https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare?$filter=OriginStationID%20eq%20'0990'%20and%20DestinationStationID%20eq%20'1070'&$format=JSON",
    method: "get",
    headers: { Accept: "application/json, text/plain, */*" },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1
  },
  request: "[object XMLHttpRequest]"
};
