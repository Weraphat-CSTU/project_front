import Layout from "@/components/layout";
import { useRouter } from "next/router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
export default function Scholarship() {
  const Router = useRouter();
  const Scholarship = [
    {
      sctype: "ทุนภายใน",
      scname: "เรียนดี",
      scyear: "2566",
      std: "2023-09-11",
      edd: "2023-09-29",
    },
    {
      sctype: "ทุนภายนอก",
      scname: "กยศ.",
      scyear: "2566",
      std: "2023-09-15",
      edd: "2023-09-22",
    },
    {
      sctype: "ทุนภายนอก",
      scname: "สนับสนุนเรียนต่อต่างประเทศ",
      scyear: "2566",
      std: "2023-09-15",
      edd: "2023-09-29",
    },
  ];
  function showTimeline(std: string, edd: string): string {
    var months_th = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return (
      new Date(std).getDate().toString() +
      " " +
      months_th[new Date(std).getMonth()] +
      " " +
      [new Date(std).getFullYear() + 543].toString() +
      " - " +
      new Date(edd).getDate().toString() +
      " " +
      months_th[new Date(edd).getMonth()] +
      " " +
      [new Date(edd).getFullYear() + 543].toString()
    );
  }
  return (
    <Layout>
      <div className="w-full h-screen ">
        <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
          <h1 className="text-2xl font-extrabold dark:text-white">
            ทุนการศึกษา
            <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">
              สาขาวิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์
            </small>
          </h1>
          <div className="flex pt-10">
            <div className="w-2/5 pr-5 ">
              <div className="flex justify-between items-center">
                <div className=" font-medium text-xl">
                  ทุนการศึกษาที่กำลังดำเนินการ
                </div>
                <div
                  className="text-blue-500 font-medium text-lg hover:underline cursor-pointer"
                  onClick={() => Router.push("/scholarship-all")}
                >
                  ทั้งหมด
                </div>
              </div>
              <div className="pt-5">
                {Scholarship.map((item, Index) => {
                  return (
                    <div
                      key={Index}
                      className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                      onClick={() =>
                        Router.push(`/scholarship-detail/${Index}`)
                      }
                    >
                      <div className="font-semibold text-xl">{item.scname}</div>
                      <div className="font-normal text-[17px]">
                        {item.sctype} ({item.scyear})
                      </div>
                      <div>{showTimeline(item.std, item.edd)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-3/5  pl-5">
              <div className="text-medium text-xl pb-5">ปฏิทันกำหนดการ</div>
              <FullCalendar
                plugins={[dayGridPlugin]}
                locale={"th"}
                initialView="dayGridMonth"
                dayMaxEventRows={3}
                events={[
                  {
                    textColor: "black",
                    title: "ทดสอบ",
                    start: "2023-09-14",
                    end: "2023-09-20",
                    color: "red",
                  },
                  {
                    textColor: "black",
                    title: "event 2",
                    start: "2023-09-14",
                    end: "2023-09-25",
                    color: "green",
                  },
                  {
                    textColor: "black",
                    title: "event 3",
                    start: "2023-09-14",
                    end: "2023-09-25",
                    color: "yellow",
                  },
                  {
                    title: "event 4",
                    start: "2023-09-14",
                    end: "2023-09-25",
                  },
                  {
                    title: "event 5",
                    start: "2023-09-14",
                    end: "2023-09-25",
                    color: "pink",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
