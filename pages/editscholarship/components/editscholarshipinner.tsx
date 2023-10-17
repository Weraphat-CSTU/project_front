import { getScholarship } from '@/dataService/getscholarship';

import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { getDate } from '@/utils/getDate';
import { FileUploader } from 'react-drag-drop-files';
import { DatePicker, Input, Select } from 'antd';

type filterDataType = {
    class_type_name?: string;
    schoalrship_year?: string;
};

export default function EditscholarshipInner() {
    const router = useRouter();

    const fileTypes = ['PDF'];
    const [filterData, setfilterData] = useState<filterDataType>();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () =>
            getScholarship({ scholarship_id: Reflect.get(router.query, 'id') as string }),
    });

    const [file, setFile] = useState(null);
    const handleChange = (file: any): void => {
        setFile(file);
    };

    const items = useMemo(() => scholarship?.result[0], [scholarship]);
    return (
        <div className="w-full h-screen">
            <div className="mx-auto max-w-3xl lg:max-w-7xl">
                <div className="w-full h-3/5 border rounded-md shadow-lg p-5 mb-3 mt-3 space-y-5">
                    <div className="font-medium text-lg p-10">
                        <label className="lebel">
                            <div className="flex items-center mt-3  w-full">
                                <span className="label-text text-lg w-2/5 ">ชื่อทุนการศึกษา</span>
                                <Input type="text" placeholder="ชื่อทุนการศึกษา" size="large" />
                            </div>
                        </label>
                        <label className="lebel">
                            <div className="flex items-center mt-3  w-full">
                                <span className="label-text text-lg w-2/5 ">ปีการศึกษา</span>
                                <Select
                                    value={filterData?.schoalrship_year}
                                    onChange={(value) => {
                                        setfilterData({
                                            ...filterData,
                                            schoalrship_year: value,
                                        });
                                    }}
                                    placeholder="เลือกปีการศึกษา"
                                    size="large"
                                    className="w-full"
                                >
                                    <Select.Option selected value="alltype">
                                        ทุกปีการศึกษา
                                    </Select.Option>
                                    <Select.Option value="2566">ปีการศึกษา 2566</Select.Option>
                                </Select>
                            </div>
                        </label>
                        <label className="lebel">
                            <div className="flex items-center mt-3  w-full">
                                <span className="label-text text-lg  w-2/5">
                                    ระยะเวลาเปิดรับสมัคร
                                </span>
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    format={'DD MMM BBBB'}
                                    size="large"
                                />
                            </div>
                        </label>
                        <label className="lebel">
                            <div className="flex items-center mt-3  w-full">
                                <span className="label-text text-lg  w-2/5">เกรดเฉลี่ยขั้นต่ำ</span>
                                <Input type="text" placeholder="เกรดเฉลี่ยขั้นต่ำ" size="large" />
                            </div>
                        </label>
                        <label className="lebel">
                            <div className="flex items-center mt-3 w-full">
                                <span className="label-text text-lg  w-2/5">ชั้นปี</span>
                                <Select
                                    value={filterData?.class_type_name}
                                    onChange={(value) => {
                                        setfilterData({
                                            ...filterData,
                                            class_type_name: value,
                                        });
                                    }}
                                    placeholder="เลือกชั้นปี"
                                    size="large"
                                    className="w-full"
                                >
                                    <Select.Option selected value="alltype">
                                        ทุกชั้นปี
                                    </Select.Option>
                                    <Select.Option value="in">เฉพาะชั้นปีที่ 1</Select.Option>
                                    <Select.Option value="out">เฉพาะชั้นปีที่ 2</Select.Option>
                                </Select>
                            </div>
                        </label>
                        <label className="lebel">
                            <div className="flex items-center mt-3  w-full">
                                <span className="label-text text-lg  w-2/5">เงื่อนไข</span>
                                <Input type="text" placeholder="เงื่อนไข" size="large" />
                            </div>
                        </label>
                        <label className="lebel">
                            <div className="flex items-center mt-3 w-full">
                                <span className="label-text text-lg  w-2/5">อัปโหลด</span>
                                <div className="w-full">
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                        className="w-full"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    {/* <div className="flex">
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
                    </div> */}
                </div>
                <div className="w-full h-2/5 flex justify-between ">
                    <div className="w-2/4  border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 lg:mr-5">
                        <div className="text-2xl font-extrabold dark:text-white">
                            รายละเอียดเพิ่มเติม
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
