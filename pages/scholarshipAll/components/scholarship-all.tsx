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
            dataIndex: 'start_date-end_date',
            key: 'start_date',
            render: (_, value: scholarshipData) => (
                <div>{getDate(value.start_date, value.end_date)}</div>
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

                <p className="font-medium text-lg mb-5 pt-5">
                    ทุนการศึกษาที่จะเปิดรับสมัครเร็ว ๆ นี้
                </p>
                <Table columns={columns} bordered pagination={false} />

                <p className="font-medium text-lg mb-5 pt-5">ทุนการศึกษาที่ผ่านมา</p>
                <Table
                    dataSource={scholarship?.result}
                    columns={columnsPassscholarship}
                    bordered
                    pagination={false}
                />
            </div>
        </div>
    );
}
