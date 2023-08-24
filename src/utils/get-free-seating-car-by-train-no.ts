import {
  FreeSeatingCar,
  FreeSeatingCarNo
} from "@/types/daily-free-seating-car";

export const getFreeSeatingCarByTrainNo = (
  dataList: FreeSeatingCar[],
  trainNo: string
): FreeSeatingCarNo => {
  if (dataList && dataList.length > 0) {
    const freeSeatingCar = dataList.find(
      data => String(data.TrainNo).padStart(4, "0") === trainNo
    );
    if (freeSeatingCar) {
      return {
        startCar: String(freeSeatingCar.Cars[0]).padStart(1, "0"),
        endCar: String(
          freeSeatingCar.Cars[freeSeatingCar.Cars.length - 1]
        ).padStart(1, "0")
      };
    }
  }

  return {
    startCar: "",
    endCar: ""
  };
};
