import { SelectedStation } from "./station";

export default interface InputStationData {
  [key: string]: QueryParams;
}

interface QueryParams {
  inputText: string;
  placeholder: string;
  selectedStation: SelectedStation;
  filterStationList: SelectedStation[];
  valid: boolean;
}
