import { loginPlayload, postLogin } from '@/dataService/postLogin';
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';

export default function loginForm() {
    const Router = useRouter();
    const Swal = require('sweetalert2');
    const { mutate, isLoading } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (value: loginPlayload) => {
            return postLogin({ username: value.username, password: value.password });
        },
        onSuccess: (data) => {
            sessionStorage.setItem('login', 'true');
            sessionStorage.setItem('role_id', data.result.accessToken);
            Router.push('/scholarship');
        },
        onError: () => {
            Swal.fire({
                title: 'เข้าสู่ระบบล้มเหลว',
                text: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ตกลง',
            });
        },
    });

    const [form] = Form.useForm<loginPlayload>();
    const onSubmit = (events: loginPlayload) => {
        const normalResult: loginPlayload = {
            username: events.username,
            password: events.password,
        };
        mutate(normalResult);
    };
    return (
        <div>
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <div className=" w-full mx-auto max-w-xl h-[650px] p-3 px-10 absolute inset-0 bg-white opacity-95 shadow-md rounded-lg translate-y-40 waves-park py-10">
                    <div className="w-full flex justify-center">
                        <Image
                            src="/qjg3jmr9-removebg-preview.png"
                            width={120}
                            height={70}
                            alt="Picture of the author"
                        />
                    </div>
                    <h1 className="font-semibold text-xl mt-3 text-center text-black pr-5">
                        เข้าสู่ระบบ
                    </h1>
                    <div className="flex justify-center mt-10">
                        <div className="form-control w-full max-w-xl">
                            <Form.Item
                                label="รหัสนักศึกษา/รหัสผู้ใช้"
                                name={'username'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกรหัสนักศึกษา/รหัสผู้ใช้!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="กรอกรหัสนักศึกษา/รหัสผู้ใช้"
                                    style={{ height: 40 }}
                                    allowClear
                                />
                            </Form.Item>

                            <Form.Item
                                label="รหัสผ่าน"
                                name={'password'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกรหัสผ่าน!',
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    placeholder="กรอกรหัสผ่าน"
                                    style={{ height: 40 }}
                                    allowClear
                                />
                            </Form.Item>

                            <button
                                type="submit"
                                className="py-3 rounded-md bg-[#EB9D48] label-text text-xl text-white mt-10 hover:bg-[#cf8535]"
                            >
                                เข้าสู่ระบบ
                            </button>
                            <Link
                                href={'/'}
                                className="text-lg font-bold text-blue-500 hover:underline mt-10 text-center"
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
