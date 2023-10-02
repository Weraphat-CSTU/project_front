import Layout from '@/components/layout';
import { getuserinfo } from '@/dataService/getuserInfo';
import { useQuery } from 'react-query';

export default function ManageStudent() {
    const { data: userinfo } = useQuery({
        queryKey: 'userinfo',
        queryFn: async () => getuserinfo(),
    });

    return (
        <Layout>
            <div className="w-full min-h-screen ">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <p className="font-semibold text-2xl mb-5">จัดการนักศึกษา</p>
                    <div className="w-full h-3/5 border rounded-md shadow-lg p-3 mb-3 mt-3 space-y-5 ">
                        <div className="flex justify-between ">
                            <div className="font-medium ">ชื่อ-นามสกุล</div>
                            <div className="font-medium  text-center">รหัสนักศึกษา</div>
                            <div className="font-medium  text-center">เบอร์โทรศัพท์</div>
                            <div className="font-medium  text-center">วันที่สมัคร</div>
                            <div className="font-medium  text-center">สถานะ</div>
                        </div>
                        <hr />
                        {userinfo?.result.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex justify-between items-center  w-full"
                                >
                                    <div className="font-semibold ">
                                        {item.name} {item.lastname}
                                    </div>
                                    <div className="font-semibold ">{item.studentId}</div>
                                    <div className="font-semibold ">{item.phone}</div>
                                    <div className="font-semibold ">ไม่ต้องตกใจ</div>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-success"
                                        checked
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
