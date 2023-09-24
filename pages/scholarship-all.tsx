import Layout2 from "@/components/layout2";
import { getScholarship } from "@/dataService/getscholarship";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import getMonth from "@/utils/getMonth";

export default function Scholarshipall() {
    const Router = useRouter();
    
    const { data: scholarship } = useQuery({
        queryKey: "scholarship",
        queryFn: async () => getScholarship(),
      });
  return (
    <Layout2>
      <div className="w-full min-h-screen bg-[#EFF1FE]">
        <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
            <p className="font-semibold text-2xl mb-5">ทุนการศึกษาที่กำลังดำเนินการ</p>
          <div className=" border rounded-lg shadow-lg mb-3 mt-3 space-y-3 bg-white p-5">
          {scholarship?.result.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                      onClick={() =>
                        Router.push(`/scholarship-detail/${index}`)
                      }
                    >
                      <div className="font-semibold text-xl">{item.scname}</div>
                      <div className="font-normal text-[17px]">
                        {item.sctype} ({item.scyear})
                      </div>
                      <div>{getMonth(item.std, item.edd)}</div>
                    </div>
                  );
                })}
          </div>

          <div className="font-bold text-2xl">
            <p>ทุนการศึกษาที่ผ่านมา</p>
            <div className=" border rounded-lg shadow-lg mb-3 mt-3 space-y-3 bg-white">
              <div className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50">ทุนการศึกษาที่ 1</div>
              <div className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50">ทุนการศึกษาที่ 2</div>
              <div className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50">ทุนการศึกษาที่ 3</div>
              <div className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50">ทุนการศึกษาที่ 4</div>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
