import Layout from '@/components/layout';
import {
    deleteInformation,
    deleteinformationParam,
    deleteinformationRespone,
} from '@/dataService/deleteinformation';
import { getInfomation, infoMationData } from '@/dataService/getinformation';
import { createInfoMationPlayload, postInfomation } from '@/dataService/postInformation';

import { Button, Form, Input, Modal, Pagination, Skeleton } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

import { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';
import EditInformation from './components/EditInformationForm';

dayjs.extend(buddhistEra);

export default function Announcements() {
    const [openwrite, setOpenWrite] = useState(false);
    const [form] = Form.useForm<createInfoMationPlayload>();
    const showModalWrite = () => {
        setOpenWrite(true);
    };
    const handleCancel = () => {
        setOpenWrite(false);
    };

    const [openedit, setOpenEdit] = useState(false);
    const showModalEdit = () => {
        setOpenEdit(true);
    };
    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    const [editInformation, setEditInformation] = useState<infoMationData>();
    const {
        data: information,
        isLoading: isLoadingInfo,
        refetch,
    } = useQuery({
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
            refetch();
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
    const [informationdata, setinformationdata] = useState<infoMationData[]>();
    const { mutate: mutateInformation } = useMutation({
        mutationKey: 'deletescholarshipdata',
        mutationFn: async (data: deleteinformationParam) => {
            return deleteInformation(data);
        },
        onSuccess: (item: deleteinformationRespone) => {
            Swal.fire('ลบสำเร็จ', '', 'success');
            setinformationdata(item.result);
            refetch();
        },
        onError: () => {
            Swal.fire('ลบไม่สำเร็จ', '', 'error');
        },
    });
    const removeInformation = (info_id: string): void => {
        Swal.fire({
            title: 'ต้องการลบข่าวประชาสัมพันธ์?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result: any) => {
            if (result.isConfirmed) {
                mutateInformation({ info_id: info_id });
            }
        });
    };
    useEffect(() => {
        setinformationdata(information?.result);
    }, [informationdata]);

    return (
        <Layout title="ข่าวประชาสัมพันธ์">
            {isLoadingInfo ? (
                <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                    <Skeleton active />
                </div>
            ) : (
                <div className="">
                    <div className=" mx-auto  lg:max-w-7xl pt-10 px-5 lg:px-0">
                        {typeof sessionStorage !== 'undefined' &&
                            parseInt(String(sessionStorage.getItem('role_id')), 10) === 1 && (
                                <button
                                    className="btn btn-error text-white bg-blue-600 border-none hover:bg-blue-700"
                                    onClick={() => {
                                        showModalWrite();
                                    }}
                                >
                                    <BsPencilSquare className="text-white" />
                                    <div className="pl-3">เขียนข่าวประชาสัมพันธ์</div>
                                </button>
                            )}

                        <Modal
                            open={openwrite}
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
                        <Modal
                            open={openedit}
                            footer={null}
                            onCancel={handleCancelEdit}
                            centered
                            width={700}
                        >
                            <EditInformation
                                editInformation={editInformation}
                                onClose={setOpenEdit}
                            />
                        </Modal>
                        <Pagination
                            defaultCurrent={6}
                            total={3}
                            showSizeChanger
                            className="flex justify-end"
                        />
                        {information?.result.map((items, index) => (
                            <div
                                key={index}
                                className="w-full  p-5 rounded-md shadow-md mt-5 border"
                            >
                                {typeof sessionStorage !== 'undefined' &&
                                parseInt(String(sessionStorage.getItem('role_id')), 10) === 1 ? (
                                    <div className="flex justify-between">
                                        <div className="font-semibold text-2xl">{items.title}</div>
                                        <div className="flex space-x-10">
                                            <FiEdit
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    showModalEdit();
                                                    setEditInformation(items);
                                                }}
                                            />
                                            <MdDeleteOutline
                                                className="text-red-600 text-xl cursor-pointer"
                                                onClick={() => {
                                                    removeInformation(items.info_id);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="font-semibold text-2xl">{items.title}</div>
                                )}
                                <div className="mt-5 text-lg"> {items.description}</div>
                                <div className="mt-5 text-lg">
                                    วันที่ประกาศ :{' '}
                                    {dayjs(items.create_date).locale('th').format('DD MMMM BBBB')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}
