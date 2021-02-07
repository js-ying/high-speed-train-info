export default function processTime(data: Date) {
  return data
    .toTimeString()
    .split(" ")[0]
    .slice(0, 5);
}
