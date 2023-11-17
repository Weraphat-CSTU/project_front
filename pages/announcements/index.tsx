import Layout from '@/components/layout';
import { getInfomation } from '@/dataService/getinformation';
import { createInfoMationPlayload, postInfomation } from '@/dataService/postInformation';
import { Button, Form, Input, Modal, Pagination } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { useMemo, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';

dayjs.extend(buddhistEra);

export default function Announcements() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<createInfoMationPlayload>();
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const { data: information, isLoading: isLoadingInfo } = useQuery({
        queryKey: 'information',
        queryFn: async () => getInfomation(),
    });

    const { mutate, isLoading } = useMutation({
        mutationKey: 'createInformation',
        mutationFn: async (data: createInfoMationPlayload) => {
            return postInfomation({ data: data });
        },
        onSuccess: () => {
            Swal.fire('ข่าวประชาสัมพันธ์', 'คุณเพิ่มข่าวประชาสัมพันธ์สำเร็จ', 'success');
        },
        onError: () => {
            Swal.fire('ข่าวประชาสัมพันธ์', 'คุณเพิ่มข่าวประชาสัมพันธ์ไม่สำเร็จ', 'error');
        },
    });
    const onHandleSubmit = (value: createInfoMationPlayload): void => {
        const normalResult: createInfoMationPlayload = {
            title: value.title,
            description: value.description,
        };
        Swal.fire({
            title: 'ยืนยันข่าวประชาสัมพันธ์?',
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

    return (
        <Layout title="ข่าวประชาสัมพันธ์">
            <div className="">
                <div className=" mx-auto  lg:max-w-7xl pt-10 px-5 lg:px-0">
                    <button
                        className="btn btn-error text-white bg-blue-600 border-none hover:bg-blue-700 "
                        onClick={() => {
                            showModal();
                        }}
                    >
                        <BsPencilSquare className="text-white " />
                        <div className="pl-3">เขียนข่าวประชาสัมพันธ์</div>
                    </button>
                    <Modal open={open} footer={null} onCancel={handleCancel} centered width={700}>
                        <Form form={form} onFinish={onHandleSubmit} layout="vertical">
                            <div className="w-full font-medium ">
                                <div className="text-lg">ข้อความแจ้งเตือน</div>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <div className="w-full">
                                            <Form.Item
                                                label="หัวข้อข่าวประชาสัมพันธ์"
                                                name={'title'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกหัวข้อข่าว!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="ประกาศ"
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <div className="w-full">
                                            <Form.Item
                                                label="รายละเอียดเพิ่มเติม"
                                                name={'description'}
                                            >
                                                <Input
                                                    placeholder="รายละเอียดเพิ่มเติม"
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <div className="flex justify-center ">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="text-white bg-[#08a479] px-8 py-2 rounded-lg "
                                        onClick={() => {
                                            handleCancel();
                                        }}
                                    >
                                        บันทึก
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                    <Pagination
                        defaultCurrent={6}
                        total={3}
                        showSizeChanger
                        className="flex justify-end"
                    />
                    {information?.result.map((items, index) => (
                        <div key={index} className="w-full  p-5 rounded-md shadow-md mt-5 border">
                            <div className="font-semibold text-2xl">{items.title}</div>
                            <div className="mt-5 text-lg"> {items.description}</div>
                            <div className="mt-5 text-lg">
                                วันที่ประกาศ :{' '}
                                {dayjs(items.create_date).locale('th').format('DD MMMM BBBB')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
