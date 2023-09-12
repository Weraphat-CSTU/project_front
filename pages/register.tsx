import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function register() {
  const Router = useRouter();
  return (
    <div className="flex flex-warp">
      <div className="w-full h-screen">
        <Image
          src="/login.jpg"
          width={2000}
          height={1000}
          alt="Picture of the author"
          className="h-screen w-full object-cover "
        />
      </div>
      <div className="w-full h-screen bg-white ">
        <h1 className="font-medium text-4xl mt-3 text-center pr-10">
          ลงทะเบียน
        </h1>
        <div className="flex justify-center mt-10">
          <div className="form-control w-full max-w-xl">
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

            <label className="label">
              <span className="label-text text-xl mt-5 ">
                บัตรประจำตัวประชาชน
              </span>
            </label>
            <input
              type="text"
              placeholder="กรอกบัตรประจำตัวประชาชน"
              className="input input-bordered w-full max-w-xl"
            />
            <label className="label">
              <span className="label-text text-xl mt-5 ">รหัสนักศึกษา</span>
            </label>
            <input
              type="text"
              placeholder="กรอกรหัสนักศึกษา"
              className="input input-bordered w-full max-w-xl"
            />

            <div className="flex justify-between">
              <div>
                <label className="label">
                  <span className="label-text text-xl mt-3">เบอร์โทรศัพท์</span>
                </label>
                <input
                  type="text"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  className="input input-bordered w-full max-w-xl"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl mt-3">อีเมล</span>
                </label>
                <input
                  type="text"
                  placeholder="กรอกอีเมล"
                  className="input input-bordered w-full max-w-xl"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="label">
                  <span className="label-text text-xl mt-3">ไอดีไลน์</span>
                </label>
                <input
                  type="text"
                  placeholder="กรอกไอดีไลน์"
                  className="input input-bordered w-full max-w-xl"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl mt-3">เกรดเฉลี่ย</span>
                </label>
                <input
                  type="text"
                  placeholder="กรอกเกรดเฉลี่ย"
                  className="input input-bordered w-full max-w-xl"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="label">
                  <span className="label-text text-xl mt-3">รหัสผ่าน</span>
                </label>
                <input
                  type="text"
                  placeholder="กรอกรหัสผ่าน"
                  className="input input-bordered w-full max-w-xl"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xl mt-3">
                    ยืนยันรหัสผ่าน
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="กรอกยืนยันรหัสผ่าน"
                  className="input input-bordered w-full max-w-xl"
                />
              </div>
            </div>
            <button
              className="py-3 rounded-md bg-[#0094FF] label-text text-xl text-white mt-10"
              onClick={() => Router.push("/login")}
            >
              ยืนยัน
            </button>
            <Link
              href={"/"}
              className="text-lg font-bold text-blue-500 hover:underline mt-10 text-center"
            >
              กลับสู่หน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
