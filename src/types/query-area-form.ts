export default interface QueryAreaForm {
  start: {
    inputText: string;
    filterStationList: string[];
    selectedStation: string;
    setStartStation: Function;
  };
}
