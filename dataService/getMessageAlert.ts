export type messageAlertData = {
    description: string;
    create_date: string;
};

export type messageAlertDataBody = {
    result: messageAlertData[];
};
const mockMessageAlert: messageAlertData[] = [
    {
        description: 'นักศึกษาคนไหนที่สนใจจะสมัครทุนเรียนดี เหลือเวลาอีกเพียง 3 วันเท่านั้น!!!',
        create_date: '2023-11-1',
    },
    {
        description:
            'นักศึกษาคนไหนที่สนใจจะสมัครทุนเรียนกยศ วันนี้เปิดรับสมัครวันแรก นักศึกษาคนไหนสนใจสามารถไปติดต่อได้ที่ศูนย์การเรียนรู่(ศกร) ชั้นที่ 1 ใกล้กับร้าน Amazon',
        create_date: '2023-11-2',
    },
];

export function getMessageAlert(): Promise<messageAlertDataBody> {
    return Promise.resolve({ result: mockMessageAlert });
}
