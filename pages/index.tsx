import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
import { useRef } from "react";
import { useRouter } from "next/router";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
export default function Index() {
  const useSwiperRef = useRef<SwiperClass>();
  const Router = useRouter();
  const Information = [
    {
      key: 1,
      imname: "ภาพ",
      headname: "ข่าวสาร",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร",
      desname: "เพิ่มเติม",
    },
    {
      key: 2,
      imname: "ภาพ2",
      headname: "ข่าวสาร2",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร2",
      desname: "เพิ่มเติม2",
    },
    {
      key: 3,
      imname: "ภาพ3",
      headname: "ข่าวสาร3",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร3",
      desname: "เพิ่มเติม3",
    },
    {
      key: 4,
      imname: "ภาพ4",
      headname: "ข่าวสาร4",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร4",
      desname: "เพิ่มเติม4",
    },
    {
      key: 5,
      imname: "ภาพ5",
      headname: "ข่าวสาร5",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร5",
      desname: "เพิ่มเติม5",
    },
    {
      key: 6,
      imname: "ภาพ6",
      headname: "ข่าวสาร6",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร5",
      desname: "เพิ่มเติม6",
    },
  ];
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
    <div className="w-full min-h-screen bg-[#EFF1FE]">
      <div className="sticky top-0 bg-[#EFF1FE] z-50">
        <div className="mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl w-full ">
          <div className="flex justify-between items-center mx-3 lg:mx-0 h-16">
            <div className="flex">
              <Image
                src="/qjg3jmr9-removebg-preview.png"
                width={50}
                height={10}
                alt="Picture of the author"
              />
              <div className="flex items-center">
                <div className="font-bold text-xl">Cs</div>
                <div className="text-[#EB9D48] text-xl font-bold ">
                  Scholarship
                </div>
              </div>
            </div>
            <div className="space-x-5 hidden lg:flex ">
              <div>หน้าแรก</div>
              <div>ข่าวสาร</div>
              <div>ประเภททุน</div>
              <div>ติดต่อ</div>
            </div>
            <div className="hidden lg:flex justify-end">
              <button
                onClick={() => Router.push("/login")}
                className="w-full h-10 hover:bg-[#B89CC9] border border-[#B89CC9] px-5 rounded-lg font-bold hover:text-white"
              >
                เข้าสู่ระบบ
              </button>
            </div>

            <button className="btn btn-square btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between w-full lg:h-[600px] mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl ">
        <div className="space-y-2 lg:space-y-3 pl-5 pt-5 pb-10 lg:pl-5 lg:pb-0 lg:pt-0">
          <div className="font-bold text-xl lg:text-2xl">ทุนการศึกษา</div>
          <div className="text-[#EB9D48] font-bold text-xl lg:text-2xl">
            สำหรับนักศึกษา
          </div>
          <div className="font-bold text-md lg:text-2xl">
            วิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์
          </div>
          <button
            onClick={() => Router.push("/register")}
            className="text-white bg-[#EB9D48]  p-1 lg:p-2 rounded-lg w-[150px]"
          >
            ลงทะเบียน
          </button>
        </div>
        <div className="flex justify-center">
          <Image
            src="/หน้าแรก.png"
            width={600}
            height={600}
            className="flex justify-center"
            alt="Picture of the author"
          />
        </div>
      </div>
      <div className="w-full bg-white pb-10">
        <div className="mx-auto w-full max-w-3xl md:max-w-5xl lg:max-w-7xl pt-20">
          <div className="font-semibold lg:font-bold text-2xl lg:text-4xl text-black text-center">
            ข่าวสาร
          </div>
          <div className="pt-12 pr-2 md:flex lg:flex lg:space-x-3 mx-3 lg:mx-0">
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => useSwiperRef.current?.slidePrev()}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 focus:bg-sky-700 my-20"
              >
                <AiOutlineLeft className="h-5 w-5 text-white" />
              </button>
            </div>
            <Swiper
              modules={[Pagination]}
              pagination={true}
              onSwiper={(swiper) => (useSwiperRef.current = swiper)}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 5,
                },
              }}
            >
              {Information.map((item, index) => {
                return (
                  <div key={index}>
                    <SwiperSlide>
                      <div className="relative bg-gray-300 space-y-5 w-[full] h-[350px] lg:w-[220px]  lg:h-[400px] p-3 rounded-md px-3">
                        <div className="w-full h-36 bg-blue-300">
                          {item.imname}
                        </div>
                        <div className="font-medium md:text-xl lg:text-2xl">
                          {item.headname}
                        </div>
                        <div className="font-normal md:text-lg lg:text-lg">
                          {item.infoname}
                        </div>
                        <div className="absolute bottom-0 pb-3 cursor-pointer w-full">
                          <div className="flex justify-center">
                            <div className="bg-red-300 font-normal md:text-md lg:text-lg  text-center md:w-[70px] lg:w-[100px] rounded-md p-1">
                              {item.desname}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                );
              })}
              <div className="swiper-pagination"></div>
            </Swiper>
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => useSwiperRef.current?.slideNext()}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 focus:bg-sky-700 my-20"
              >
                <AiOutlineRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white pt-10 pb-10 ">
        <div className="mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl lg:flex ">
          <div className=" lg:w-2/5 lg:pr-5 ">
            <div className="flex justify-between items-center ">
              <div className=" font-bold text-md md:text-lg lg:text-xl mx-3">
                ทุนการศึกษาที่กำลังดำเนินการ
              </div>
              <div
                className="text-blue-500 font-medium text-lg hover:underline cursor-pointer mx-3"
                onClick={() => Router.push("/scholarship-all")}
              >
                ทั้งหมด
              </div>
            </div>
            <div className="pt-5 mx-3">
              {Scholarship.map((item, Index) => {
                return (
                  <div
                    key={Index}
                    className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                    onClick={() => Router.push(`/scholarship-detail/${Index}`)}
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
          <div className=" w-full lg:w-3/5 pt-10 lg:pt-0 pl-7 lg:pl-5 pb-10 -mx-3">
            <div className="font-bold text-md md:text-lg lg:text-xl pb-5">
              ปฏิทันกำหนดการ
            </div>
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

      <div className=" w-full h-[500px] mx-auto max-w-3xl lg:max-w-7xl">
        <div className="text-center font-bold text-2xl lg:text-4xl p-10">
          ประเภททุน
        </div>
        <div className="grid max-md:stack md:grid-cols-3 gap-2 ">
          <div className="h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in ">
            <div className="flex justify-center">
              <Image
                src="/โลก.png"
                width={150}
                height={50}
                alt="Picture of the author"
              />
            </div>
            <div className=" pt-5 space-y-3">
              <div className="font-bold text-xl text-center">หน่วยงาน</div>
              <div className="text-center">
                ทุนจากหน่วยงาน องค์กร ในประเทศไทย
              </div>
            </div>
          </div>
          <div className="h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in">
            <div className="flex justify-center">
              <Image
                src="/ต่างเทศ.png"
                width={100}
                height={50}
                alt="Picture of the author"
              />
            </div>
            <div className=" pt-8 space-y-3">
              <div className="font-bold text-xl text-center">ต่างประเทศ</div>
              <div className="text-center">ทุนต่างประเทศ</div>
            </div>
          </div>
          <div className="h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in">
            <div className="flex justify-center">
              <Image
                src="/มหาลัย.png"
                width={100}
                height={50}
                alt="Picture of the author"
              />
            </div>
            <div className=" pt-8 space-y-3">
              <div className="font-bold text-xl text-center">มหาวิทยาลัย</div>
              <div className="text-center">ทุนจากมหาวิทยาลัย ธรรมศาสตร์</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full h-[200px] bg-[#EB9D48]">
        <div className="mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl">
          <div className="flex justify-between mx-3 lg:mx-0">
            <div>
              <div className="font-bold text-white text-3xl pt-5">ติดต่อ</div>
              <div className="lg:space-y-1 pt-3">
                <div className="text-white">
                  สาขาวิชาวิทยาการคอมพิวเตอร์ มธ. ศูนย์รังสิต
                </div>
                <div className="text-white">อาคารบรรยายรวม 2 </div>
                <div className="text-white">
                  คณะวิทยาศาสตร์และเทคโนโลยีมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต
                </div>
                <div className="text-white">ปทุมธานี 12120</div>
              </div>
            </div>
            <div className="lg:space-y-1 pt-16">
              <div className="text-white">
                โทรศัพท์ : 0-2986-9154, 0-2986-9156, 0-2986-9138-39
              </div>
              <div className="text-white">โทรสาร : 0-2986-9157</div>
              <div className="text-white">Email: scitu_cs@sci.tu.ac.th</div>
              <div className="text-white">Facebook: @CSTUadmissioncenter</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
