export type calendarData = {
  textColor: string;
  title: string;
  start: string;
  end: string;
};

export type calendarpDataBody = {
  calen: calendarData[];
};

const mockCalendar: calendarData[] = [
  {
    textColor: "black",
    title: "ทดสอบ",
    start: "2023-09-14",
    end: "2023-09-20",
  },
  {
    textColor: "black",
    title: "event 2",
    start: "2023-09-14",
    end: "2023-09-25",
  },
  {
    textColor: "black",
    title: "event 3",
    start: "2023-09-14",
    end: "2023-09-25",
  },
  {
    textColor: "black",
    title: "event 4",
    start: "2023-09-14",
    end: "2023-09-25",
  },
  {
    textColor: "black",
    title: "event 5",
    start: "2023-09-14",
    end: "2023-09-25",
  },
];

export function getCalendar() : Promise<calendarpDataBody>{
    return Promise.resolve({calen : mockCalendar})
}