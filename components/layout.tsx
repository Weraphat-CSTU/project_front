import Image from 'next/image';
import React, { useEffect, type FC, useState } from 'react';
import Link from 'next/link';
import { IoIosSchool } from 'react-icons/io';
import { BiCalendarPlus, BiMessageError } from 'react-icons/bi';
import { MdManageAccounts } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { TfiAnnouncement } from 'react-icons/tfi';
import { GrHistory } from 'react-icons/gr';
import { Router, useRouter } from 'next/router';
import Index from '@/pages';
type props = {
    children?: React.ReactNode;
    isLoading?: boolean;
    title?: string;
    subTitle?: string;
};

type menu = {
    id: number;
    path: string;
    lebel: string;
    icons: React.ReactElement;
};

const Layout: FC<props> = ({ children, isLoading, title, subTitle }) => {
    const router = useRouter();
    const [authorize, setauthorize] = useState<boolean | undefined>(undefined);
    const [norMalmenu, setnarMolmenu] = useState<menu[]>();

    const logout = () => {
        sessionStorage.setItem('login', 'false');
    };

    useEffect(() => {
        const login = sessionStorage.getItem('login') == 'true' ? true : false;
        setauthorize(login);

        if (!login) {
            router.push('/login');
        }

        const role_id = sessionStorage.getItem('role_id');
        if (role_id === '1') {
            setnarMolmenu([
                {
                    path: '/announcements',
                    lebel: 'ข่าวประชาสัมพันธ์',
                    id: 5,
                    icons: <TfiAnnouncement />,
                },
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1, icons: <IoIosSchool /> },

                {
                    path: '/manageStudent',
                    lebel: 'จัดการนักศึกษา',
                    id: 3,
                    icons: <MdManageAccounts />,
                },
                {
                    path: '/manageScholarship',
                    lebel: 'จัดการทุนการศึกษา',
                    id: 4,
                    icons: <IoSettingsOutline />,
                },

                { path: '/followscholarship', lebel: 'ติดตามทุน', id: 6, icons: <IoIosSchool /> },
                {
                    path: '/createalert',
                    lebel: 'รายการแจ้งเตือน',
                    id: 2,
                    icons: <BiMessageError />,
                },
                { path: '/pastScholarship', lebel: 'ประวัติทุน', id: 7, icons: <GrHistory /> },
            ]);
        } else if (role_id === '2') {
            setnarMolmenu([
                {
                    path: '/announcements',
                    lebel: 'ข่าวประชาสัมพันธ์',
                    id: 2,
                    icons: <TfiAnnouncement />,
                },
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1, icons: <IoIosSchool /> },
                { path: '/studentfollow', lebel: 'ติดตามทุน', id: 3, icons: <IoIosSchool /> },

                { path: '/pastScholarship', lebel: 'ประวัติทุน', id: 4, icons: <GrHistory /> },
            ]);
        }
    }, []);

    if (!authorize) {
        return null;
    }

    return (
        <>
            {isLoading ? (
                <div></div>
            ) : (
                <div className="relative min-h-screen">
                    <div className="w-full h-[60px] bg-[#EB9D48] flex items-center ">
                        <div className="mx-auto  lg:max-w-7xl w-full h-full ">
                            <div className="flex justify-between items-center pt-1">
                                <div className="flex items-center">
                                    <Image
                                        src="/qjg3jmr9-removebg-preview.png"
                                        className="w-[50px] h-[50px]"
                                        width={50}
                                        height={10}
                                        alt="Picture of the author"
                                    />
                                    <div className="font-bold text-lg text-white ">
                                        CsScholarship
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        {/* <SlUser className="w-8 h-8" /> */}
                                        <Image
                                            src="/น้อนปาร์ค.jpg"
                                            width={100}
                                            height={30}
                                            alt="Picture of the author"
                                            className="object-top rounded-full"
                                        />
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="mt-3  p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
                                    >
                                        <li>
                                            <a href="/userInformation" className="justify-between">
                                                ข้อมูลผู้ใช้
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                onClick={() => {
                                                    sessionStorage.setItem('login', 'false');
                                                }}
                                            >
                                                ออกจากระบบ
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[40px] bg-[#eeeff1] border-b">
                        <div className="mx-auto lg:max-w-7xl w-full h-full flex items-center space-x-5 lg:px-5">
                            {norMalmenu?.map((item, Index) => {
                                return (
                                    <div key={Index} className="flex space-x-1 items-center">
                                        <div className="text-[#354052]">{item.icons}</div>
                                        <Link
                                            onClick={() => {
                                                if (item.lebel == 'ออกจากระบบ') {
                                                    logout();
                                                }
                                            }}
                                            href={item.path}
                                            className={
                                                item.path === router.asPath
                                                    ? 'font-bold text-md text-[#9AA0A9] cursor-pointer underline'
                                                    : 'font-bold text-md text-[#a8aeb7] hover:text-[#9AA0A9] cursor-pointer '
                                            }
                                        >
                                            {item.lebel}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {title && (
                        <div className="mx-auto w-full lg:max-w-7xl pt-10 ">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">{title}</h1>
                                <h2 className="ml-2 font-semibold text-gray-500 dark:text-gray-400 text-base pt-1">
                                    {subTitle}
                                </h2>
                            </div>
                        </div>
                    )}

                    <div className="w-full  ">
                        <div className="w-full min-h-screen ">{children}</div>

                        <footer className="w-full h-auto mt-10 pb-10 bg-[#EB9D48]">
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
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};
export default Layout;
