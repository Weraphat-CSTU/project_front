import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';
import dayjs from 'dayjs';
import { Table, Tag, message } from 'antd';
import 'dayjs/locale/th';
import { ColumnsType } from 'antd/es/table';
import { getHistoryScholarship, historyscholarshipData } from '@/dataService/gethistoryScholarship';
import { getScholarshipComing, scholarshipComingData } from '@/dataService/getScholarshipComing';
import { BsPencilSquare } from 'react-icons/bs';
import {
    alertEmailScholarshipPlayloadParam,
    postAlertScholarship,
} from '@/dataService/postAlertScholarship';

export default function Scholarshipall() {
    const Router = useRouter();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    const { data: scholarshipcoming } = useQuery({
        queryKey: 'scholarshipcoming',
        queryFn: async () => getScholarshipComing(),
    });
    const { data: historyscholarship } = useQuery({
        queryKey: 'historyscholarship',
        queryFn: async () => getHistoryScholarship(),
    });
    const { mutate, isLoading: isLoadingSubscribe } = useMutation({
        mutationKey: ['alertemailscholarship', Router.query.id],
        mutationFn: async (data: { param: alertEmailScholarshipPlayloadParam }) => {
            return postAlertScholarship(data.param);
        },
        onMutate: () => {
            message.loading('กำลังโหลด');
        },
        onSuccess: () => {
            message.success('คุณส่งอีเมลแจ้งเตือนสำเร็จ');
        },
        onError: () => {
            message.error('คุณส่งอีเมลแจ้งเตือนไม่สำเร็จ');
        },
    });

    const onHandleAlert = (value: alertEmailScholarshipPlayloadParam): void => {
        const normalResult: alertEmailScholarshipPlayloadParam = {
            scholarship_id: value.scholarship_id,
        };

        mutate({ param: normalResult });
    };
    const columns: ColumnsType<scholarshipData> = [
        {
            title: 'ชื่อทุนการศึกษา',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (_, value: scholarshipData) => (
                <a
                    className="cursor-pointer text-blue-500"
                    onClick={() => Router.push(`/scholarship-detail/${value.scholarship_id}`)}
                >
                    {value.scholarship_name}
                </a>
            ),
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
            title: 'แจ้งเตือนทุนเปิดใหม่',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (value: string) => (
                <button
                    className="btn btn-error text-white bg-red-600 border-none hover:bg-red-700 "
                    onClick={() => {
                        onHandleAlert({ scholarship_id: value });
                    }}
                >
                    <BsPencilSquare className="text-white " />
                </button>
            ),
        },
    ];
    const columnsScholarshipComing: ColumnsType<scholarshipComingData> = [
        {
            title: 'ชื่อทุนการศึกษา',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (_, value: scholarshipComingData) => (
                <a
                    className="cursor-pointer text-blue-500"
                    onClick={() => Router.push(`/scholarship-detail/${value.scholarship_id}`)}
                >
                    {value.scholarship_name}
                </a>
            ),
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
            render: (_, value: scholarshipComingData) => (
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
    ];
    const columnsHistoryscholarship: ColumnsType<historyscholarshipData> = [
        {
            title: 'ชื่อทุนการศึกษา',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (_, value: historyscholarshipData) => (
                <a
                    className="cursor-pointer text-blue-500"
                    onClick={() => Router.push(`/scholarship-detail/${value.scholarship_id}`)}
                >
                    {value.scholarship_name}
                </a>
            ),
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
    ];
    return (
        <div className="w-full min-h-screen ">
            <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                <p className="font-semibold text-lg mb-5">ทุนการศึกษาที่เปิดรับสมัคร</p>
                <Table
                    dataSource={scholarship?.result}
                    columns={columns}
                    bordered
                    pagination={false}
                />

                <p className="font-semibold text-lg mb-5 pt-5">
                    ทุนการศึกษาที่จะเปิดรับสมัครเร็ว ๆ นี้
                </p>
                <Table
                    dataSource={scholarshipcoming?.result}
                    columns={columnsScholarshipComing}
                    bordered
                    pagination={false}
                />

                <p className="font-semibold text-lg mb-5 pt-5">ทุนการศึกษาที่ปิดรับสมัคร</p>
                <Table
                    dataSource={historyscholarship?.result}
                    columns={columnsHistoryscholarship}
                    bordered
                    pagination={false}
                    className="mb-10"
                />
            </div>
        </div>
    );
}
