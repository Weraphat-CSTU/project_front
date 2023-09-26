import { loginPlayload, postLogin } from '@/dataService/postLogin';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function Login() {
    const Router = useRouter();
    const { mutate, isLoading } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (value: loginPlayload) => {
            return postLogin({ username: value.username, password: value.password });
        },
        onSuccess: (data) => {
            sessionStorage.setItem('login', 'true');
            sessionStorage.setItem('user_id', data.result.accessToken);
            Router.push('/scholarship');
        },
        onError: () => {
            console.log('error');
        },
    });

    const { register, handleSubmit } = useForm<loginPlayload>();

    const onSubmit = (events: loginPlayload) => {
        const normalResult: loginPlayload = {
            username: events.username,
            password: events.password,
        };
        mutate(normalResult);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-warp">
                <div className="w-full h-screen">
                    <div className="relative">
                        <div className="absolute inset-0 z-10 flex items-center justify-center -translate-y-7">
                            {/* <div className="space-y-7">
              <div className="font-semibold text-6xl text-white">
                ยินดีต้อนรับสู่
              </div>
              <div className="font-semibold text-6xl text-white">
                ระบบจัดการทุนนักศึกษา
              </div>
            </div> */}
                        </div>
                        <Image
                            src="/test2.jpeg"
                            width={2000}
                            height={1000}
                            alt="Picture of the author"
                            className="h-screen w-full object-cover brightness-75"
                        />
                    </div>
                </div>
                <div className="w-full h-screen bg-white ">
                    <div className="w-full flex justify-center mt-10">
                        <Image
                            src="/qjg3jmr9-removebg-preview.png"
                            width={250}
                            height={100}
                            alt="Picture of the author"
                        />
                    </div>
                    <h1 className="font-bold text-4xl mt-3 text-center pr-10">เข้าสู่ระบบ</h1>
                    <div className="flex justify-center mt-10">
                        <div className="form-control w-full max-w-xl">
                            <label className="label">
                                <span className="label-text text-xl mt-3">
                                    รหัสนักศึกษา/รหัสผู้ใช้
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="กรอกรหัสนักศึกษา/รหัสผู้ใช้"
                                className="input input-bordered w-full max-w-xl"
                                {...register('username')}
                            />
                            <label className="label">
                                <span className="label-text text-xl mt-5 ">รหัสผ่าน</span>
                            </label>
                            <input
                                type="password"
                                placeholder="กรอกรหัสผ่าน"
                                className="input input-bordered w-full max-w-xl"
                                {...register('password')}
                            />
                            <button
                                type='submit'
                                className="py-3 rounded-md bg-[#EB9D48] label-text text-xl text-white mt-10"
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
            </div>
        </form>
    );
}
