export default interface QueryAreaForm {
  [key: string]: QueryParams;
}
interface QueryParams {
  inputText: string;
  placeholder: string;
  selectedStation: string;
  filterStationList: string[];
}
