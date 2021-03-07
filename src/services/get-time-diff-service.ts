export default function getTimeDiffService(
  startTime: any,
  endTime: any,
  queryDate: any
) {
  let endDateTime = queryDate;
  if (endTime < startTime) {
    const date = new Date(queryDate);
    endDateTime = new Date(date.setDate(date.getDate() + 1));
    endDateTime = new Date(
      endDateTime.getTime() - endDateTime.getTimezoneOffset() * 60000
    )
      .toISOString()
      .substring(0, 10);
  }

  const date1 = new Date(queryDate + "T" + startTime); // 開始時間
  const date2 = new Date(endDateTime + "T" + endTime); // 結束時間
  const date3 = date2.getTime() - date1.getTime(); // 時間差的毫秒數

  //計算出相差天數
  // let days = Math.floor(date3 / (24 * 3600 * 1000))

  //計算出小時數
  const leave1 = date3 % (24 * 3600 * 1000); // 計算天數後剩餘的毫秒數
  const hours = Math.floor(leave1 / (3600 * 1000));

  //計算相差分鐘數
  const leave2 = leave1 % (3600 * 1000); // 計算小時數後剩餘的毫秒數
  const minutes = Math.floor(leave2 / (60 * 1000));

  //計算相差秒數
  // let leave3 = leave2 % (60 * 1000); // 計算分鐘數後剩餘的毫秒數
  // let seconds = Math.round(leave3 / 1000);

  return hours + " 時 " + minutes + " 分";
}
