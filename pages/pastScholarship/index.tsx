import Layout from '@/components/layout';
import { useQuery } from 'react-query';
import { getScholarship } from '@/dataService/getscholarship';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

dayjs.extend(buddhistEra);
export default function PastScholarship() {
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

    return (
        <Layout>
            <div className="w-full min-h-screen ">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <p className="font-semibold text-xl mb-5">ประวัติทุนการศึกษา</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-lg w-full">
                            {/* head */}
                            <thead>
                                <tr className="bg-gray-200 ">
                                    <th className="w-7/12">ชื่อทุนการศึกษา</th>
                                    <th className="w-1/12">ปีการศึกษา</th>
                                    <th className="w-1/12">วันที่สิ้นสุดโครงการ</th>
                                    <th className="w-1/12 text-center">ระดับ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholarship?.result.map((item, index) => {
                                    return (
                                        <>
                                            {/* row 1 */}
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
                                                <td className="flex justify-center">
                                                    {item.scholarship_type_name}
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
