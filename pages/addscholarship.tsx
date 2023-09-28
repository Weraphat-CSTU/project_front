import Layout from '@/components/layout';

export default function Addscholarship() {
    return (
        <Layout>
            <div className="w-full h-screen">
                <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                    <div className="w-full h-3/5 border rounded-md shadow-lg p-3 mb-3 mt-3 space-y-5 ">
                        <h1 className="font-bold text-2xl">เพิ่มทุนการศึกษา</h1>
                        <div className="font-semibold text-lg p-10">
                            <label className="label">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-xl w-2/5 ">
                                        ชื่อทุนการศึกษา
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="ชื่อทุนการศึกษา"
                                        className="w-full input input-bordered "
                                    />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-xl w-2/5 ">ปีการศึกษา</span>
                                    <input
                                        type="text"
                                        placeholder="ปีการศึกษา"
                                        className="w-full input input-bordered "
                                    />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-xl  w-2/5">
                                        ระยะเวลาเปิดรับสมัคร
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="ระยะเวลาเปิดรับสมัคร"
                                        className="w-full input input-bordered "
                                    />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-xl  w-2/5">
                                        เกรดเฉลี่ยขั้นต่ำ
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="เกรดเฉลี่ยขั้นต่ำ"
                                        className="w-full input input-bordered "
                                    />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3 w-full">
                                    <span className="label-text text-xl  w-2/5">ชั้นปี</span>
                                    <input
                                        type="text"
                                        placeholder="ชั้นปี"
                                        className="w-full input input-bordered "
                                    />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-xl  w-2/5">เงื่อนไข</span>
                                    <input
                                        type="text"
                                        placeholder="เงื่อนไข"
                                        className="w-full input input-bordered "
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-center space-x-5">
                            <button
                                type="submit"
                                className="py-3 rounded-md bg-[#0094FF] label-text text-xl text-white mt-10 w-full lg:w-1/4"
                            >
                                ยืนยัน
                            </button>
                            <button
                                type="submit"
                                className="py-3 rounded-md bg-[#ff0000] label-text text-xl text-white mt-10 w-full lg:w-1/4"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
