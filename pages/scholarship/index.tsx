import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { getScholarship } from '@/dataService/getscholarship';
import { getDate } from '@/utils/getDate';
import Fullcalendar from '@/components/fullcalendar';
import { Button, Skeleton, Tag, message } from 'antd';
import { createSubscribePlayloadParam, postSubscribe } from '@/dataService/postSubscribe';
import { getFollowScholarship } from '@/dataService/getfollowScholarship';
import { unSubscribe, unSubscribePlayloadParam } from '@/dataService/unSubscribe';

export default function Scholarship() {
    const Router = useRouter();

    const {
        data: followscholarship,
        isLoading: isLoadingScholarship,
        refetch,
    } = useQuery({
        queryKey: 'followscholarship',
        queryFn: async () => getFollowScholarship(),
    });

    const { mutate, isLoading: isLoadingSubscribe } = useMutation({
        mutationKey: ['subscribescholarship', Router.query.id],
        mutationFn: async (data: { param: createSubscribePlayloadParam }) => {
            return postSubscribe(data.param);
        },
        onMutate: () => {
            message.loading('กำลังโหลด');
        },
        onSuccess: () => {
            message.success('คุณติดตามทุนการศึกษานี้แล้ว');
            refetch();
        },
        onError: () => {
            message.error('คุณติดตามทุนการศึกษานี้ไม่สำเร็จ');
        },
    });

    const onHandleSubscribe = (value: createSubscribePlayloadParam): void => {
        const normalResult: createSubscribePlayloadParam = {
            scholarship_id: value.scholarship_id,
        };
        mutate({ param: normalResult });
    };

    const { mutate: unFollow, isLoading: isLoadingunSubscribe } = useMutation({
        mutationKey: ['unsubscribescholarship', Router.query.id],
        mutationFn: async (data: { param: unSubscribePlayloadParam }) => {
            return unSubscribe(data.param);
        },
        onMutate: () => {
            message.loading('กำลังโหลด');
        },
        onSuccess: () => {
            message.success('คุณเลิกติดตามทุนการศึกษานี้แล้ว');
            refetch();
        },
        onError: () => {
            message.error('คุณเลิกติดตามทุนการศึกษานี้ไม่สำเร็จ');
        },
    });
    const onHandlerUnsubscribe = (value: unSubscribePlayloadParam): void => {
        const normalResult: unSubscribePlayloadParam = {
            subscribe_id: value.subscribe_id,
        };
        unFollow({ param: normalResult });
    };
    return (
        <Layout>
            {isLoadingScholarship ? (
                <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                    <Skeleton active />
                </div>
            ) : (
                <>
                    <img
                        src="https://cdn.discordapp.com/attachments/1153632685407871066/1164511644118949918/CSTU.png?ex=65437afb&is=653105fb&hm=2eacfd2a9fb626ac976c187a4678e84c14bf44154bf9aa530ed53e5ce08236e3&"
                        width={1500}
                        height={1500}
                        className=" w-full object-cover brightness-90"
                        alt="Picture of the author"
                    />
                    <div className="mx-auto  lg:max-w-7xl pt-10">
                        <div className="flex ">
                            <div className="w-full lg:w-2/5 pr-5 ">
                                <div className="flex justify-between items-center">
                                    <div className=" font-medium text-xl">
                                        ทุนการศึกษาที่เปิดรับสมัคร
                                    </div>
                                    <div
                                        className="text-blue-500 font-medium text-lg hover:underline cursor-pointer"
                                        onClick={() => Router.push('/scholarshipAll')}
                                    >
                                        ทั้งหมด
                                    </div>
                                </div>
                                <div className="w-full pt-5 ">
                                    {followscholarship?.result.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                                            >
                                                <div className="flex justify-between">
                                                    <div
                                                        className="space-y-3"
                                                        onClick={() =>
                                                            Router.push(
                                                                `/scholarship-detail/${item.scholarship_id}`,
                                                            )
                                                        }
                                                    >
                                                        <div className="font-semibold text-xl text-blue-600 hover:text-blue-500 hover:underline">
                                                            {item.scholarship_name}
                                                        </div>
                                                        <div className="font-normal text-[17px]">
                                                            {item.scholarship_type_name ===
                                                            'ทุนภายใน' ? (
                                                                <Tag color="blue">
                                                                    {item.scholarship_type_name}
                                                                </Tag>
                                                            ) : (
                                                                <Tag color="red">
                                                                    {item.scholarship_type_name}
                                                                </Tag>
                                                            )}
                                                            (ปีการศึกษา {item.scholarship_year})
                                                        </div>
                                                        <div className="font-normal">
                                                            รับสมัคร:{' '}
                                                            {getDate(
                                                                item.start_date,
                                                                item.end_date,
                                                            )}
                                                        </div>
                                                    </div>
                                                    {item.is_follow === 'Y' ? (
                                                        <Button
                                                            className=" text-white bg-gray-600"
                                                            onClick={() => {
                                                                onHandlerUnsubscribe({
                                                                    subscribe_id: item.subscribe_id,
                                                                });
                                                            }}
                                                            loading={isLoadingSubscribe}
                                                        >
                                                            ติดตามแล้ว
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            className=" text-white bg-red-600"
                                                            onClick={() => {
                                                                onHandleSubscribe({
                                                                    scholarship_id:
                                                                        item.scholarship_id,
                                                                });
                                                            }}
                                                            loading={isLoadingunSubscribe}
                                                        >
                                                            ติดตาม
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="w-full lg:w-3/5 pl-5 ">
                                <div className="text-medium text-xl pb-5">ปฏิทินกำหนดการ</div>
                                <Fullcalendar />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
}
