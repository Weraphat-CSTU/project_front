import { getInfomation, infoMationData } from '@/dataService/getinformation';
import { editInformation, updateInformation } from '@/dataService/putInformation';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';
type prop = {
    editInformation: infoMationData | undefined;
    onClose: (value: boolean) => void;
};
export default function EditInformation({ editInformation, onClose }: prop) {
    const [openedit, setOpenEdit] = useState(false);
    const [form] = Form.useForm<editInformation>();

    const handleCancelEdit = () => {
        setOpenEdit(false);
    };
    const {
        data: information,
        isLoading: isLoadingInfo,
        refetch,
    } = useQuery({
        queryKey: 'information',
        queryFn: async () => getInfomation(),
    });

    const { mutate, isLoading: isLoadingEditinformation } = useMutation({
        mutationKey: 'createInformation',
        mutationFn: async (data: editInformation) => {
            return updateInformation({
                param: { info_id: editInformation?.info_id as string },
                query: {
                    title: data.title,
                    description: data.description,
                },
            });
        },
        onSuccess: () => {
            Swal.fire('ข่าวประชาสัมพันธ์', 'คุณแก้ไขข่าวประชาสัมพันธ์สำเร็จ', 'success');
            onClose(false);
            refetch();
        },
        onError: () => {
            Swal.fire('ข่าวประชาสัมพันธ์', 'คุณแก้ไขข่าวประชาสัมพันธ์ไม่สำเร็จ', 'error');
            onClose(false);
        },
    });
    const onHandleSubmitEdit = (value: editInformation): void => {
        const normalResult: editInformation = {
            title: value.title,
            description: value.description,
        };
        Swal.fire({
            title: 'ยืนยันแก้ไขข่าวประชาสัมพันธ์?',
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
            title: editInformation?.title,
            description: editInformation?.description,
        });
    }, [editInformation]);

    return (
        <div>
            <Form form={form} onFinish={onHandleSubmitEdit} layout="vertical">
                <div className="w-full font-medium ">
                    <div className="text-lg">แก้ไขข่าวประชาสัมพันธ์</div>
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
                                    <Input placeholder="ประกาศ" size="large" allowClear />
                                </Form.Item>
                            </div>
                        </div>
                    </label>
                    <label className="lebel">
                        <div className="flex items-center mt-3  w-full">
                            <div className="w-full">
                                <Form.Item label="รายละเอียดเพิ่มเติม" name={'description'}>
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
                                handleCancelEdit();
                            }}
                        >
                            บันทึก
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
