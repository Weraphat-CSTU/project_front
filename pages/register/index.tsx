import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { postRegister, registerPlayload } from '@/dataService/postRegister';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface registerForm extends registerPlayload {
    cpassword: string;
}

export default function Register() {
    const Router = useRouter();
    const Swal = require('sweetalert2');

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

    const formSchema = Yup.object().shape({
        name: Yup.string().required('กรุณากรอกชื่อจริง'),
        lastname: Yup.string().required('กรุณากรอกนามสกุล'),
        card_id: Yup.string().required('กรุณากรอกบัตรประจำตัวประชาชน'),
        student_id: Yup.string().required('กรุณากรอกรหัสนักศึกษา'),
        phone: Yup.string().required('กรุณากรอกเบอร์โทรศัพท์'),
        email: Yup.string().required('กรุณากรอกที่อยู่อีเมล'),
        password: Yup.string()
            .required('กรุณากรอกรหัสผ่าน')
            .min(4, 'กรุณากรอกรหัสผ่านไม่ต่ำกว่า 4 ตัวอักษร')
            .max(20, 'กรอกรหัสผ่านได้ไม่เกิน 20 ตัวอักษร'),
        cpassword: Yup.string()
            .required('กรุณากรอกยืนยันรหัสผ่าน')
            .min(4, 'กรุณากรอกรหัสผ่านไม่ต่ำกว่า 4 ตัวอักษร')
            .max(20, 'กรอกรหัสผ่านได้ไม่เกิน 20 ตัวอักษร')
            .oneOf([Yup.ref('password')], 'รหัสผ่านไม่ตรง'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<registerForm>({ mode: 'onTouched', resolver: yupResolver(formSchema) });

    const onSubmit = (events: registerForm) => {
        const normalResult: registerPlayload = {
            name: events.name,
            lastname: events.lastname,
            card_id: events.card_id,
            email: events.email,
            student_id: events.student_id,
            phone: events.phone,
            grade: events.grade,
            line_id: events.line_id,
            password: events.password,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-warp">
                <div className="w-full h-screen">
                    <Image
                        src="/login.jpg"
                        width={2000}
                        height={1000}
                        alt="Picture of the author"
                        className="h-screen w-full object-cover "
                    />
                </div>
                <div className="w-full h-screen bg-white ">
                    <h1 className="font-medium text-4xl mt-3 text-center pr-10">ลงทะเบียน</h1>
                    <div className="flex justify-center mt-10">
                        <div className="form-control w-full max-w-xl">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2 lg:pr-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <div className="flex mt-3 space-x-1">
                                                <span className="label-text text-xl ">
                                                    ชื่อจริง
                                                </span>
                                                <div className="text-red-600 text-2xl">*</div>
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="กรอกชื่อจริง"
                                            className="w-full input input-bordered "
                                            {...register('name')}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 lg:pl-3">
                                    <label className="label">
                                        <div className="flex mt-3 space-x-1">
                                            <span className="label-text text-xl ">นามสกุล</span>
                                            <div className="text-red-600 text-2xl">*</div>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="กรอกนามสกุล"
                                        className="w-full input input-bordered "
                                        {...register('lastname')}
                                    />
                                    {errors.lastname && (
                                        <p className="text-red-500">{errors.lastname.message}</p>
                                    )}
                                </div>
                            </div>

                            <label className="label">
                                <div className="flex mt-3 space-x-1">
                                    <span className="label-text text-xl ">บัตรประจำตัวประชาชน</span>
                                    <div className="text-red-600 text-2xl">*</div>
                                </div>
                            </label>
                            <InputMask
                                mask="9-9999-99999-99-9"
                                maskChar={null}
                                placeholder="กรอกบัตรประจำตัวประชาชน"
                                className="input input-bordered w-full max-w-xl"
                                {...register('card_id')}
                            />
                            {errors.card_id && (
                                <p className="text-red-500">{errors.card_id.message}</p>
                            )}

                            <label className="label">
                                <div className="flex mt-3 space-x-1">
                                    <span className="label-text text-xl ">รหัสนักศึกษา</span>
                                    <div className="text-red-600 text-2xl">*</div>
                                </div>
                            </label>
                            <input
                                type="text"
                                placeholder="กรอกรหัสนักศึกษา"
                                max={10}
                                maxLength={10}
                                className="w-full input input-bordered "
                                {...register('student_id')}
                            />
                            {errors.student_id && (
                                <p className="text-red-500">{errors.student_id.message}</p>
                            )}

                            <div className="flex flex-warp">
                                <div className="w-full lg:w-1/2 lg:pr-3">
                                    <label className="label">
                                        <div className="flex mt-3 space-x-1">
                                            <span className="label-text text-xl ">
                                                เบอร์โทรศัพท์
                                            </span>
                                            <div className="text-red-600 text-2xl">*</div>
                                        </div>
                                    </label>
                                    <InputMask
                                        mask="999-999-9999"
                                        maskChar={null}
                                        placeholder="กรอกเบอร์โทรศัพท์"
                                        className="input input-bordered w-full max-w-xl"
                                        {...register('phone')}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500">{errors.phone.message}</p>
                                    )}
                                </div>
                                <div className="w-full lg:w-1/2 lg:pl-3">
                                    <label className="label">
                                        <div className="flex mt-3 space-x-1">
                                            <span className="label-text text-xl ">อีเมล</span>
                                            <div className="text-red-600 text-2xl">*</div>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="กรอกอีเมล"
                                        className="w-full input input-bordered "
                                        {...register('email')}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-warp">
                                <div className="w-full lg:w-1/2 lg:pr-3">
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">ไอดีไลน์</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="กรอกไอดีไลน์"
                                        className="input input-bordered w-full max-w-xl"
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 lg:pl-3">
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">เกรดเฉลี่ย</span>
                                    </label>
                                    <input
                                        type="number"
                                        max={4}
                                        maxLength={4}
                                        placeholder="กรอกเกรดเฉลี่ย"
                                        className="input input-bordered w-full max-w-xl"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-warp">
                                <div className="w-full lg:w-1/2 lg:pr-3">
                                    <label className="label">
                                        <div className="flex mt-3 space-x-1">
                                            <span className="label-text text-xl ">รหัสผ่าน</span>
                                            <div className="text-red-600 text-2xl">*</div>
                                        </div>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="กรอกรหัสผ่าน"
                                        className="input input-bordered w-full max-w-xl"
                                        {...register('password')}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">{errors.password.message}</p>
                                    )}
                                </div>
                                <div className="w-full lg:w-1/2 lg:pl-3">
                                    <label className="label">
                                        <div className="flex mt-3 space-x-1">
                                            <span className="label-text text-xl ">
                                                ยืนยันรหัสผ่าน
                                            </span>
                                            <div className="text-red-600 text-2xl">*</div>
                                        </div>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="กรอกยืนยันรหัสผ่าน"
                                        className="input input-bordered w-full max-w-xl"
                                        {...register('cpassword')}
                                    />
                                    {errors.cpassword && (
                                        <p className="text-red-500">{errors.cpassword.message}</p>
                                    )}
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
                                className="text-lg font-bold text-blue-500 hover:underline mt-10 text-center"
                            >
                                กลับสู่หน้าแรก
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
