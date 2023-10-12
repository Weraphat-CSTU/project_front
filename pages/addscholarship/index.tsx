import Layout from '@/components/layout';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import DatePicker from '@/components/date_picker';
import { Button, DatePicker, Select } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { Input } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { getScholarship } from '@/dataService/getscholarship';
import { useQuery } from 'react-query';

dayjs.extend(buddhistEra);
type filterDataType = {
    class_type_name?: string;
    schoalrship_year?: string;
};
export default function Addscholarship() {
    const fileTypes = ['PDF'];
    const [filterData, setfilterData] = useState<filterDataType>();
    const [file, setFile] = useState(null);
    const handleChange = (file: any): void => {
        setFile(file);
    };
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    //     // Can not select days before today and today
    //     return current && current < dayjs().locale('th').endOf('day');
    // };

    return (
        <Layout title="จัดการทุกการศึกษา" subTitle="เพิ่มทุนการศึกษา">
            <div className="">
                <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                    <div className="w-full h-3/5 border rounded-md shadow-lg p-3 mb-3 mt-3 space-y-5 bg-white">
                        <div className="font-medium text-lg p-10">
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg w-2/5 ">
                                        ชื่อทุนการศึกษา
                                    </span>
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
                                    <span className="label-text text-lg  w-2/5">
                                        เกรดเฉลี่ยขั้นต่ำ
                                    </span>
                                    <Input
                                        type="text"
                                        placeholder="เกรดเฉลี่ยขั้นต่ำ"
                                        size="large"
                                    />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3 w-full">
                                    <span className="label-text text-lg  w-2/5">ชั้นปี</span>
                                    <Select
                                        value={filterData?.schoalrship_year}
                                        onChange={(value) => {
                                            setfilterData({
                                                ...filterData,
                                                schoalrship_year: value,
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

                        <div className="flex justify-center ">
                            <button
                                type="submit"
                                className="text-white bg-[#08a479] px-8 py-2 rounded-lg"
                            >
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
