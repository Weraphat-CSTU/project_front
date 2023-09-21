export type calendarData = {
  textColor: string;
  title: string;
  start: string;
  end: string;
  color: string
};

export type calendarpDataBody = {
  result: calendarData[];
};

const mockCalendar: calendarData[] = [
  {
    textColor: "black",
    title: "ทดสอบ",
    start: "2023-09-14",
    end: "2023-09-20",
    color: "red"
  },
  {
    textColor: "black",
    title: "event 2",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "green"
  },
  {
    textColor: "black",
    title: "event 3",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "blue"
  },
  {
    textColor: "black",
    title: "event 4",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "yellow"
  },
  {
    textColor: "black",
    title: "event 5",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "white"
  },
];

export function getCalendar() : Promise<calendarpDataBody>{
    return Promise.resolve({result : mockCalendar})
}