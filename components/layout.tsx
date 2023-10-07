import Image from 'next/image';
import React, { useEffect, type FC, useState } from 'react';
import Link from 'next/link';
import { IoIosSchool } from 'react-icons/io';
import { BiCalendarPlus } from 'react-icons/bi';
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
};

type menu = {
    id: number;
    path: string;
    lebel: string;
    icons: React.ReactElement;
};

const Layout: FC<props> = ({ children, isLoading }) => {
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
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1, icons: <IoIosSchool /> },
                { path: '/addscholarship', lebel: 'เพิ่มทุน', id: 2, icons: <BiCalendarPlus /> },
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
                {
                    path: '/announcements',
                    lebel: 'ข่าวประชาสัมพันธ์',
                    id: 5,
                    icons: <TfiAnnouncement />,
                },
                { path: '/pastScholarship', lebel: 'ประวัติทุน', id: 6, icons: <GrHistory /> },
            ]);
        } else if (role_id === '2') {
            setnarMolmenu([
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1, icons: <IoIosSchool /> },
                {
                    path: '/announcements',
                    lebel: 'ข่าวประชาสัมพันธ์',
                    id: 2,
                    icons: <TfiAnnouncement />,
                },
                { path: '/pastScholarship', lebel: 'ประวัติทุน', id: 3, icons: <GrHistory /> },
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
                <div>
                    <div className="w-full h-[60px] bg-[#EB9D48] flex items-center">
                        <div className="mx-auto  lg:max-w-7xl w-full h-full ">
                            <div className="flex justify-between items-center pt-1">
                                <div className="flex items-center">
                                    <Image
                                        src="/qjg3jmr9-removebg-preview.png"
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
                    <div>{children}</div>
                </div>
            )}
        </>
    );
};
export default Layout;
