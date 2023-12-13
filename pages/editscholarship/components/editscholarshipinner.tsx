import { getScholarship } from '@/dataService/getscholarship';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getDate } from '@/utils/getDate';
import { FileUploader } from 'react-drag-drop-files';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { HexColorPicker } from 'react-colorful';
import Swal from 'sweetalert2';
import { getScholarshipID } from '@/dataService/getScholarshipID';
import { editScholarship, updateScholarship } from '@/dataService/putScholarshipID';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { getTypeclassname } from '@/dataService/getTypeClassName';
import { getScholarshiptype } from '@/dataService/getScholarshipTypes';
import { Skeleton } from 'antd';

dayjs.extend(buddhistEra);

type filterDataType = {
    class_type_name?: string;
    schoalrship_year?: string;
};

interface editScholarshipForm extends editScholarship {
    date_rang: Date[] | null;
}

export default function EditscholarshipInner() {
    const Router = useRouter();
    const { TextArea } = Input;
    const fileTypes = ['PDF'];
    const [filterData, setfilterData] = useState<filterDataType>();
    const { data: classTypeYearData } = useQuery({
        queryKey: 'classTypeYearData',
        queryFn: async () => getTypeclassname(),
    });
    const { data: scholarshipTypeData } = useQuery({
        queryKey: 'scholarshipTypeData',
        queryFn: async () => getScholarshiptype(),
    });
    const { data: scholarship, isLoading: isLoadingScholarshipID } = useQuery({
        queryKey: ['scholarshipID', Router.query.id],
        queryFn: async () =>
            getScholarshipID({
                scholarship_id: Router.query.id as string,
                //Reflect.get(router.query, 'id') as string,
            }),
    });

    const [file, setFile] = useState(null);
    const handleChange = (file: any): void => {
        setFile(file);
    };
    const items = useMemo(() => scholarship?.result[0], [scholarship]);

    const { mutate, isLoading } = useMutation({
        mutationKey: 'createscholarship',
        mutationFn: async (data: editScholarship) => {
            return updateScholarship({
                param: { scholarship_id: Router.query.id as string },
                query: {
                    scholarship_name: data.scholarship_name,
                    scholarship_year: data.scholarship_year,
                    scholarship_grade: data.scholarship_grade,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    class_type_id: data.class_type_id,
                    scholarship_type_id: data.scholarship_type_id,
                    scholarship_condition: data.scholarship_condition,
                    scholarship_qualification: data.scholarship_qualification,
                    color_tag: data.color_tag,
                },
            });
        },
        onSuccess: () => {
            Swal.fire('แก้ไขทุนการศึกษา', 'คุณแก้ไขทุนการศึกษาสำเร็จ', 'success');
            Router.push('/manageScholarship');
        },
        onError: () => {
            Swal.fire('แก้ไขทุนการศึกษา', 'คุณแก้ไขทุนการศึกษาไม่สำเร็จ', 'error');
        },
    });

    const [color, setColor] = useState<string>();
    const [showcolor, setShowcolor] = useState<string>();

    const [form] = Form.useForm<editScholarshipForm>();

    const onHandleSubmit = (value: editScholarshipForm): void => {
        const normalResult: editScholarship = {
            scholarship_name: value.scholarship_name,
            scholarship_year: value.scholarship_year,
            start_date: value.date_rang ? value.date_rang[0].toJSON() : undefined,
            end_date: value.date_rang ? value.date_rang[1].toJSON() : undefined,
            scholarship_grade: value.scholarship_grade,
            class_type_id: value.class_type_id,
            scholarship_type_id: value.scholarship_type_id,
            scholarship_condition: value.scholarship_condition,
            scholarship_qualification: value.scholarship_qualification,
            color_tag: value.color_tag,
        };
        console.log(normalResult);
        Swal.fire({
            title: 'ยืนยันแก้ไขทุนการศึกษาใช่หรือไม่?',
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
        console.log(dayjs(scholarship?.result[0].start_date));
        form.setFieldsValue({
            scholarship_name: scholarship?.result[0].scholarship_name,
            scholarship_year: scholarship?.result[0].scholarship_year,
            scholarship_grade: scholarship?.result[0].scholarship_grade,
            scholarship_condition: scholarship?.result[0].scholarship_condition,
            date_rang:
                scholarship?.result[0].start_date && scholarship.result[0].end_date
                    ? [
                          dayjs(scholarship.result[0].start_date),
                          dayjs(scholarship.result[0].end_date),
                      ]
                    : undefined,
            scholarship_qualification: scholarship?.result[0].scholarship_qualification,
            scholarship_type_id: scholarship?.result[0].scholarship_type_id,
            class_type_id: scholarship?.result[0].class_type_id,
            color_tag: scholarship?.result[0].color_tag,
        });
    }, [scholarship]);

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    if (isLoadingScholarshipID) {
        return (
            <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                <Skeleton active />
            </div>
        );
    }
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
                                                value={
                                                    scholarship?.result[0].start_date &&
                                                    scholarship.result[0].end_date
                                                        ? [
                                                              dayjs(
                                                                  scholarship.result[0].start_date,
                                                              ),
                                                              dayjs(scholarship.result[0].end_date),
                                                          ]
                                                        : undefined
                                                }
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
                                <div className="flex items-center mt-3 w-full">
                                    <span className="label-text text-lg  w-2/5">
                                        ประเภททุนการศึกษา
                                    </span>
                                    <div className="w-full">
                                        <Form.Item
                                            name={'scholarship_type_id'}
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
                                                options={scholarshipTypeData?.result.map(
                                                    (item) => ({
                                                        label: item.scholarship_type_name,
                                                        value: item.scholarship_type_id,
                                                    }),
                                                )}
                                            />
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
                                            name={'class_type_id'}
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
                                                options={classTypeYearData?.result.map((item) => ({
                                                    label: item.class_type_name,
                                                    value: item.class_type_id,
                                                }))}
                                            />
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
                                                name={'color_tag'}
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
                                            name="scholarship_condition"
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
                            <label className="lebel">
                                <div className="flex items-center mt-3  w-full">
                                    <span className="label-text text-lg  w-2/5">
                                        รายละเอียดเพิ่มเติม
                                    </span>
                                    <div className="w-full">
                                        <Form.Item name="scholarship_qualification">
                                            <TextArea
                                                placeholder="รายละเอียดเพิ่มเติม"
                                                size="large"
                                                allowClear
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </label>
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
                </div>
            </div>
        </div>
    );
}
