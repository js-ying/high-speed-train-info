import { ServiceDay } from "@/types/rail-general-timetable";

export const getServiceDays = (data?: ServiceDay): string => {
  if (!data) return "";

  // { "Monday": 1, "Tuesday": 1, "Wednesday": 1, "Thursday": 1, "Friday": 1, "Saturday": 1, "Sunday": 1 }
  const serviceDaysArray: string[] = [];

  const dayMap: Record<string, string> = {
    Monday: "一",
    Tuesday: "二",
    Wednesday: "三",
    Thursday: "四",
    Friday: "五",
    Saturday: "六",
    Sunday: "日"
  };

  Object.entries(data).forEach((day: [string, number]) => {
    if (day[1] === 1) {
      serviceDaysArray.push(dayMap[day[0]]);
    }
  });

  if (serviceDaysArray.length === 7) {
    return "每日行駛。";
  } else {
    return `星期${serviceDaysArray.join("、")}行駛。`;
  }
};
