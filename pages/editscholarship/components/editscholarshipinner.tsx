import { getScholarship } from '@/dataService/getscholarship';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getDate } from '@/utils/getDate';
import { FileUploader } from 'react-drag-drop-files';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { HexColorPicker } from 'react-colorful';
import {
    createScholarshipPlayload,
    postCreateScholarship,
} from '@/dataService/postCreateScholarship';
import Swal from 'sweetalert2';

type filterDataType = {
    class_type_name?: string;
    schoalrship_year?: string;
};

interface createScholarshipForm extends createScholarshipPlayload {
    date_rang: Date[];
}

export default function EditscholarshipInner() {
    const Router = useRouter();

    const fileTypes = ['PDF'];
    const [filterData, setfilterData] = useState<filterDataType>();

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () =>
            getScholarship({ scholarship_id: Reflect.get(Router.query, 'id') as string }),
    });

    const [file, setFile] = useState(null);
    const handleChange = (file: any): void => {
        setFile(file);
    };

    const items = useMemo(() => scholarship?.result[0], [scholarship]);
    const { mutate, isLoading } = useMutation({
        mutationKey: 'createscholarship',
        mutationFn: async (result: createScholarshipPlayload) => {
            return postCreateScholarship(result);
        },
        onSuccess: () => {
            Swal.fire('เพิ่มทุนการศึกษา', 'คุณเพิ่มทุนการศึกษาสำเร็จ', 'success');
            Router.push('/manageScholarship');
        },
        onError: () => {
            Swal.fire('เพิ่มทุนการศึกษา', 'คุณเพิ่มทุนการศึกษาไม่สำเร็จ', 'error');
        },
    });

    const [color, setColor] = useState<string>();
    const [showcolor, setShowcolor] = useState<string>();

    const [form] = Form.useForm<createScholarshipForm>();

    const onHandleSubmit = (value: createScholarshipForm): void => {
        const normalResult: createScholarshipPlayload = {
            scholarship_name: value.scholarship_name,
            scholarship_year: value.scholarship_year,
            start_date: value.date_rang ? value.date_rang[0].toJSON() : undefined,
            end_date: value.date_rang ? value.date_rang[1].toJSON() : undefined,
            scholarship_grade: value.scholarship_grade,
            class_type_id: value.class_type_id,
            scholarship_type_id: value.scholarship_type_id,
            scholarship_condition_name: value.scholarship_condition_name,
            scholarship_qualification_name: value.scholarship_qualification_name,
            tag_color: value.tag_color,
        };
        console.log(normalResult);
        Swal.fire({
            title: 'ยืนยันเพิ่มทุนการศึกษาใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result: any) => {
            if (result.isConfirmed) {
                mutate(normalResult);
            }
        });
    };
    useEffect(() => {
        form.setFieldsValue({
            scholarship_name: scholarship?.result[0].scholarship_name,
            scholarship_year: scholarship?.result[0].scholarship_year,
            scholarship_grade: scholarship?.result[0].scholarship_grade,
            scholarship_condition_name: scholarship?.result[0].scholarship_condition_name,
            scholarship_type_id: scholarship?.result[0].scholarship_type_id,
            class_type_id: scholarship?.result[0].class_type_id,
            tag_color: scholarship?.result[0].tag_color,
        });
    }, [scholarship]);

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleOk = () => {
        form.setFieldValue('tag_color', color);
        setOpen(false);
    };
    return (
        <div className="w-full h-screen">
            <div className="mx-auto max-w-3xl lg:max-w-7xl">
                <div className="w-full h-3/5 border rounded-md shadow-lg p-5 mb-3 mt-3 space-y-5">
                    <Form form={form} onFinish={onHandleSubmit}>
                        <div className="font-medium text-lg p-10">
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg w-2/5 ">
                                        ชื่อทุนการศึกษา
                                    </span>

                                    <div className="w-full">
                                        <Form.Item
                                            name="scholarship_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกชื่อทุนการศึกษา!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="ชื่อทุนการศึกษา"
                                                size="large"
                                                allowClear
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg w-2/5 ">ปีการศึกษา</span>
                                    <div className="w-full">
                                        <Form.Item
                                            name="scholarship_year"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกปีการศึกษา!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                                placeholder="เลือกปีการศึกษา"
                                                size="large"
                                                className="w-full"
                                            >
                                                <Select.Option selected value={0}>
                                                    ทุกปีการศึกษา
                                                </Select.Option>
                                                <Select.Option value={1}>
                                                    ปีการศึกษา 2566
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg  w-2/5">
                                        ระยะเวลาเปิดรับสมัคร
                                    </span>
                                    <div className="w-full">
                                        <Form.Item
                                            name={'date_rang'}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกระยะเวลาเปิดรับสมัคร!',
                                                },
                                            ]}
                                        >
                                            <DatePicker.RangePicker
                                                style={{ width: '100%' }}
                                                format={'DD MMM BBBB'}
                                                size="large"
                                                allowClear
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg  w-2/5">
                                        ประเภททุนการศึกษา
                                    </span>
                                    <div className="w-full">
                                        <Form.Item
                                            name="scholarship_type_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณาเลือกประเภททุน!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                                placeholder="เลือกประเภททุน"
                                                size="large"
                                                className="w-full"
                                            >
                                                <Select.Option selected value={1}>
                                                    ทุนภายใน
                                                </Select.Option>
                                                <Select.Option value={2}>ทุนภายนอก</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg  w-2/5">
                                        เกรดเฉลี่ยขั้นต่ำ
                                    </span>
                                    <div className="w-full">
                                        <Form.Item
                                            name="scholarship_grade"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกเกรดเฉลี่ยขั้นต่ำ!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="เกรดเฉลี่ยขั้นต่ำ"
                                                size="large"
                                                allowClear
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3 w-full">
                                    <span className="label-text text-lg  w-2/5">ชั้นปี</span>
                                    <div className="w-full">
                                        <Form.Item
                                            name="class_type_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกชั้นปี!',
                                                },
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                                placeholder="เลือกชั้นปี"
                                                size="large"
                                                className="w-full"
                                            >
                                                <Select.Option selected value={0}>
                                                    ทุกชั้นปี
                                                </Select.Option>
                                                <Select.Option value={1}>
                                                    เฉพาะชั้นปีที่ 1
                                                </Select.Option>
                                                <Select.Option value={2}>
                                                    เฉพาะชั้นปีที่ 2
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3 w-full">
                                    <span className="label-text text-lg  w-2/5">แท็กสี</span>
                                    <div className="flex w-full space-x-5 ">
                                        <div>
                                            <Form.Item
                                                name={'tag_color'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณาเลือกแท็กสี!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="กรอกแท็กสี เช่น #e85ff8"
                                                    size="large"
                                                    onChange={(event) => {
                                                        setShowcolor(event.target.value);
                                                    }}
                                                />
                                            </Form.Item>
                                            <a className="text-blue-600" onClick={showModal}>
                                                คลิกเพื่อเลือกแท็กสี
                                            </a>
                                        </div>
                                        <div
                                            className={
                                                showcolor ? 'w-7 h-7 rounded-md mt-[5px]' : 'hidden'
                                            }
                                            style={{ backgroundColor: showcolor }}
                                        ></div>
                                    </div>
                                    <Modal
                                        open={open}
                                        footer={null}
                                        onCancel={handleCancel}
                                        centered
                                    >
                                        <div className="mt-10">
                                            <HexColorPicker
                                                color={color}
                                                onChange={setColor}
                                                style={{ width: '100%', height: 200 }}
                                                defaultValue={'#ffffff'}
                                            />
                                            <div className="flex justify-center">
                                                <div
                                                    className=" mt-3 inline-block text-white px-3 rounded-md"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    กรุณาคัดลอกหมายเลขสี = {color}
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </label>
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg  w-2/5">เงื่อนไข</span>
                                    <div className="w-full">
                                        <Form.Item
                                            name="scholarship_condition_name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกเงื่อนไข!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="เงื่อนไข" size="large" allowClear />
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
                            {/* <label className="lebel">
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
                                </label> */}
                        </div>
                        <div className="flex justify-center ">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-[#08a479] px-8 py-2 rounded-lg"
                            >
                                บันทึก
                            </Button>
                        </div>
                    </Form>
                    {/* <div className="w-full h-2/5 flex justify-between ">
                    <div className="w-2/4  border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 lg:mr-5">
                        <div className="text-2xl font-extrabold dark:text-white">
                            รายละเอียดเพิ่มเติม
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    );
}
