import Layout from '@/components/layout';
import { getuserinfo, userInfoData } from '@/dataService/getuserInfo';
import {
    updateUserStatus,
    updateUserStatusParam,
    updateUserStatusRespone,
} from '@/dataService/updateUserStatus';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

dayjs.extend(buddhistEra);

export default function ManageStudent() {
    const [userdata, setUserdata] = useState<userInfoData[]>();

    const { data: userinfo } = useQuery({
        queryKey: 'userinfo',
        queryFn: async () => getuserinfo(),
    });

    const { mutate } = useMutation({
        mutationKey: 'updateuserstatus',
        mutationFn: async (values: updateUserStatusParam) => {
            return updateUserStatus(values);
        },
        onSuccess: (item: updateUserStatusRespone) => {
            Swal.fire('สถานะ', 'อัพเดตสถานะสำเร็จ', 'success');
            setUserdata(item.result);
        },
        onError: () => {
            Swal.fire('สถานะ', 'อัพเดตสถานะไม่สำเร็จ', 'error');
        },
    });

    const changeStatus = (isActive: boolean, userId: string): void => {
        Swal.fire({
            title: 'ยืนยันการเปลี่ยนสถานะ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result: any) => {
            if (result.isConfirmed) {
                mutate({ is_active: isActive ? 'Y' : 'N', userId: userId });
            }
        });
    };

    useEffect(() => {
        setUserdata(userinfo?.result);
    }, [userinfo]);

    return (
        <Layout title="จัดการนักศึกษา">
            <div className="">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <div className="border shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer bg-white">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-lg w-full mt-3">
                                {/* head */}
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th>ลำดับที่</th>
                                        <th>ชื่อ-นามสกุล</th>
                                        <th>รหัสนักศึกษา</th>
                                        <th>เบอร์โทรศัพท์</th>
                                        <th>วันที่สมัคร</th>
                                        <th>สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userdata &&
                                        userdata?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item.name} {item.lastname}
                                                    </td>
                                                    <td>{item.studentId}</td>
                                                    <td>{item.phone}</td>
                                                    <td>
                                                        {dayjs(item.create_date)
                                                            .locale('th')
                                                            .format('DD MMMM BBBB')}
                                                    </td>
                                                    <td>
                                                        <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                value=""
                                                                className="sr-only peer"
                                                                checked={
                                                                    item.is_active === 'Y'
                                                                        ? true
                                                                        : false
                                                                }
                                                                onChange={(e) => {
                                                                    changeStatus(
                                                                        e.target.checked,
                                                                        item.userId,
                                                                    );
                                                                }}
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                            {item.is_active === 'Y' ? (
                                                                <span className="ml-3 text-sm font-medium text-green-500 dark:text-gray-300">
                                                                    เปิดการใช้งาน
                                                                </span>
                                                            ) : (
                                                                <span className="ml-3 text-sm font-medium text-red-600 dark:text-gray-300">
                                                                    ปิดการใช้งาน
                                                                </span>
                                                            )}
                                                        </label>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
