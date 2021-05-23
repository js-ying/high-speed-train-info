import jsSHA from "jssha";

export function getAuthorizationHeaderService() {
  const AppID = "3b124a10ae70407a94afe8f1a07dcd10";
  const AppKey = "haEfCNQB6REiBCWwago238-MFAI";

  const GMTString = new Date().toUTCString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  return {
    Authorization: Authorization,
    "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/
  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}
