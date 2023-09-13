import Image from "next/image";
import React, { type FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Index from "@/pages";
type props = {
  children?: React.ReactNode;
};
     
  
const Layout: FC<props> = ({ children }) => {  
  const router = useRouter();


  const Navigator = [
    { path: "/scholarship", lebel: "ทุนการศึกษา" },
    { path: "/history", lebel: "ประวัตินักศึกษา" },
    { path: "/historyscholarship", lebel: "ประวัติทุนการศึกษา" },
    { path: "/", lebel: "ออกจากระบบ" }
  ];     
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
              {Navigator.map((item, Index) => {
                return (
                  <div key={Index}>
                  <Link
                    href={item.path}
                    className={
                      item.path === router.asPath
                        ? "font-bold text-lg text-white cursor-pointer underline"
                        : "font-bold text-lg text-white cursor-pointer "
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
