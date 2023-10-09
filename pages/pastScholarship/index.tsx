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
        <Layout title="ประวัติทุนการศึกษา">
            <div className="">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <div className="flex flex-warp">
                        <div className="w-full flex">
                            <div className="form-control w-full max-w-xs pb-5 lg:pr-5">
                                <label className="label">
                                    <span className="label-text">ประเภททุนการศึกษา</span>
                                </label>
                                <select className="select select-sm">
                                    <option disabled selected>
                                        ทุกประเภท
                                    </option>
                                    <option>ทุนภายใน</option>
                                    <option>ทุนภายนอก</option>
                                </select>
                            </div>
                            <div className="form-control w-full max-w-xs pb-5 lg:pl-5">
                                <label className="label">
                                    <span className="label-text">ปีการศึกษา</span>
                                </label>
                                <select className="select select-sm">
                                    <option disabled selected>
                                        ทุกปีการศึกษา
                                    </option>
                                    <option>ปีการศึกษา 2566</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <button
                                className="btn btn-info bg-green-400 border-none hover:bg-green-500"
                                onClick={() => {}}
                            >
                                กรอง
                            </button>
                        </div>
                    </div>
                    <div className="border shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer bg-white">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra table-lg w-full mt-3">
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
                                                <td className="flex justify-center">
                                                    {item.scholarship_type_name}
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
