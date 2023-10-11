import Layout from '@/components/layout';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DatePicker from '@/components/date_picker';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { Input } from 'antd';

export default function Addscholarship() {
    const fileTypes = ['PDF'];

    const [file, setFile] = useState(null);
    const handleChange = (file: any): void => {
        setFile(file);
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

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
                                    <Input type="text" placeholder="ปีการศึกษา" size="large" />
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg  w-2/5">
                                        ระยะเวลาเปิดรับสมัคร
                                    </span>
                                    <DatePicker.RangePicker
                                        showTime={{ format: 'HH:mm' }}
                                        format="YYYY-MM-DD HH:mm"
                                        style={{ width: '100%' }}
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
                                    <Input type="text" placeholder="ชั้นปี" size="large" />
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

                        <div className="flex justify-center space-x-5">
                            <button
                                type="submit"
                                className="py-3 rounded-md bg-[#0094FF] label-text text-lg text-white mt-10 w-full lg:w-1/4"
                            >
                                ยืนยัน
                            </button>
                            <button
                                type="submit"
                                className="py-3 rounded-md bg-[#ff0000] label-text text-lg text-white mt-10 w-full lg:w-1/4"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
