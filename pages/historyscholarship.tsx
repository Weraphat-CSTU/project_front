import Layout from "@/components/layout";
import InputMask from "react-input-mask";
export default function historyscholarship() {
  return (
    <Layout>
      <div className="w-full h-screen  ">
        <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
          <div className="font-bold text-2xl">ประวัติทุนการศึกษา</div>
          <div className=" flex justify-center">
            <div className="form-control w-full max-w-xl ">
              <div className="flex justify-between">
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">ชื่อจริง</span>
                  </label>
                  <input
                    type="text"
                    placeholder="กรอกชื่อจริง"
                    className="input input-bordered w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-xl mt-3">นามสกุล</span>
                  </label>
                  <input
                    type="text"
                    placeholder="กรอกนามสกุล"
                    className="input input-bordered w-full max-w-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
          <label className="label">
            <span className="label-text text-xl mt-3">เบอร์โทรศัพท์</span>
          </label>
          <InputMask
            mask="999-999-9999"
            maskChar={null}
            placeholder="กรอกเบอร์โทรศัพท์"
            className="input input-bordered w-full max-w-xl"
          />
          </div>
        </div>
      </div>
    </Layout>
  );
}
