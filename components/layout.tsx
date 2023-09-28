import Image from 'next/image';
import React, { useEffect, type FC, useState } from 'react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import Index from '@/pages';
type props = {
    children?: React.ReactNode;
};

type menu = {
    id: number;
    path: string;
    lebel: string;
};

const Layout: FC<props> = ({ children }) => {
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
                { path: '/historyscholarship', lebel: 'ข้อมูลผู้ใช้', id: 2 },
                { path: '/addscholarship', lebel: 'เพิ่มทุน', id: 3 },
                { path: '/', lebel: 'จัดการนักศึกษา', id: 4 },
                { path: '/', lebel: 'จัดการทุน', id: 5 },
                { path: '/', lebel: 'ประวัติทุน', id: 6 },
                { path: '/', lebel: 'ออกจากระบบ', id: 7 },
            ]);
        } else if (user_id === '2') {
            setnarMolmenu([
                { path: '/scholarship', lebel: 'ทุนการศึกษา', id: 1 },
                { path: '/historyscholarship', lebel: 'ข้อมูลผู้ใช้', id: 2 },
                { path: '/', lebel: 'ออกจากระบบ', id: 7 },
            ]);
        }
    }, []);

    if (!authorize) {
        return null;
    }

    return (
        <div>
            <div className="w-full h-[60px] bg-[#EB9D48] flex items-center">
                <div className="mx-auto max-w-3xl lg:max-w-7xl w-full h-full ">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Image
                                src="/qjg3jmr9-removebg-preview.png"
                                width={50}
                                height={10}
                                alt="Picture of the author"
                            />
                            <div className="font-bold text-xl text-white ">CsScholarship</div>
                        </div>
                        <div className="flex items-center space-x-10">
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
                                                    ? 'font-bold text-lg text-white cursor-pointer underline'
                                                    : 'font-bold text-lg text-white cursor-pointer '
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
    );
};
export default Layout;