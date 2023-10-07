import Layout2 from '@/components/layout2';
import { getScholarship } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

export default function Scholarshipall() {
    const Router = useRouter();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    return (
        <div className="w-full min-h-screen bg-[#f5f7fb]">
            <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                <p className="font-medium text-lg mb-5">ทุนการศึกษาที่กำลังดำเนินการ</p>
                {/* <div className=" border rounded-lg shadow-lg mb-3 mt-3 space-y-3 bg-white p-5">
                    {scholarship?.result.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                                onClick={() => Router.push(`/scholarship-detail/${index}`)}
                            >
                                <div className="font-semibold text-xl">{item.scholarship_name}</div>
                                <div className="font-normal text-[17px]">
                                    {item.scholarship_type_name} ({item.scholarship_year})
                                </div>
                                <div></div>
                            </div>
                        );
                    })}
                </div> */}
                <div className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer bg-white">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-lg w-full">
                            {/* head */}
                            <thead>
                                <tr className="bg-gray-200 ">
                                    <th className="w-7/12">ชื่อทุนการศึกษา</th>
                                    <th className="w-1/12 text-center">สถานะ</th>
                                    <th className="w-1/12 text-center">ปีการศึกษา</th>
                                    <th className="w-2/12 text-center">ระยะเวลาเปิดรับสมัคร</th>
                                    <th className="w-1/12 text-center">ประเภท</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholarship?.result.map((item, index) => {
                                    return (
                                        <>
                                            {/* row 1 */}
                                            <tr key={index}>
                                                <td
                                                    onClick={() =>
                                                        Router.push(`/scholarship-detail/${index}`)
                                                    }
                                                    className="text-blue-700"
                                                >
                                                    {item.scholarship_name}
                                                </td>
                                                <td className="text-center">กำลังพิจารณา</td>
                                                <td className="text-center">
                                                    {item.scholarship_year}
                                                </td>
                                                <td className="text-center">
                                                    {getDate(item.start_date, item.end_date)}
                                                </td>
                                                <td className="text-center">
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

                <div className=" border rounded-lg shadow-lg mb-3 mt-3 space-y-3 bg-white p-5">
                    <p className="font-medium text-lg mb-5">ทุนการศึกษาที่ผ่านมา</p>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-lg w-full">
                            {/* head */}
                            <thead>
                                <tr className="bg-gray-200 ">
                                    <th className="w-7/12">ชื่อทุนการศึกษา</th>
                                    <th className="w-1/12 text-center">ปีการศึกษา</th>
                                    <th className="w-1/12 text-center">วันที่สิ้นสุดโครงการ</th>
                                    <th className="w-1/12 text-center">ประเภท</th>
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
                                                <td className="text-center">
                                                    {item.scholarship_year}
                                                </td>
                                                <td className="text-center">
                                                    {dayjs(item.end_date)
                                                        .locale('th')
                                                        .format('DD MMMM BBBB')}
                                                </td>
                                                <td className="text-center">
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
        </div>
    );
}
