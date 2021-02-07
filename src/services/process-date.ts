export default function processDate(data: Date) {
  const date = data;
  return date.toISOString().split("T")[0];
}
