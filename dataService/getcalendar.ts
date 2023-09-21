export type calendarData = {
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
    title: "ทดสอบ",
    start: "2023-09-14",
    end: "2023-09-20",
    color: "red"
  },
  {
    title: "event 2",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "green"
  },
  {
    title: "event 3",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "sky"
  },
  {
    title: "event 4",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "yellow"
  },
  {
    title: "event 5",
    start: "2023-09-14",
    end: "2023-09-25",
    color: "white"
  },
];

export function getCalendar() : Promise<calendarpDataBody>{
    return Promise.resolve({result : mockCalendar})
}