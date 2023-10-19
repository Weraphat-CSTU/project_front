import Image from 'next/image';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getInfomation } from '@/dataService/getinformation';
import { getScholarship } from '@/dataService/getscholarship';
import Layout2 from '@/components/layout2';
import { getDate } from '@/utils/getDate';
import Fullcalendar from '@/components/fullcalendar';

export default function Index() {
    const useSwiperRef = useRef<SwiperClass>();

    const Router = useRouter();

    const { data: information, isLoading: isLoadingInfo } = useQuery({
        queryKey: 'information',
        queryFn: async () => getInfomation(),
    });

    const { data: scholarship, isLoading: isLoadingScholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

    return (
        <Layout2 isLoading={isLoadingInfo && isLoadingScholarship}>
            <div className=" w-full min-h-screen bg-[#EFF1FE]">
                <div className="relative">
                    <img
                        src="https://cdn.discordapp.com/attachments/1153632685407871066/1164514618698371182/Dometu-transformed.png?ex=65437dc0&is=653108c0&hm=b607c9fe9bc1b12da67605c675dde9f8ff6fe42bc6fc1cfb0d92c13615d90a91&"
                        width={600}
                        height={600}
                        className="object-cover brightness-50 w-full"
                        alt="Picture of the author"
                    />

                    <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between w-full lg:h-[600px] mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl absolute inset-0">
                        <div className="space-y-2 lg:space-y-6 pl-5 pt-5 pb-10 lg:pl-5 lg:pb-0 lg:pt-0">
                            <div className="font-bold text-white  text-xl lg:text-4xl">
                                ทุนการศึกษาสำหรับนักศึกษา
                            </div>
                            <div className="font-semibold lg:font-bold text-white text-md lg:text-2xl ">
                                วิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์
                            </div>
                            <div className="mt-10">
                                <button
                                    onClick={() => Router.push('/register')}
                                    className="text-white bg-[#EB9D48]  p-1 lg:p-2 rounded-lg w-[150px] "
                                >
                                    ลงทะเบียน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white pb-10">
                    <div className="mx-auto w-full lg:max-w-7xl pt-20">
                        <div className="font-semibold lg:font-bold text-xl lg:text-2xl text-black text-center">
                            ข่าวประชาสัมพันธ์
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
                                        slidesPerView: 4,
                                        spaceBetween: 5,
                                    },
                                }}
                            >
                                {information?.result.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <SwiperSlide>
                                                <div className="relative bg-gray-300 space-y-5 w-[full] h-[350px] lg:w-[250px]  lg:h-[400px] p-3 rounded-md px-3">
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
                    <div className="mx-auto  lg:max-w-7xl lg:flex ">
                        <div className="w-full lg:w-2/5 lg:pr-5 ">
                            <div className="flex justify-between items-center ">
                                <div className="font-bold text-md md:text-lg lg:text-xl mx-3">
                                    ทุนการศึกษาที่กำลังดำเนินการ
                                </div>
                                <div
                                    className="text-blue-500 font-medium text-lg hover:underline cursor-pointer mx-3"
                                    onClick={() => Router.push('/scholarshipAll')}
                                >
                                    ทั้งหมด
                                </div>
                            </div>
                            <div className="pt-5 mx-3">
                                {scholarship?.result.map((item, Index) => {
                                    return (
                                        <div
                                            key={Index}
                                            className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                                            onClick={() =>
                                                Router.push(`/scholarship-detail/${Index}`)
                                            }
                                        >
                                            <div className="font-semibold text-xl">
                                                {item.scholarship_name}
                                            </div>
                                            <div className="font-normal text-[17px]">
                                                {item.scholarship_type_name} (
                                                {item.scholarship_year})
                                            </div>
                                            <div>{getDate(item.start_date, item.end_date)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className=" w-full lg:w-3/5 pt-10 lg:pt-0 pl-7 lg:pl-5 pb-10 -mx-3">
                            <div className="font-bold text-md md:text-lg lg:text-xl pb-5">
                                ปฏิทันกำหนดการ
                            </div>
                            <Fullcalendar />
                        </div>
                    </div>
                </div>

                <div className=" w-full h-[500px] mx-auto max-w-3xl lg:max-w-7xl">
                    <div className="text-center font-bold text-xl lg:text-2xl p-10">ประเภททุน</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                        <div className="h-[150px] md:h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in ">
                            <div className="max-md:flex">
                                <div className="md:flex md:justify-center">
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
                        <div className="h-[150px] md:h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in">
                            <div className="max-md:flex ">
                                <div className="md:flex md:justify-center">
                                    <Image
                                        src="/โลก.png"
                                        width={150}
                                        height={50}
                                        alt="Picture of the author"
                                    />
                                </div>
                                <div className=" pt-8 space-y-3">
                                    <div className="font-bold text-xl text-center">มหาวิทยาลัย</div>
                                    <div className="text-center">ทุนจากมหาวิทยาลัยธรรมศาสตร์</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="w-full h-auto p-2 bg-[#EB9D48]">
                    <div className=" mx-3 lg:mx-auto  lg:max-w-7xl md:flex ">
                        <div className="w-full md:w-1/2">
                            <div className="font-semibold md:font-bold text-white text-xl text-center md:text-left md:text-3xl pt-1 md:pt-5 ">
                                ติดต่อ
                            </div>
                            <div className="lg:space-y-1 md:pt-3 text-center md:text-left">
                                <div className="text-white text-sm md:text-base">
                                    สาขาวิชาวิทยาการคอมพิวเตอร์ มธ. ศูนย์รังสิต
                                </div>
                                <div className="text-white text-sm md:text-base">
                                    อาคารบรรยายรวม 2
                                </div>
                                <div className="text-white text-sm md:text-base">
                                    คณะวิทยาศาสตร์และเทคโนโลยีมหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต
                                </div>
                                <div className="text-white text-sm md:text-base">
                                    ปทุมธานี 12120
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:space-y-1 md:pt-16 max-md:text-center">
                            <div className="text-white max-md:text-sm">
                                โทรศัพท์ : 0-2986-9154, 0-2986-9156, 0-2986-9138-39
                            </div>
                            <div className="text-white max-md:text-sm">โทรสาร : 0-2986-9157</div>
                            <div className="text-white max-md:text-sm">
                                Email: scitu_cs@sci.tu.ac.th
                            </div>
                            <div className="text-white max-md:text-sm">
                                Facebook: @CSTUadmissioncenter
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Layout2>
    );
}
