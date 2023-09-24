import Layout from "@/components/layout";
import { getuserinfo } from "@/dataService/getuserInfo";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { FaLine } from "react-icons/fa";
import { GrMailOption } from "react-icons/gr";
import { phoneFormatter, userIdFormatter } from "@/utils/regx";
import DisplaytItem from "@/components/displayItem";

export default function Historyscholarship() {
  const { data: userinfo } = useQuery({
    queryKey: "userinfo",
    queryFn: async () => getuserinfo(),
  });

  const items = useMemo(() => userinfo?.result[0], [userinfo]);
  return (
    <Layout>
      <div className="w-full min-h-screen bg-[#EFF1FE]">
        <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
          <div className="flex">
            <p className="font-semibold text-2xl mb-5">ประวัตินักศึกษา</p>
            <hr />
          </div>
          <div className=" border rounded-lg shadow-lg mb-3 mt-3 space-y-3 bg-white">
            <div className="flex flex-wrap ">
              <div className="w-2/6 h-96 border-r p-2 text-center flex items-center justify-center">
                <div className="space-y-5">
                  <p className="text-xl font-semibold">ข้อมูลบัญชีผู้ใช้</p>
                  <Image
                    src="/น้องพี.jfif"
                    width={150}
                    height={50}
                    alt="Picture of the author"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-4/6 p-2 ">
                <div className="border-b flex justify-between h-2/6 items-center p-3 px-5">
                  <DisplaytItem
                    title="ชื่อ-นามสกุล"
                    value={[items?.name, items?.lastname].join(" ")}
                  />
                  <DisplaytItem title="รหัสนักศึกษา" value={items?.studentId} />
                </div>
                <div className="border-b flex justify-between h-2/6 items-center p-3 px-5">
                  <DisplaytItem
                    title="บัตรประจำตัวประชาชน"
                    value={userIdFormatter(items?.cardId)}
                    color="text-blue-600"
                  />
                  <DisplaytItem title="เกรดเฉลี่ย" value={items?.grade} />
                </div>
                <div className=" flex h-2/6  p-3 px-5 justify-between items-center">
                  <DisplaytItem
                    title="เบอร์โทรศัพท์"
                    value={phoneFormatter(items?.phone)}
                    color="text-blue-600"
                  />
                  <div className="flex space-x-2 items-center">
                    <p className="text-xl font-semibold">
                      <GrMailOption />
                    </p>
                    <p className="text-lg"> : {items?.email}</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p className="text-xl font-semibold">
                      <FaLine />
                    </p>
                    <p className="text-lg"> : {items?.lineId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="font-bold text-2xl">
            <p>ประวัติทุนการศึกษา</p>
            <div className=" border rounded-md shadow-lg mb-3  mt-3 space-y-3 "></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
