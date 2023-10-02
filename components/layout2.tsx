import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Link } from 'react-daisyui';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';

type props = {
    children?: React.ReactNode;
    isLoading?: boolean;
};

const Layout2: FC<props> = ({ children, isLoading }) => {
    const Router = useRouter();
    const [isOpen, setisOpen] = useState<boolean>(false);
    const Navigator = [{ path: '/', lebel: 'หน้าแรก' }];
    return (
        <>
            {isLoading ? (
                <div></div>
            ) : (
                <div className="relative w-full min-h-screen">
                    <div className=" sticky top-0 bg-[#EFF1FE] z-50">
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
                                        <div className="font-bold text-xl">Cs</div>
                                        <div className="text-[#EB9D48] text-xl font-bold ">
                                            Scholarship
                                        </div>
                                    </div>
                                </div>
                                <div className="space-x-5 hidden lg:flex ">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => Router.push('/')}
                                    >
                                        หน้าแรก
                                    </div>
                                    <div>ข่าวสาร</div>
                                    <div>ประเภททุน</div>
                                    <div>ติดต่อ</div>
                                </div>
                                <div className="hidden lg:flex justify-end">
                                    <button
                                        onClick={() => Router.push('/login')}
                                        className="w-full h-10 hover:bg-[#B89CC9] border border-[#B89CC9] px-5 rounded-lg font-bold hover:text-white"
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
                                    <div className="flex justify-end ">
                                        <AiOutlineClose
                                            className="cursor-pointer "
                                            onClick={() => setisOpen(!isOpen)}
                                        />
                                    </div>
                                    <div className="space-y-5 ">
                                        <div className="text-lg font-medium">หน้าแรก</div>
                                        <hr />
                                        <div className="text-lg font-medium">ข่าวประชาสัมพันธ์</div>
                                        <hr />
                                        <div className="text-lg font-medium">ประเภททุน</div>
                                        <hr />
                                        <div className="text-lg font-medium">ติดต่อ</div>
                                        <hr />
                                        <div className="text-lg font-medium">
                                            <Link href="/login">เข้าสู่ระบบ</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-none w-full">{children}</div>
                </div>
            )}
        </>
    );
};
export default Layout2;
