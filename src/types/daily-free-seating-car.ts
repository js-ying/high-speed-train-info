export interface THSRFreeSeatingCar {
  UpdateTime: string;
  UpdateInterval: number;
  AuthorityCode: string;
  TrainDate: string;
  FreeSeatingCars: FreeSeatingCar[];
}

export interface FreeSeatingCar {
  TrainNo: string;
  CarConfig: string;
  Cars: number[];
}

export interface FreeSeatingCarNo {
  startCar: string;
  endCar: string;
}
