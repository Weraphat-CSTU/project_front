import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
import { useRef } from "react";
import { useRouter } from "next/router";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
export default function Index() {
  const useSwiperRef = useRef<SwiperClass>();
  const Router = useRouter();
  return (
    <div className="w-full min-h-screen bg-[#EFF1FE]">
      <div className=" sticky top-0 bg-[#EFF1FE] z-50">
        <div className="mx-auto max-w-3xl lg:max-w-7xl w-full h-16 flex items-center ">
          <Image
            src="/qjg3jmr9-removebg-preview.png"
            width={50}
            height={10}
            alt="Picture of the author"
          />
          <div className="flex">
            <div className="font-bold text-xl">Cs</div>
            <div className="text-[#EB9D48] text-xl font-bold ">Scholarship</div>
          </div>
          <div className="flex-1 flex items-center  justify-center space-x-5">
            <div>หน้าแรก</div>
            <div>ข่าวสาร</div>
            <div>ประเภททุน</div>
            <div>ติดต่อ</div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => Router.push("/login")}
              className="w-full h-10 hover:bg-[#B89CC9] border border-[#B89CC9] px-5 rounded-lg font-bold hover:text-white"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-between w-full h-[600px] mx-auto max-w-3xl lg:max-w-7xl ">
        <div className=" space-y-3 lg:space-y-5">
          <div className="font-bold text-3xl lg:text-5xl">ทุนการศึกษา</div>
          <div className="text-[#EB9D48] font-bold text-4xl lg:text-6xl">
            สำหรับนักศึกษา
          </div>
          <div className="font-bold text-md lg:text-xl">
            วิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์
          </div>
          <button
            onClick={() => Router.push("/register")}
            className="text-white bg-[#EB9D48]  p-1 lg:p-2 rounded-lg"
          >
            ลงทะเบียน
          </button>
        </div>
        <div className="">
          {" "}
          <Image
            src="/หน้าแรก.png"
            width={600}
            height={600}
            alt="Picture of the author"
          />
        </div>
      </div>

      <div className="w-full bg-white pt-10">
        <div className="mx-auto max-w-3xl lg:max-w-7xl flex">
          <div className="w-1/2  bg-blue-300">
            ทุนการศึกษาที่กำลังดำเนินการ
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
          </div>
          <div className="w-1/2  bg-red-300">ปฏิทันกำหนดการ</div>
        </div>
      </div>

      <div className="w-full h-[500px] bg-white ">
        <div className="mx-auto max-w-3xl lg:max-w-7xl pt-20">
          <div className=" pt-12 pr-2 md:flex lg:flex lg:space-x-3 ">
            <button
              onClick={() => useSwiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 focus:bg-sky-700 my-20"
            >
              <AiOutlineLeft className="h-5 w-5 text-white" />
            </button>
            <div className=" lg:flex-1 ">
              <div className="mx-auto md:max-w-2xl lg:max-w-6xl">
                <Swiper
                  modules={[Pagination]}
                  pagination={true}
                  className="h-full w-full "
                  onSwiper={(swiper) => (useSwiperRef.current = swiper)}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw1.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw2.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw3.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw4.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw1.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw2.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw3.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      style={{ width: 500, height: 200 }}
                      src="/tw4.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </SwiperSlide>
                  <div className="swiper-pagination"></div>
                </Swiper>
              </div>
            </div>
            <button
              onClick={() => useSwiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 focus:bg-sky-700 my-20"
            >
              <AiOutlineRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className=" w-full h-[500px] mx-auto max-w-3xl lg:max-w-7xl">
        <div className="text-center font-bold text-2xl lg:text-4xl p-10">
          ประเภททุน
        </div>
        <div className="  grid grid-cols-1 md:grid-cols-3 gap-2">
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
        <div className="mx-auto max-w-3xl lg:max-w-7xl">
          <div className="flex justify-between">
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
