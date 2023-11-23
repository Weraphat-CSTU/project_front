import Layout from '@/components/layout';
import { getuserinfo, userInfoData } from '@/dataService/getuserInfo';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { Table } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { useEffect, useState } from 'react';
import { BiCalendarPlus, BiMessageError } from 'react-icons/bi';
import { useRouter } from 'next/router';
import 'dayjs/locale/th';
import { getStudent, studentInfoData } from '@/dataService/getStudent';

dayjs.extend(buddhistEra);

export default function Followscholarship() {
    const rounter = useRouter();
    const [studentdata, setStudentdata] = useState<studentInfoData[]>();

    const { data: studentfollowScholarship } = useQuery({
        queryKey: 'studentfollowScholarship',
        queryFn: async () => getStudent(),
    });
    useEffect(() => {
        setStudentdata(studentfollowScholarship?.result);
    }, [studentfollowScholarship]);
    const columns: ColumnsType<studentInfoData> = [
        // {
        //     title: 'ลำดับที่',
        //     dataIndex: 'userId',
        //     key: 'userId',
        //     render: (value: string) => <div>{value}</div>,
        // },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
            key: 'name',
            render: (_, value: studentInfoData) => (
                <div>
                    {value.firstname} {value.lastname}
                </div>
            ),
        },
        {
            title: 'รหัสนักศึกษา',
            dataIndex: 'login_id',
            key: 'login_id',
            render: (value: string) => <div>{value}</div>,
        },
        {
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'phone',
            key: 'phone',

            render: (value: string) => <div> {value}</div>,
        },
        // {
        //     title: 'วันที่ติดตามทุน',
        //     dataIndex: 'create_date',
        //     key: 'create_date',
        //     // render: (value: string) => (
        //     //     <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
        //     // ),
        // },
        {
            title: 'ทุนการศึกษาที่กำลังติดตาม',
            dataIndex: 'user_id',
            key: 'user_id',
            render: () => {
                return (
                    <button
                        className="btn btn-info text-white bg-blue-600 border-none hover:bg-blue-700"
                        onClick={() => {
                            rounter.push('/studentfollow');
                        }}
                    >
                        <BiCalendarPlus className="text-white" />{' '}
                        <div className="pl-3">ทุนการศึกษาที่กำลังติดตาม</div>
                    </button>
                );
            },
        },
    ];
    return (
        <Layout title="นักศึกษาที่กำลังติดตามทุนการศึกษา">
            <div className="mx-auto lg:max-w-7xl pt-10">
                <div>
                    <Table dataSource={studentdata} columns={columns} bordered pagination={false} />
                </div>
            </div>
        </Layout>
    );
}
