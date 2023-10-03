import Layout from '@/components/layout';
import { getScholarship } from '@/dataService/getscholarship';
import dayjs from 'dayjs';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { useQuery } from 'react-query';

dayjs.extend(buddhistEra);

export default function manageScholarship() {
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

    return (
        <Layout>
            <div className="w-full min-h-screen ">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <p className="font-semibold text-xl mb-5">จัดการทุนการศึกษา</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-lg w-full">
                            {/* head */}
                            <thead>
                                <tr className="bg-gray-200 ">
                                    <th className="w-2/6 pl-10">ชื่อทุนการศึกษา</th>
                                    <th className="w-2/6">ช่วงเวลาเปิด-ปิดรับสมัคร</th>
                                    <th className="w-1/6">แก้ไข</th>
                                    <th className="w-1/6">ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholarship?.result.map((item, index) => {
                                    return (
                                        <>
                                            {/* row 1 */}
                                            <tr key={index}>
                                                <td className="pl-10">{item.scname}</td>
                                                <td>
                                                    {dayjs(item.std)
                                                        .locale('th')
                                                        .format('DD MMMM BBBB') +
                                                        ' - ' +
                                                        dayjs(item.edd)
                                                            .locale('th')
                                                            .format('DD MMMM BBBB')}
                                                </td>
                                                <td className="text-xl">
                                                    <FiEdit
                                                        onClick={() => {
                                                            console.log();
                                                        }}
                                                    />
                                                </td>
                                                <td className="text-xl">
                                                    <MdDeleteOutline
                                                        onClick={() => {
                                                            console.log();
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
