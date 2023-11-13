import Layout from '@/components/layout';
import { getMessageAlert } from '@/dataService/getMessageAlert';
import { getScholarship } from '@/dataService/getscholarship';
import { createMessagePlayload, postMessageAlert } from '@/dataService/postMessageAlert';
import type { CollapseProps } from 'antd';
import { Button, Collapse, Form, Input, Modal, Select, Tag } from 'antd';
import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';

export default function createAlert() {
    const [form] = Form.useForm<createMessagePlayload>();
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    const { data: messagealert } = useQuery({
        queryKey: 'messagealert',
        queryFn: async () => getMessageAlert(),
    });
    const { mutate, isLoading } = useMutation({
        mutationKey: 'createMessageAlert',
        mutationFn: async (result: createMessagePlayload) => {
            return postMessageAlert(result);
        },
        onSuccess: () => {
            Swal.fire('สร้างข้อความ', 'คุณสร้างข้อความแจ้งเตือนสำเร็จ', 'success');
        },
        onError: () => {
            Swal.fire('สร้างข้อความ', 'คุณเสร้างข้อความแจ้งเตือนไม่สำเร็จ', 'error');
        },
    });
    const items: CollapseProps['items'] =
        scholarship?.result && messagealert?.result
            ? scholarship.result.map((value, index) => ({
                  key: index.toString(), // ให้ key เป็น string หรือ number ที่ไม่ซ้ำกัน
                  label: <div key={index}>{value.scholarship_name}</div>,
                  children: (
                      <div key={index}>
                          {messagealert.result.map((message) => (
                              <div className="mt-3">
                                  <Tag color="cyan">{message.description}</Tag>
                              </div>
                          ))}
                      </div>
                  ),
              }))
            : [];

    const onHandleSubmit = (value: createMessagePlayload): void => {
        const normalResult: createMessagePlayload = {
            scholarship_name: value.scholarship_name,
            description: value.description,
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

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Layout title="รายการแจ้งเตือน">
            <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                <div className="flex flex-warp items-center">
                    <div className="w-full flex justify-end pb-5">
                        <button
                            className="btn btn-error text-white bg-red-600 border-none hover:bg-red-700 "
                            onClick={() => {
                                showModal();
                            }}
                        >
                            <BsPencilSquare className="text-white " />
                            <div className="pl-3">เขียน</div>
                        </button>

                        <Modal
                            open={open}
                            footer={null}
                            onCancel={handleCancel}
                            centered
                            width={700}
                        >
                            <Form form={form} onFinish={onHandleSubmit} layout="vertical">
                                <div className="w-full font-medium ">
                                    <div className="text-lg">ข้อความแจ้งเตือน</div>
                                    <label className="lebel">
                                        <div className="flex items-center mt-3  w-full">
                                            <div className="w-full">
                                                <Form.Item
                                                    label="ทุนการศึกษา"
                                                    name={'scholarship_id'}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'กรุณาเลือกทุนการศึกษา!',
                                                        },
                                                    ]}
                                                >
                                                    {/* <Select
                                                        allowClear
                                                        placeholder="เลือกทุนการศึกษา"
                                                        size="large"
                                                        className="w-full"
                                                        options={scholarshipData?.result.map(
                                                            (item) => ({
                                                                label: item.scholarship_name,
                                                                values: item.scholarship_id,
                                                            }),
                                                        )}
                                                    /> */}
                                                    <Select
                                                        allowClear
                                                        placeholder="เลือกทุนการศึกษา"
                                                        size="large"
                                                        className="w-full"
                                                    >
                                                        <Select.Option selected value="alltype">
                                                            ทุกทุนการศึกษา
                                                        </Select.Option>
                                                        <Select.Option value="เรียนดี">
                                                            ทุนเรียนดี
                                                        </Select.Option>
                                                        <Select.Option value="กยศ.">
                                                            ทุนกยศ.
                                                        </Select.Option>
                                                        <Select.Option value="ต่างประเทศ">
                                                            ทุนต่างประเทศ
                                                        </Select.Option>
                                                    </Select>
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
                    </div>
                </div>
                <Collapse items={items} defaultActiveKey={['0']} onChange={onChange} />
            </div>
        </Layout>
    );
}
