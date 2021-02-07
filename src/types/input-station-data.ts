export default interface InputStationData {
  [key: string]: QueryParams;
}

interface QueryParams {
  inputText: string;
  placeholder: string;
  selectedStation: string;
  filterStationList: string[];
}
