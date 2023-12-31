import Layout from '@/components/layout';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { useState } from 'react';
import { Select, Skeleton, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import { ColumnsType } from 'antd/es/table';
import {
    getHistoryScholarship,
    historyScholarshipQuery,
    historyscholarshipData,
} from '@/dataService/gethistoryScholarship';
import { useRouter } from 'next/router';
import { getScholarshiptype } from '@/dataService/getScholarshipTypes';

dayjs.extend(buddhistEra);

export default function PastScholarship() {
    const Router = useRouter();
    const [filterData, setfilterData] = useState<historyScholarshipQuery>();
    const { data: historyscholarship, isLoading: isLoadingHistoryScholarship } = useQuery({
        queryKey: ['historyscholarship', filterData],
        queryFn: async () => getHistoryScholarship(filterData),
    });
    const { data: scholarshipTypeData } = useQuery({
        queryKey: 'scholarshipTypeData',
        queryFn: async () => getScholarshiptype(),
    });

    const columns: ColumnsType<historyscholarshipData> = [
        {
            title: 'ชื่อทุนการศึกษา',
            dataIndex: 'scholarship_id',
            key: 'scholarship_id',
            render: (_, value: historyscholarshipData) => (
                <a
                    className="cursor-pointer text-blue-500"
                    onClick={() => Router.push(`/scholarship-detail/${value.scholarship_id}`)}
                >
                    {value.scholarship_name}
                </a>
            ),
        },
        {
            title: 'ปีการศึกษา',
            dataIndex: 'scholarship_year',
            key: 'scholarship_year',
        },
        {
            title: 'วันที่สิ้นสุดโครงการ',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (value: string) => (
                <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
            ),
        },
        {
            title: 'ประเภท',
            dataIndex: 'scholarship_type_name',
            key: 'scholarship_type_name',
            render: (value: string) => {
                if (value === 'ทุนภายใน') {
                    return <Tag color="blue">{value}</Tag>;
                } else {
                    return <Tag color="red">{value}</Tag>;
                }
            },
        },
    ];

    return (
        <Layout title="ประวัติทุนการศึกษา">
            {isLoadingHistoryScholarship ? (
                <div className="mx-auto max-w-3xl lg:max-w-7xl mt-10">
                    <Skeleton active />
                </div>
            ) : (
                <div className="">
                    <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                        <div className="flex flex-warp">
                            <div className="w-full flex">
                                <div className="form-control w-full max-w-xs pb-5 lg:pr-5">
                                    <label className="label">
                                        <span className="label-text">ประเภททุนการศึกษา</span>
                                    </label>
                                    <Select
                                        value={filterData?.scholarship_type_id}
                                        allowClear
                                        onChange={(value) => {
                                            setfilterData({
                                                ...filterData,
                                                scholarship_type_id: value,
                                            });
                                        }}
                                        placeholder="เลือกประเภททุน"
                                        options={scholarshipTypeData?.result.map((item) => ({
                                            label: item.scholarship_type_name,
                                            value: item.scholarship_type_id,
                                        }))}
                                    />
                                </div>
                                {/* <div className="form-control w-full max-w-xs pb-5 lg:pl-5">
                                <label className="label">
                                    <span className="label-text">ปีการศึกษา</span>
                                </label>
                                <Select
                                    value={filterData?.schoalrship_year}
                                    onChange={(value) => {
                                        setfilterData({
                                            ...filterData,
                                            schoalrship_year: value,
                                        });
                                    }}
                                    placeholder="เลือกปีการศึกษา"
                                >
                                    <Select.Option selected value="alltype">
                                        ทุกปีการศึกษา
                                    </Select.Option>
                                    <Select.Option value="2566">ปีการศึกษา 2566</Select.Option>
                                </Select>
                            </div> */}
                            </div>
                        </div>
                        <Table
                            dataSource={historyscholarship?.result}
                            columns={columns}
                            bordered
                            pagination={false}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}
