import Layout from '@/components/layout';
import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';
import dayjs from 'dayjs';
import { Tag } from 'antd';

import 'dayjs/locale/th';
import { getFollowScholarship } from '@/dataService/getfollowScholarship';

export default function Studentfollow() {
    const Router = useRouter();
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    const { data: followscholarship } = useQuery({
        queryKey: 'followscholarship',
        queryFn: async () => getFollowScholarship(),
    });
    return (
        <Layout title="ทุนการศึกษาที่กำลังติดตาม">
            <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                <div className="lg:flex w-full space-x-10 ">
                    {followscholarship?.result.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50 w-full max-h-screen"
                            onClick={() =>
                                Router.push(`/scholarship-detail/${item.scholarship_id}`)
                            }
                        >
                            <div className="font-semibold text-xl text-blue-500">
                                {item.scholarship_name}
                            </div>
                            <div className="font-normal text-[17px]">
                                {item.scholarship_type_name === 'ทุนภายใน' ? (
                                    <Tag color="blue">{item.scholarship_type_name}</Tag>
                                ) : (
                                    <Tag color="red">{item.scholarship_type_name}</Tag>
                                )}
                                ({item.scholarship_year})
                            </div>
                            <div>เวลาเปิดรับสมัคร : {getDate(item.start_date, item.end_date)}</div>
                            <div>
                                วันที่เริ่มติดตาม :{' '}
                                {dayjs(item.create_date).locale('th').format('DD MMMM BBBB')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
