import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { Skeleton } from 'antd';

type props = {
    children?: React.ReactNode;
    isLoading?: boolean;
};

const Layout2: FC<props> = ({ children, isLoading }) => {
    const Router = useRouter();
    const [isOpen, setisOpen] = useState<boolean>(false);
    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            {isLoading ? (
                <div></div>
            ) : (
                <div className="relative w-full min-h-screen">
                    <div className=" sticky top-0 bg-[#EB9D48] z-50">
                        <div className="mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl w-full ">
                            <div className="flex justify-between items-center mx-3 xl:mx-0 h-16">
                                <div className="flex">
                                    <Image
                                        src="/qjg3jmr9-removebg-preview.png"
                                        width={50}
                                        height={10}
                                        alt="Picture of the author"
                                    />
                                    <div className="flex items-center">
                                        <div className="text-white text-xl font-bold ">
                                            CsScholarship
                                        </div>
                                    </div>
                                </div>
                                <div className="space-x-5 hidden lg:flex ">
                                    <Link
                                        className="cursor-pointer text-white"
                                        onClick={() => scrollToTop()}
                                        href="/"
                                        scroll={false}
                                    >
                                        หน้าแรก
                                    </Link>
                                    <Link
                                        className="text-white"
                                        href="/#information"
                                        scroll={false}
                                    >
                                        ข่าวสาร
                                    </Link>
                                    <Link className="text-white" href="/#calendar" scroll={false}>
                                        ปฏิทิน
                                    </Link>
                                    <Link
                                        className="text-white"
                                        href="/#scholarship_types"
                                        scroll={false}
                                    >
                                        ประเภททุน
                                    </Link>

                                    <Link className="text-white" href="/#contact" scroll={false}>
                                        ติดต่อ
                                    </Link>
                                </div>
                                <div className="hidden lg:flex justify-end">
                                    <button
                                        onClick={() => Router.push('/login')}
                                        className="w-full h-10 bg-white  px-5 rounded-lg font-bold text-[#EB9D48]"
                                    >
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                                <button
                                    className="btn btn-square btn-ghost lg:hidden"
                                    onClick={() => setisOpen(!isOpen)}
                                >
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
                                <div
                                    className={
                                        isOpen
                                            ? `w-full h-screen bg-white absolute inset-0 px-5 py-3 `
                                            : `hidden`
                                    }
                                >
                                    <div className="flex justify-end mt-2 mr-1">
                                        <AiOutlineClose
                                            className="cursor-pointer h-6 w-6"
                                            onClick={() => setisOpen(!isOpen)}
                                        />
                                    </div>
                                    <div className="space-y-5 ">
                                        <div>
                                            <Link
                                                className="cursor-pointer font-bold text-[#EB9D48]"
                                                onClick={() => {
                                                    scrollToTop(), setisOpen(!isOpen);
                                                }}
                                                scroll={false}
                                                href="/"
                                            >
                                                หน้าแรก
                                            </Link>
                                        </div>
                                        <hr />
                                        <div>
                                            <Link
                                                className="cursor-pointer font-bold text-[#EB9D48]"
                                                href="/#information"
                                                scroll={false}
                                                onClick={() => setisOpen(!isOpen)}
                                            >
                                                ข่าวสาร
                                            </Link>
                                        </div>
                                        <hr />
                                        <div>
                                            <Link
                                                className="cursor-pointer font-bold text-[#EB9D48]"
                                                href="/#calendar"
                                                scroll={false}
                                                onClick={() => setisOpen(!isOpen)}
                                            >
                                                ปฏิทิน
                                            </Link>
                                        </div>
                                        <hr />
                                        <div>
                                            <Link
                                                className="cursor-pointer font-bold text-[#EB9D48]"
                                                href="/#scholarship_types"
                                                scroll={false}
                                                onClick={() => setisOpen(!isOpen)}
                                            >
                                                ประเภททุน
                                            </Link>
                                        </div>
                                        <hr />
                                        <div>
                                            <Link
                                                className="cursor-pointer font-bold text-[#EB9D48]"
                                                href="/#contact"
                                                scroll={false}
                                                onClick={() => setisOpen(!isOpen)}
                                            >
                                                ติดต่อ
                                            </Link>
                                        </div>

                                        <hr />
                                        <div className="">
                                            <Link
                                                href="/login"
                                                onClick={() => setisOpen(!isOpen)}
                                                className="cursor-pointer py-2 text-lg font-medium h-10 text-white  px-5 rounded-lg  bg-[#EB9D48]"
                                            >
                                                เข้าสู่ระบบ
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                            <Skeleton active />
                        </div>
                    ) : (
                        <div>
                            <div className="flex  min-h-screen flex-none w-full">{children}</div>

                            <section id="contact" className="w-full h-auto p-2 bg-[#EB9D48]">
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
                                                คณะวิทยาศาสตร์และเทคโนโลยีมหาวิทยาลัยธรรมศาสตร์
                                                ศูนย์รังสิต
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
                                        <div className="text-white max-md:text-sm">
                                            โทรสาร : 0-2986-9157
                                        </div>
                                        <div className="text-white max-md:text-sm">
                                            Email: scitu_cs@sci.tu.ac.th
                                        </div>
                                        <div className="text-white max-md:text-sm">
                                            Facebook: @CSTUadmissioncenter
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
export default Layout2;
