import Image from "next/image";
import React, { type FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
type props = {
  children?: React.ReactNode;
};

const Layout: FC<props> = ({ children }) => {
  const Router = useRouter();
  console.log(Router.asPath);
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
              {Router.asPath == "/scholarship" ? (
                <div className="font-bold text-lg text-white cursor-pointer underline">
                  <Link href="/scholarship">ทุนการศึกษา</Link>
                </div>
              ) : (
                <div className="font-bold text-lg text-white cursor-pointer ">
                  <Link href="/scholarship">ทุนการศึกษา</Link>
                </div>
              )}
              {Router.asPath == "/history" ? (
                <div className="font-bold text-lg text-white cursor-pointer underline">
                  <Link href="/history">ประวัตินักศึกษา</Link>
                </div>
              ) : (
                <div className="font-bold text-lg text-white cursor-pointer">
                  <Link href="/history">ประวัตินักศึกษา</Link>
                </div>
              )}
              <div className="font-bold text-lg text-white cursor-pointer">
                ประวัติทุนการศึกษา
              </div>
              <div className="font-bold text-lg text-white cursor-pointer">
                ออกจากระบบ
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default Layout;
