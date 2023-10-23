import React from 'react';
import Image from 'next/image';
import { postRegister, registerPlayload } from '@/dataService/postRegister';
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Link from 'next/link';

interface registerForm extends registerPlayload {
    cpassword: string;
}

export default function RegisterForm() {
    const Router = useRouter();
    const Swal = require('sweetalert2');
    const [form] = Form.useForm<registerForm>();
    const { mutate, isLoading } = useMutation({
        mutationKey: 'register',
        mutationFn: async (value: registerPlayload) => {
            return postRegister(value);
        },
        onSuccess: () => {
            Swal.fire('ลงทะเบียน', 'คุณลงทะเบียนสำเร็จ', 'success');
            Router.push('/login');
        },
        onError: () => {
            Swal.fire('ลงทะเบียน', 'คุณลงทะเบียนไม่สำเร็จ', 'error');
        },
    });

    const onSubmit = (result: registerForm) => {
        const normalResult: registerPlayload = {
            name: result.name,
            lastname: result.lastname,
            card_id: result.card_id.replaceAll('-', ''),
            email: result.email,
            student_id: result.student_id,
            phone: result.phone.replaceAll('-', ''),
            grade: result.grade || null,
            line_id: result.line_id || null,
            password: result.password,
        };
        console.log(normalResult);
        Swal.fire({
            title: 'ยืนยันลงทะเบียนใช่หรือไม่?',
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
        <div>
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <div className="w-full mx-auto max-w-xl h-screen bg-white p-3 px-10 absolute inset-0 opacity-95 shadow-md rounded-lg  waves-park py-10">
                    <div className="w-full flex justify-center">
                        <Image
                            src="/qjg3jmr9-removebg-preview.png"
                            width={120}
                            height={70}
                            alt="Picture of the author"
                        />
                    </div>
                    <h1 className="font-semibold text-xl mt-3 text-center text-black pr-5">
                        ลงทะเบียน
                    </h1>
                    <div className="flex justify-center mt-5">
                        <div className="form-control w-full max-w-xl">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2">
                                    <Form.Item
                                        label="ชื่อจริง"
                                        name={'name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกชื่อ!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="กรอกชื่อ"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>

                                <div className="w-full lg:w-1/2">
                                    <Form.Item
                                        label="นามสกุล"
                                        name={'lastname'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกนามสกุล!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="กรอกนามสกุล"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <Form.Item
                                label="บัตรประจำตัวประชาชน"
                                name={'card_id'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกบัตรประจำตัวประชาชน!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="กรอกบัตรประจำตัวประชาชน"
                                    maxLength={13}
                                    style={{ height: 40 }}
                                    allowClear
                                />
                            </Form.Item>

                            <Form.Item
                                label="รหัสนักศึกษา"
                                name={'student_id'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกนามสกุล!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="กรอกนามสกุล"
                                    maxLength={10}
                                    style={{ height: 40 }}
                                    allowClear
                                />
                            </Form.Item>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2">
                                    <Form.Item
                                        label="เบอร์โทรศัพท์"
                                        name={'phone'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกเบอร์โทรศัพท์!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="กรอกเบอร์โทรศัพท์"
                                            maxLength={10}
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <Form.Item
                                        label="อีเมล"
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกอีเมล!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="กรอกอีเมล"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2">
                                    <Form.Item label="ไอดีไลน์" name={'line_id'}>
                                        <Input
                                            placeholder="กรอกไอดีไลน์"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <Form.Item label="เกรดเฉลี่ย" name={'grade'}>
                                        <Input
                                            placeholder="กรอกเกรดเฉลี่ย"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2">
                                    <Form.Item
                                        label="รหัสผ่าน"
                                        name={'password'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่าน!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (getFieldValue('password').length < 4) {
                                                        return Promise.reject(
                                                            'กรุณากรอกรหัสผ่านไม่ต่ำกว่า 4 ตัวอักษร!',
                                                        );
                                                    }
                                                    if (getFieldValue('password').length > 20) {
                                                        return Promise.reject(
                                                            'กรอกรหัสผ่านได้ไม่เกิน 20 ตัวอักษร!',
                                                        );
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="กรอกรหัสผ่าน"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>

                                <div className="w-full lg:w-1/2">
                                    <Form.Item
                                        label="ยืนยันรหัสผ่าน"
                                        name={'cpassword'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณายืนยันรหัสผ่าน!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue('password') === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error('รหัสผ่านไม่ตรงกัน'),
                                                    );
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input
                                            type="password"
                                            placeholder="ยืนยันรหัสผ่าน"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="py-3 rounded-md bg-[#0094FF] label-text text-xl text-white mt-10"
                            >
                                ยืนยัน
                            </button>
                            <Link
                                href={'/'}
                                className="text-lg font-bold text-blue-500 hover:underline mt-5 text-center"
                            >
                                กลับสู่หน้าแรก
                            </Link>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
