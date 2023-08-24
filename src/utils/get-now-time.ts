export default function getNowTime() {
  return new Date().toLocaleTimeString("en-GB").slice(0, 5);
}
