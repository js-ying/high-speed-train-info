export default function processDate(data: Date) {
  const offset = data.getTimezoneOffset();
  const date = new Date(data.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
}
