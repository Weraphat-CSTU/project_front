import Layout2 from '@/components/layout2';
import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';
import dayjs from 'dayjs';
import { Table } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { ColumnsType } from 'antd/es/table';

export default function Scholarshipall() {
    const Router = useRouter();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
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
            title: 'ระยะเวลาเปิดรับสมัคร',
            dataIndex: 'start_date - end_date',
            key: 'start_date - end_date',
            render: (value: string) => (
                <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
            ),
        },
        {
            title: 'ประเภท',
            dataIndex: 'scholarship_type_name',
            key: 'scholarship_type_name',
        },
    ];
    const columnsPassscholarship: ColumnsType<scholarshipData> = [
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
        },
    ];
    return (
        <div className="w-full min-h-screen ">
            <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                <p className="font-medium text-lg mb-5">ทุนการศึกษาที่กำลังดำเนินการ</p>
                <Table
                    dataSource={scholarship?.result}
                    columns={columns}
                    bordered
                    pagination={false}
                />
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-lg w-full mt-3">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-200 ">
                                <th className="w-7/12">ชื่อทุนการศึกษา</th>
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

                                            <td className="text-center">{item.scholarship_year}</td>
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

                <p className="font-medium text-lg mb-5">ทุนการศึกษาที่ผ่านมา</p>
                <Table
                    dataSource={scholarship?.result}
                    columns={columnsPassscholarship}
                    bordered
                    pagination={false}
                />
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
                                    <>
                                        {/* row 1 */}
                                        <tr key={index}>
                                            <td className="text-blue-700">
                                                {item.scholarship_name}
                                            </td>
                                            <td className="text-center">{item.scholarship_year}</td>
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
    );
}
