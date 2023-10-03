import Layout from '@/components/layout';
import getMonth from '@/utils/getMonth';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getScholarship } from '@/dataService/getscholarship';

export default function HistoryScholarship() {
    const Router = useRouter();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

    return (
        <Layout>
            <div className="w-full min-h-screen ">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <p className="font-semibold text-xl mb-5">ประวัติทุนการศึกษา</p>
                    <div className="w-full pr-5 ">
                        <div className="flex justify-between items-center ">
                            <div className=" font-medium text-xl">ทุนการศึกษาที่กำลังดำเนินการ</div>
                            <div
                                className="text-blue-500 font-medium text-lg hover:underline cursor-pointer"
                                onClick={() => Router.push('/scholarshipAll')}
                            >
                                ทั้งหมด
                            </div>
                        </div>
                        <div className="w-full pt-5 pb-5">
                            {scholarship?.result.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                                        onClick={() => Router.push(`/scholarship-detail/${index}`)}
                                    >
                                        <div className="font-semibold text-xl">{item.scname}</div>
                                        <div className="font-normal text-[17px]">
                                            {item.sctype} ({item.scyear})
                                        </div>
                                        <div>{getMonth(item.std, item.edd)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
