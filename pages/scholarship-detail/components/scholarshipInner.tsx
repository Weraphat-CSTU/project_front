import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getCalendar } from "@/dataService/getcalendar";
import { useQuery } from "react-query";

export default function ScholarshipDetailInner() {
  const { data: Calendar } = useQuery({
    queryKey: "calendar",
    queryFn: async () => getCalendar(),
  });

  return (
    <div className="w-full h-screen">
      <div className="mx-auto max-w-3xl lg:max-w-7xl">
        <div className="w-full h-3/5 border rounded-md shadow-lg p-3 mb-3 mt-3 space-y-5">
          <h1 className="font-bold text-2xl">รายละเอียด</h1>
          <div className="font-semibold text-lg space-y-10 p-10">
            <div>ชื่อทุนการศึกษา</div>
            <div>ปีการศึกษา</div>
            <div>ระยะเวลาเปิดรับสมัคร</div>
            <div>เกรดเฉลี่ยขั้นต่ำ</div>
            <div>ชั้นปี</div>
            <div>เงื่อนไข</div>
          </div>
        </div>
        <div className="w-full h-2/5 flex justify-between ">
          <div className="w-2/4  border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3">
            <div className="text-2xl font-extrabold dark:text-white">
              รายละเอียดเพิ่มเติม
            </div>
          </div>
          <div className="w-full  lg:w-2/4  pl-5 border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3">
            <FullCalendar
              plugins={[dayGridPlugin]}
              locale={"th"}
              initialView="dayGridMonth"
              dayMaxEventRows={3}
              events={Calendar?.result}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
