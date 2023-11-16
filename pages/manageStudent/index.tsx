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
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

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

    const changeStatus = (isActive: boolean, user_id: string): void => {
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
                mutate({ is_active: isActive ? 'Y' : 'N', user_id: user_id });
            }
        });
    };

    useEffect(() => {
        setUserdata(userinfo?.result);
    }, [userinfo]);
    const columns: ColumnsType<userInfoData> = [
        {
            title: 'ลำดับที่',
            dataIndex: 'userId',
            key: 'userId',
            render: (value: string) => <div>{value}</div>,
        },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
            key: 'name',
            render: (_, value: userInfoData) => (
                <div>
                    {value.firstname} {value.lastname}
                </div>
            ),
        },
        {
            title: 'รหัสนักศึกษา',
            dataIndex: 'studentId',
            key: 'studentId',
            render: (value: string) => <div>{value}</div>,
        },
        {
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'phone',
            key: 'phone',

            render: (value: string) => <div> {value}</div>,
        },
        {
            title: 'วันที่สมัคร',
            dataIndex: 'create_date',
            key: 'create_date',
            render: (value: string) => (
                <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
            ),
        },
        {
            title: 'สถานะ',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_, value: userInfoData) => {
                return (
                    <div>
                        <label className="relative inline-flex items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={value.is_active === 'Y'}
                                onChange={(e) => {
                                    changeStatus(e.target.checked, value.user_id);
                                }}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            {value.is_active === 'Y' ? (
                                <span className="ml-3 text-sm font-medium text-green-500 dark:text-gray-300">
                                    เปิดการใช้งาน
                                </span>
                            ) : (
                                <span className="ml-3 text-sm font-medium text-red-600 dark:text-gray-300">
                                    ปิดการใช้งาน
                                </span>
                            )}
                        </label>
                    </div>
                );
            },
        },
    ];
    return (
        <Layout title="จัดการนักศึกษา">
            <div className="">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <Table dataSource={userdata} columns={columns} bordered pagination={false} />
                </div>
            </div>
        </Layout>
    );
}
