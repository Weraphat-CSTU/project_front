import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { getDate } from '@/utils/getDate';
import { getScholarshipID } from '@/dataService/getScholarshipID';
import FullcalendarID from '@/components/fullcalendarID';
import { Skeleton } from 'antd';

export default function ScholarshipDetailInner() {
    const router = useRouter();

    const { data: scholarshipID, isLoading: isLoadingScholarshipID } = useQuery({
        queryKey: ['scholarshipID', router.query.id],
        queryFn: async () =>
            getScholarshipID({
                scholarship_id: router.query.id as string,
                //Reflect.get(router.query, 'id') as string,
            }),
    });

    const items = useMemo(() => scholarshipID?.result[0], [scholarshipID]);
    const inputText = items?.scholarship_qualification;

    // ใช้ regex เพื่อ split เมื่อพบตัวเลขที่ขึ้นต้นด้วย "1."
    const splittedArray = inputText?.split(/(?=\d+\.\s)/);

    // ลบส่วนว่างที่อาจเกิดขึ้นจากการ split ที่เป็นประโยคแรก
    const filteredArray = splittedArray?.filter((item) => item.trim() !== '');

    return (
        <>
            {isLoadingScholarshipID ? (
                <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                    <Skeleton active />
                </div>
            ) : (
                <div className="w-full ">
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
                                <div className="w-3/4">
                                    {getDate(items?.start_date, items?.end_date)}
                                </div>
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
                                <div className="w-3/4">{items?.scholarship_condition}</div>
                            </div>
                        </div>
                        <div className="w-full h-2/5 flex justify-between ">
                            <div className="w-2/4  border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 lg:mr-5">
                                <div className="text-2xl font-extrabold dark:text-white">
                                    รายละเอียดเพิ่มเติม
                                </div>
                                <div className="">{filteredArray}</div>
                            </div>
                            <div className="w-full  lg:w-2/4  lg:ml-5 border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3">
                                <FullcalendarID />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
