import Layout from '@/components/layout';
import { getInfomation } from '@/dataService/getinformation';
import { Pagination } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { useQuery } from 'react-query';

dayjs.extend(buddhistEra);

export default function Announcements() {
    const { data: information, isLoading: isLoadingInfo } = useQuery({
        queryKey: 'information',
        queryFn: async () => getInfomation(),
    });
    return (
        <Layout title="ข่าวประชาสัมพันธ์">
            <div className="">
                <div className=" mx-auto  lg:max-w-7xl pt-10 px-5 lg:px-0">
                    <Pagination
                        defaultCurrent={6}
                        total={3}
                        showSizeChanger
                        className="flex justify-end"
                    />
                    {information?.result.map((item, index) => (
                        <div key={index} className="w-full  p-5 rounded-md shadow-md mt-5 border">
                            <div className="font-semibold text-2xl">{item.title}</div>
                            <div className="mt-5 text-lg"> {item.description}</div>
                            <div className="mt-5 text-lg">
                                วันที่ประกาศ :{' '}
                                {dayjs(item.create_date).locale('th').format('DD MMMM BBBB')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
