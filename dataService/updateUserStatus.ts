import { userInfoData } from './getuserInfo';

export type updateUserStatusParam = {
    user_id: string;
    is_active: 'Y' | 'N';
};

export type updateUserStatusRespone = {
    result: userInfoData[];
};

const mockData: userInfoData[] = [
    {
        user_id:'1',
        firstname: 'พีรวิชญ์',
        lastname: 'วิบูลย์ธนากุล',
        email: 'p@mad.com',
        card_id: '1-5464-64664-53-3',
        phone: '092-939-3939',
        login_id: '6109650140',
        grade: 3.75,
        is_active:'N',
        line_id: 'pM2.5',
    },
    {
       user_id:'2',
        firstname: 'วีรภัทร์',
        lastname: 'ชัยพงศ์เกษม',
        email: 'park@mad.com',
        card_id: '1-5564-66784-53-6',
        phone: '092-939-2897',
        login_id: '6109650124',
        grade: 3.0,
        is_active:'Y',
        line_id: 'parkM2.5',
       
    },
];

export function updateUserStatus(data: updateUserStatusParam): Promise<updateUserStatusRespone> {

    const objIndex = mockData.findIndex((obj) => obj.user_id === data.user_id);
    mockData[objIndex].is_active = data.is_active;

    return Promise.resolve({ result: mockData });
}
