import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { postRegister, registerPlayload } from '@/dataService/postRegister';
import { useMutation } from 'react-query';

export default function Register() {
    const Router = useRouter();
    const Swal = require('sweetalert2');

    const { mutate, isLoading } = useMutation({
        mutationKey: 'register',
        mutationFn: async (value: registerPlayload) => {
            return postRegister(value);
        },
        onSuccess: () => {
            Swal.fire({
              title: 'ยืนยันลงทะเบียนใช่หรือไม่?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'ยืนยัน'
            }).then((result : any) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'ลงทะเบียนสำเร็จ'
                )
                Router.push('/login');
              }
            })
        },
        onError: () => {},
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<registerPlayload>();

    const onSubmit = (events: registerPlayload) => {
        const normalResult: registerPlayload = {
            name: events.name,
            lastname: events.lastname,
            card_id: events.card_id,
            email: events.email,
            student_id: events.student_id,
            phone: events.phone,
            grade: events.grade,
            line_id: events.line_id,
        };
        mutate(normalResult);
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
                            <div className="flex justify-between">
                                <div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text text-xl mt-3">
                                                ชื่อจริง
                                            </span>
                                        </label>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    type="text"
                                                    placeholder="กรอกชื่อจริง"
                                                    value={value}
                                                    onChange={onChange}
                                                    className="input input-bordered "
                                                />
                                            )}
                                            name="name"
                                        />
                                        {errors.name && (
                                            <label className="label">
                                                <span className="label-text-alt text-base text-red-500">
                                                    กรุณากรอกชื่อจริง
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">นามสกุล</span>
                                    </label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <input
                                                type="text"
                                                placeholder="กรอกนามสกุล"
                                                value={value}
                                                onChange={onChange}
                                                className="input input-bordered "
                                            />
                                        )}
                                        name="lastname"
                                    />
                                    {errors.lastname && (
                                        <label className="label">
                                            <span className="label-text-alt text-base text-red-500">
                                                กรุณากรอกนามสกุล
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <label className="label">
                                <span className="label-text text-xl mt-3">บัตรประจำตัวประชาชน</span>
                            </label>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <InputMask
                                        mask="9-9999-99999-99-9"
                                        maskChar={null}
                                        value={value}
                                        onChange={onChange}
                                        placeholder="กรอกบัตรประจำตัวประชาชน"
                                        className="input input-bordered w-full max-w-xl"
                                    />
                                )}
                                name="card_id"
                            />
                            {errors.card_id && (
                                <label className="label">
                                    <span className="label-text-alt text-base text-red-500">
                                        กรุณากรอกบัตรประจำตัวประชาชน
                                    </span>
                                </label>
                            )}

                            <div className="flex justify-between">
                                <div>
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">
                                            เบอร์โทรศัพท์
                                        </span>
                                    </label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <InputMask
                                                mask="999-999-9999"
                                                maskChar={null}
                                                onChange={onChange}
                                                value={value}
                                                placeholder="กรอกเบอร์โทรศัพท์"
                                                className="input input-bordered w-full max-w-xl"
                                            />
                                        )}
                                        name="phone"
                                    />
                                    {errors.phone && (
                                        <label className="label">
                                            <span className="label-text-alt text-base text-red-500">
                                                กรุณากรอกเบอร์โทรศัพท์
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">อีเมล</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="กรอกอีเมล"
                                        className="input input-bordered w-full max-w-xl"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">ไอดีไลน์</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="กรอกไอดีไลน์"
                                        className="input input-bordered w-full max-w-xl"
                                    />
                                </div>
                                <div>
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
                            <div className="flex justify-between">
                                <div>
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">รหัสผ่าน</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="กรอกรหัสผ่าน"
                                        className="input input-bordered w-full max-w-xl"
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text text-xl mt-3">
                                            ยืนยันรหัสผ่าน
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="กรอกยืนยันรหัสผ่าน"
                                        className="input input-bordered w-full max-w-xl"
                                    />
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
