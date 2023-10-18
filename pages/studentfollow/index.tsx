import Layout from '@/components/layout';
import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';
import dayjs from 'dayjs';
import { Table, Tag } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { ColumnsType } from 'antd/es/table';
import { values } from 'lodash-es';

export default function Studentfollow() {
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
            render: (value: string) => {
                if (value === 'ทุนภายใน') {
                    return <Tag color="blue">{value}</Tag>;
                } else {
                    return <Tag color="red">{value}</Tag>;
                }
            },
        },
        {
            title: 'วันที่เริ่มติดตาม',
            dataIndex: 'create_date',
            key: 'create_date',
            render: (value: string) => (
                <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
            ),
        },
    ];

    return (
        <Layout title="ทุนการศึกษาที่กำลังติดตาม">
            <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                <div>ใส่ข้อมูลส่วนตัวดีมั้ย?</div>
                <div className="pt-5">
                    <Table
                        dataSource={scholarship?.result}
                        columns={columns}
                        bordered
                        pagination={false}
                    />
                </div>
            </div>
        </Layout>
    );
}
