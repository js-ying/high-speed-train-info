import {
  FreeSeatingCar,
  FreeSeatingCarNo
} from "@/types/daily-free-seating-car";

export const getFreeSeatGroupListByTrainNo = (
  dataList: FreeSeatingCar[],
  trainNo: string
): FreeSeatingCarNo[] => {
  if (dataList && dataList.length > 0) {
    const freeSeatingCar = dataList.find(
      data => String(data.TrainNo).padStart(4, "0") === trainNo
    );
    if (freeSeatingCar?.CarConfig) {
      const groupList = freeSeatingCar.CarConfig.split(" ")[1].split(",");
      return groupList.map(group => {
        return {
          startCar: group.split("-")[0].padStart(1, "0"),
          endCar: group.split("-")[1].padStart(1, "0")
        };
      });
    }
  }

  return [];
};
