import Layout from '@/components/layout';
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
import { Skeleton, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getStudent, studentInfoData } from '@/dataService/getStudent';

dayjs.extend(buddhistEra);

export default function ManageStudent() {
    const [studentdata, setStudentdata] = useState<studentInfoData[]>();

    const { data: studentinfo, isLoading: isLoadingStudent } = useQuery({
        queryKey: 'studentinfo',
        queryFn: async () => getStudent(),
    });

    const { mutate } = useMutation({
        mutationKey: 'updateuserstatus',
        mutationFn: async (values: updateUserStatusParam) => {
            return updateUserStatus(values);
        },
        onSuccess: (item: updateUserStatusRespone) => {
            Swal.fire('สถานะ', 'อัพเดตสถานะสำเร็จ', 'success');
            setStudentdata(item.result);
        },
        onError: () => {
            Swal.fire('สถานะ', 'อัพเดตสถานะไม่สำเร็จ', 'error');
        },
    });

    const changeStatus = (user_id: string): void => {
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
                mutate({ user_id: user_id });
            }
        });
    };

    useEffect(() => {
        setStudentdata(studentinfo?.result);
    }, [studentinfo]);
    const columns: ColumnsType<studentInfoData> = [
        // {
        //     title: 'ลำดับที่',
        //     dataIndex: 'user_id',
        //     key: 'user_id',
        //     render: (value: string) => <div>{value}</div>,
        // },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
            key: 'name',
            render: (_, value: studentInfoData) => (
                <div>
                    {value.firstname} {value.lastname}
                </div>
            ),
        },
        {
            title: 'รหัสนักศึกษา',
            dataIndex: 'login_id',
            key: 'login_id',
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
            dataIndex: 'user_id',
            key: 'user_id',
            render: (_, value: studentInfoData) => {
                return (
                    <div>
                        <label className="relative inline-flex items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                value="is_active"
                                className="sr-only peer"
                                checked={value.is_active === 'Y'}
                                onChange={() => {
                                    changeStatus(value.user_id);
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
            {isLoadingStudent ? (
                <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                    <Skeleton active />
                </div>
            ) : (
                <div className="">
                    <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                        <Table
                            dataSource={studentdata}
                            columns={columns}
                            bordered
                            pagination={false}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}
