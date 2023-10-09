import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getScholarship } from '@/dataService/getscholarship';
import { getDate } from '@/utils/getDate';
import Fullcalendar from '@/components/fullcalendar';

export default function Scholarship() {
    const Router = useRouter();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });

    return (
        <Layout title="ทุนการศึกษา" subTitle="สาขาวิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์">
            <div className="">
                <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                    <div className="flex ">
                        <div className="w-full lg:w-2/5 pr-5 ">
                            <div className="flex justify-between items-center">
                                <div className=" font-medium text-xl">
                                    ทุนการศึกษาที่กำลังดำเนินการ
                                </div>
                                <div
                                    className="text-blue-500 font-medium text-lg hover:underline cursor-pointer"
                                    onClick={() => Router.push('/scholarshipAll')}
                                >
                                    ทั้งหมด
                                </div>
                            </div>
                            <div className="w-full pt-5 ">
                                {scholarship?.result.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                                            onClick={() =>
                                                Router.push(`/scholarship-detail/${index}`)
                                            }
                                        >
                                            <div className="font-semibold text-xl">
                                                {item.scholarship_name}
                                            </div>
                                            <div className="font-normal text-[17px]">
                                                {item.scholarship_type_name} (
                                                {item.scholarship_year})
                                            </div>
                                            <div>{getDate(item.start_date, item.end_date)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full lg:w-3/5 pl-5 ">
                            <div className="text-medium text-xl pb-5">ปฏิทันกำหนดการ</div>
                            <Fullcalendar />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
