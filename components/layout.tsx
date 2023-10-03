import Image from 'next/image';
import React, { useEffect, type FC, useState } from 'react';
import Link from 'next/link';
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

        const user_id = sessionStorage.getItem('user_id');
        if (user_id === '1') {
            setnarMolmenu([
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1 },
                { path: '/userInformation', lebel: 'ข้อมูลผู้ใช้', id: 2 },
                { path: '/addscholarship', lebel: 'เพิ่มทุน', id: 3 },
                { path: '/manageStudent', lebel: 'จัดการนักศึกษา', id: 4 },
                { path: '/manageScholarship', lebel: 'จัดการทุนการศึกษา', id: 5 },
                { path: '/pastScholarship', lebel: 'ประวัติทุน', id: 6 },
                { path: '/', lebel: 'ออกจากระบบ', id: 7 },
            ]);
        } else if (user_id === '2') {
            setnarMolmenu([
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1 },
                { path: '/userInformation', lebel: 'ข้อมูลผู้ใช้', id: 2 },
                { path: '/', lebel: 'ออกจากระบบ', id: 7 },
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
                        <div className="mx-auto max-w-3xl lg:max-w-7xl w-full h-full ">
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
                                <div className="flex items-center space-x-5">
                                    {norMalmenu?.map((item, Index) => {
                                        return (
                                            <div key={Index}>
                                                <Link
                                                    onClick={() => {
                                                        if (item.lebel == 'ออกจากระบบ') {
                                                            logout();
                                                        }
                                                    }}
                                                    href={item.path}
                                                    className={
                                                        item.path === router.asPath
                                                            ? 'font-bold text-md text-white cursor-pointer underline'
                                                            : 'font-bold text-md text-white cursor-pointer '
                                                    }
                                                >
                                                    {item.lebel}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{children}</div>
                </div>
            )}
        </>
    );
};
export default Layout;
