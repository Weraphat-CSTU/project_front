import Layout from "@/components/layout";
import { getuserinfo, userInfoData } from "@/dataService/getuserInfo";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputMask, { InputState } from "react-input-mask";
import { useQuery } from "react-query";
import { Input } from "antd";
import InputWithFormat from "@/components/input-mask";
export default function history() {
  const { register, setValue } = useForm<userInfoData>();

  const { data: userinfo } = useQuery({
    queryKey: "userinfo",
    queryFn: async () => getuserinfo(),
  });
  useEffect(() => {
    userinfo &&
      Object.entries(userinfo.result[0]).forEach(([key, value]: any) => {
        setValue(key, value);
      });
  }, [userinfo]);

  return (
    <Layout>
      <div className="w-full h-screen  ">
        <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
          <div className="font-bold text-2xl">ประวัตินักศึกษา</div>
          <div className="flex justify-center mt-10">
            <div className="form-control w-full max-w-xl">
              <div className="flex justify-between">
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">ชื่อจริง</span>
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="กรอกชื่อจริง"
                    className="input input-bordered w-full max-w-xl"
                    {...register("name")}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">นามสกุล</span>
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="กรอกนามสกุล"
                    className="input input-bordered w-full max-w-xl"
                    {...register("lastname")}
                  />
                </div>
              </div>
              <label className="label">
                <span className="label-text text-xl mt-5 ">
                  บัตรประจำตัวประชาชน
                </span>
              </label>
              <input
                    disabled
                    type="text"
                    placeholder="กรอกบัตรประจำตัวประชาชน"
                    className="input input-bordered w-full max-w-xl"
                    {...register("cardId")}
                  />

              <label className="label">
                <span className="label-text text-xl mt-5 ">รหัสนักศึกษา</span>
              </label>
              <input
                    disabled
                    type="text"
                    placeholder="กรอกรหัสนักศึกษา"
                    className="input input-bordered w-full max-w-xl"
                    {...register("studentId")}
                  />
              
              <div className="flex justify-between">
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">
                      เบอร์โทรศัพท์
                    </span>
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className="input input-bordered w-full max-w-xl"
                    {...register("phone")}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">อีเมล</span>
                  </label>
                  <input
                    disabled
                    type="email"
                    placeholder="กรอกอีเมล"
                    className="input input-bordered w-full max-w-xl"
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">ไอดีไลน์</span>
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="กรอกไอดีไลน์"
                    className="input input-bordered w-full max-w-xl"
                    {...register("lineId")}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">เกรดเฉลี่ย</span>
                  </label>
                  <input
                    disabled
                    type="number"
                    max={4}
                    maxLength={4}
                    placeholder="กรอกเกรดเฉลี่ย"
                    className="input input-bordered w-full max-w-xl"
                    {...register("grade")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
