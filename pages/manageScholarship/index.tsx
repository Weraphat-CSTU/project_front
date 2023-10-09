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

dayjs.extend(buddhistEra);

export default function manageScholarship() {
    const router = useRouter();
    const [scholarshipdata, setScholarshipdata] = useState<scholarshipData[]>();
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

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
    }, [scholarship]);
    return (
        <Layout title="จัดการทุนการศึกษา">
            <div className="">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <div className="flex justify-end">
                        <button
                            className="btn btn-info bg-cyan-400 border-none hover:bg-cyan-500"
                            onClick={() => {
                                router.push('/addscholarship');
                            }}
                        >
                            <BiCalendarPlus /> เพิ่มทุน
                        </button>
                    </div>
                    <div className="border shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer bg-white">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-lg w-full mt-3">
                                {/* head */}
                                <thead>
                                    <tr className="bg-gray-200 ">
                                        <th className="w-7/12">ชื่อทุนการศึกษา</th>
                                        <th className="w-1/12">ปีการศึกษา</th>
                                        <th className="w-1/12">วันที่สิ้นสุดโครงการ</th>
                                        <th className="w-1/12">ระดับ</th>
                                        <th className="w-1/12 text-center">แก้ไข</th>
                                        <th className="w-1/12 ">ลบ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scholarshipdata &&
                                        scholarshipdata?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-blue-700">
                                                        {item.scholarship_name}
                                                    </td>
                                                    <td>{item.scholarship_year}</td>
                                                    <td>
                                                        {dayjs(item.end_date)
                                                            .locale('th')
                                                            .format('DD MMMM BBBB')}
                                                    </td>
                                                    <td>{item.scholarship_type_name}</td>
                                                    <td className="text-xl flex justify-center">
                                                        <FiEdit onClick={() => {}} />
                                                    </td>
                                                    <td className="text-xl  ">
                                                        <MdDeleteOutline
                                                            className="text-red-600 "
                                                            onClick={(e) => {
                                                                removeScholarship(
                                                                    item.scholarship_id,
                                                                );
                                                            }}
                                                        />
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
