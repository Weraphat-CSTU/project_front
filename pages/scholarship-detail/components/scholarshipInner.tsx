import { getCalendar } from '@/dataService/getcalendar';
import { useQuery } from 'react-query';
import { getScholarship } from '@/dataService/getscholarship';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { getDate } from '@/utils/getDate';
import Fullcalendar from '@/components/fullcalendar';

export default function ScholarshipDetailInner() {
    const router = useRouter();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () =>
            getScholarship({ scholarship_id: Reflect.get(router.query, 'id') as string }),
    });

    const items = useMemo(() => scholarship?.result[0], [scholarship]);
    return (
        <div className="w-full h-screen">
            <div className="mx-auto max-w-3xl lg:max-w-7xl">
                <div className="w-full h-3/5 border rounded-md shadow-lg p-5 mb-3 mt-3 space-y-5">
                    <div className="flex">
                        <div className="w-1/4">ชื่อทุนการศึกษา</div>
                        <div className="w-3/4">{items?.scholarship_name}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">ปีการศึกษา</div>
                        <div className="w-3/4">{items?.scholarship_year}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">ระยะเวลาเปิดรับสมัคร</div>
                        <div className="w-3/4">{getDate(items?.start_date, items?.end_date)}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">เกรดเฉลี่ยขั้นต่ำ</div>
                        <div className="w-3/4">{items?.scholarship_grade}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">ชั้นปี</div>
                        <div className="w-3/4">{items?.class_type_name}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">เงื่อนไข</div>
                        <div className="w-3/4">{items?.scholarship_condition_name}</div>
                    </div>
                </div>
                <div className="w-full h-2/5 flex justify-between ">
                    <div className="w-2/4  border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 lg:mr-5">
                        <div className="text-2xl font-extrabold dark:text-white">
                            รายละเอียดเพิ่มเติม
                        </div>
                    </div>
                    <div className="w-full  lg:w-2/4  lg:ml-5 border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3">
                        <Fullcalendar />
                    </div>
                </div>
            </div>
        </div>
    );
}
