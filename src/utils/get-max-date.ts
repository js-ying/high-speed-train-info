export default function getMaxDate() {
  const date = new Date();
  return new Date(date.setDate(date.getDate() + 28))
    .toISOString()
    .substring(0, 10); // 'YYYY-mm-DD'.
}
