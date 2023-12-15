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
type Iform = {
    nationalID: string;
};
export default function RegisterForm() {
    const Router = useRouter();
    const Swal = require('sweetalert2');

    const [form] = Form.useForm<registerForm>();
    const { mutate, isLoading } = useMutation({
        mutationKey: 'register',
        mutationFn: async (data: registerPlayload) => {
            return postRegister({ data: data });
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
        const normalEmail = result.email.split('@');
        const normalResult: registerPlayload = {
            firstname: result.firstname,
            lastname: result.lastname,
            email: normalEmail + '@dome.tu.ac.th',
            login_id: result.login_id,
            password: result.password,
            card_id: result.card_id.replaceAll('-', ''),
            line_id: result.line_id || null,
            grade: result.grade || null,
            phone: result.phone.replaceAll('-', ''),
        };

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

    function validNationalID(id: string) {
        if (id.length !== 13) return false;

        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(id.charAt(i)) * (13 - i);
        }

        let mod = sum % 11;
        let check = (11 - mod) % 10;

        return check === parseInt(id.charAt(12));
    }
    const validateNationalID = (_rule: any, value: string) => {
        if (!validNationalID(value.toString())) {
            return Promise.reject('กรุณากรอกบัตรประชาชนให้ถูกต้อง');
        }
        return Promise.resolve();
    };

    const validateStudentID = (
        _rule: any,
        value: string,
        callback: (error?: string) => void | Promise<void>,
    ) => {
        const result = value.toString();
        if (result.length !== 10) callback('กรุณากรอกรหัสนักศึกษา/รหัสผู้ใช้');
        const date = new Date();
        const getyear = String(date.getFullYear() + 543).substring(2, 4);

        if (Number(result.substring(0, 2)) <= Number(getyear)) {
            callback();
        } else {
            callback('รหัสนักศึกษาไม่ถูกต้อง');
        }
    };
    return (
        <div>
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <div className="w-full mx-auto max-w-5xl  bg-white p-3 px-10 absolute inset-0 opacity-95 shadow-md rounded-lg  waves-park py-10 translate-y-20">
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
                        <div className="form-control w-full max-w-5xl">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2 lg:pr-5">
                                    <Form.Item
                                        label="ชื่อจริง"
                                        name={'firstname'}
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

                                <div className="w-full lg:w-1/2 lg:pl-5">
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
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2 lg:pr-5">
                                    <Form.Item
                                        label="บัตรประจำตัวประชาชน"
                                        name={'card_id'}
                                        rules={[
                                            {
                                                required: true,
                                                validator: validateNationalID,
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="กรอกบัตรประจำตัวประชาชน"
                                            maxLength={13}
                                            onInput={(e) => {
                                                e.preventDefault();
                                                const isNumeric = /^[0-9]*$/;
                                                if (!isNumeric.test(e.currentTarget.value)) {
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full lg:w-1/2 lg:pl-5">
                                    <Form.Item
                                        label="รหัสนักศึกษา/รหัสผู้ใช้"
                                        name={'login_id'}
                                        rules={[
                                            {
                                                required: true,
                                                validator: (_rule, value, callback) =>
                                                    validateStudentID(_rule, value, callback),
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="กรอกรหัสนักศึกษา/รหัสผู้ใช้"
                                            maxLength={10}
                                            onInput={(e) => {
                                                e.preventDefault();
                                                const isNumeric = /^[0-9]*$/;
                                                if (!isNumeric.test(e.currentTarget.value)) {
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/3 lg:pr-3">
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
                                <div className="w-full lg:w-1/3 lg:pl-3 lg:pr-3">
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
                                            addonAfter="@dome.tu.ac.th"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full lg:w-1/3 lg:pl-3">
                                    <Form.Item label="ไอดีไลน์" name={'line_id'}>
                                        <Input
                                            placeholder="กรอกไอดีไลน์"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                {/* <div className="w-full lg:w-1/2 lg:pr-5">
                                    <Form.Item label="ไอดีไลน์" name={'line_id'}>
                                        <Input
                                            placeholder="กรอกไอดีไลน์"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div> */}
                                {/* <div className="w-full lg:w-1/2 lg:pl-5">
                                    <Form.Item label="เกรดเฉลี่ย" name={'grade'}>
                                        <Input
                                            placeholder="กรอกเกรดเฉลี่ย"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div> */}
                            </div>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/3 lg:pr-3">
                                    <Form.Item label="เกรดเฉลี่ย" name={'grade'}>
                                        <Input
                                            placeholder="กรอกเกรดเฉลี่ย"
                                            style={{ height: 40 }}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>
                                <div className="w-full lg:w-1/3 lg:pl-3 lg:pr-3">
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

                                <div className="w-full lg:w-1/3 lg:pl-3">
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
                                className="py-2 rounded-md bg-[#0094FF] label-text text-lg text-white "
                                disabled={isLoading}
                            >
                                ยืนยัน
                            </button>
                            <Link
                                href={'/'}
                                className="text-lg  text-blue-500 hover:underline mt-5 text-center"
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
