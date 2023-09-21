import Layout from "@/components/layout";
import InputMask from "react-input-mask";
export default function historyscholarship() {
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
          <div className="font-bold text-2xl">
            ประวัตินักศึกษา
            <div className="h-[500px] border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"></div>
          </div>
          <div className="font-bold text-2xl">
            ประวัติทุนการศึกษา
            <div className="h-[300px] border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
