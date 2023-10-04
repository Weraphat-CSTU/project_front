export type userInfoData = {
    userId: string;
    name: string;
    lastname: string;
    email: string;
    cardId: string;
    phone: string;
    studentId: string;
    grade: number;
    is_active: 'Y'|'N';
    lineId: string;
    create_date:string;
};

export type userInfoDataBody = {
    result: userInfoData[];
};

const mockData: userInfoData[] = [
    {
        userId: '1',
        name: 'พีรวิชญ์',
        lastname: 'วิบูลย์ธนากุล',
        email: 'p@mad.com',
        cardId: '1-5464-64664-53-3',
        phone: '092-939-3939',
        studentId: '6109650140',
        grade: 3.75,
        is_active: "N",
        lineId: 'pM2.5',
        create_date:'2023-09-17'
    },
    {
        userId: '2',
        name: 'วีรภัทร์',
        lastname: 'ชัยพงศ์เกษม',
        email: 'park@mad.com',
        cardId: '1-5564-66784-53-6',
        phone: '092-939-2897',
        studentId: '6109650124',
        grade: 3.0,
        is_active: "Y",
        lineId: 'parkM2.5',
        create_date:'2023-10-2'
    },
];

export function getuserinfo(): Promise<userInfoDataBody> {
    return Promise.resolve({ result: mockData });
}