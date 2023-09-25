import LayoutAdmin from '@/components/layoutAdmin';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useQuery } from 'react-query';
import { getCalendar } from '@/dataService/getcalendar';
import { getScholarship } from '@/dataService/getscholarship';
import getMonth from '@/utils/getMonth';

export default function Admin() {
    const Router = useRouter();

    const { data: Calendar } = useQuery({
        queryKey: 'calendar',
        queryFn: async () => getCalendar(),
    });

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    return (
        <LayoutAdmin>
            <div className="w-full h-screen ">
                <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-extrabold">ทุนการศึกษา</h1>
                        <h2 className="ml-2 font-semibold text-gray-500 dark:text-gray-400 text-lg pt-1">
                            สาขาวิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์
                        </h2>
                    </div>
                    <div className="flex pt-10">
                        <div className="w-full lg:w-2/5 pr-5 ">
                            <div className="flex justify-between items-center">
                                <div className=" font-medium text-xl">
                                    ทุนการศึกษาที่กำลังดำเนินการ
                                </div>
                                <div
                                    className="text-blue-500 font-medium text-lg hover:underline cursor-pointer"
                                    onClick={() => Router.push('/scholarship-all')}
                                >
                                    ทั้งหมด
                                </div>
                            </div>
                            <div className="w-full pt-5">
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
                                                {item.scname}
                                            </div>
                                            <div className="font-normal text-[17px]">
                                                {item.sctype} ({item.scyear})
                                            </div>
                                            <div>{getMonth(item.std, item.edd)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full lg:w-3/5  pl-5">
                            <div className="text-medium text-xl pb-5">ปฏิทันกำหนดการ</div>
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                locale={'th'}
                                initialView="dayGridMonth"
                                dayMaxEventRows={3}
                                events={Calendar?.result}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
