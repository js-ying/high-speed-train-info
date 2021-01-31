export default function getNowDate() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 10); // 'YYYY-mm-DD'.
}
