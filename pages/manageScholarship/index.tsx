import Layout from '@/components/layout';
import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import dayjs from 'dayjs';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import {
    deleteScholarship,
    deletescholarshipParam,
    deletescholarshipRespone,
} from '@/dataService/deleteScholarship';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { BiCalendarPlus } from 'react-icons/bi';
import { Table, Select, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

dayjs.extend(buddhistEra);

export default function manageScholarship() {
    const router = useRouter();
    const [scholarshipdata, setScholarshipdata] = useState<scholarshipData[]>();
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    const [filterData, setfilterData] = useState<string>();
    const { mutate } = useMutation({
        mutationKey: 'deletescholarshipdata',
        mutationFn: async (value: deletescholarshipParam) => {
            return deleteScholarship(value);
        },
        onSuccess: (item: deletescholarshipRespone) => {
            Swal.fire('ลบสำเร็จ', '', 'success');
            setScholarshipdata(item.result);
        },
        onError: () => {
            Swal.fire('ลบไม่สำเร็จ', '', 'error');
        },
    });
    const removeScholarship = (scholarship_id: string): void => {
        Swal.fire({
            title: 'ต้องการลบทุนการศึกษา?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result: any) => {
            if (result.isConfirmed) {
                mutate({ scholarship_id: scholarship_id });
            }
        });
    };

    useEffect(() => {
        setScholarshipdata(scholarship?.result);
    }, [scholarship]); //ทำงานเมื่อเข้าสู่หน้าเว้บครั้งแรก หรือ จนกว่าจะเกิดการเปลี่ยนแปลง

    const columns: ColumnsType<scholarshipData> = [
        {
            title: 'ชื่อทุนการศึกษา',
            dataIndex: 'scholarship_name',
            key: 'scholarship_name',
        },
        {
            title: 'ปีการศึกษา',
            dataIndex: 'scholarship_year',
            key: 'scholarship_year',
        },
        {
            title: 'วันที่สิ้นสุดโครงการ',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (value: string) => (
                <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
            ),
        },
        {
            title: 'ประเภท',
            dataIndex: 'scholarship_type_name',
            key: 'scholarship_type_name',
            render: (value: string) => {
                if (value === 'ทุนภายใน') {
                    return <Tag color="blue">{value}</Tag>;
                } else {
                    return <Tag color="red">{value}</Tag>;
                }
            },
        },
        {
            title: 'แก้ไข',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (value: string) => (
                <div>
                    <FiEdit
                        className="cursor-pointer"
                        onClick={() => {
                            router.push(`/scholarship-detail/${value}`);
                        }}
                    />
                </div>
            ),
        },
        {
            title: 'ลบ',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (value: string) => (
                <div>
                    <MdDeleteOutline
                        className="text-red-600 text-xl cursor-pointer"
                        onClick={() => {
                            removeScholarship(value);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <Layout title="จัดการทุนการศึกษา">
            <div className="">
                <div className=" mx-auto lg:max-w-7xl pt-10 ">
                    <div className="flex flex-warp items-center">
                        <div className="w-full">
                            <div className="form-control w-full max-w-xs pb-5">
                                <label className="label">
                                    <span className="label-text">ประเภททุนการศึกษา</span>
                                </label>
                                <Select
                                    value={filterData}
                                    onChange={setfilterData}
                                    placeholder="เลือกประเภททุน"
                                >
                                    <Select.Option selected value="alltype">
                                        ทุกประเภท
                                    </Select.Option>
                                    <Select.Option value="in">ทุนภายใน</Select.Option>
                                    <Select.Option value="out">ทุนภายนอก</Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="btn btn-info text-white bg-blue-600 border-none hover:bg-blue-700"
                                onClick={() => {
                                    router.push('/addscholarship');
                                }}
                            >
                                <BiCalendarPlus className="text-white" /> เพิ่มทุน
                            </button>
                        </div>
                    </div>
                    <Table
                        dataSource={scholarshipdata}
                        columns={columns}
                        bordered
                        pagination={false}
                    />
                </div>
            </div>
        </Layout>
    );
}
