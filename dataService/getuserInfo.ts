export type userInfoData = {
    userId : string,
    name : string,
    lastname : string,
    email : string,
    cardId: string,
    phone: string,
    studentId: string,
    grade : number,
    lineId: string,
}

export type userInfoDataBody = {
    result : userInfoData[]
}

const mockData : userInfoData[] = [{
    userId : '1',
    name : 'วีรภัทร์',
    lastname : 'ชัยพงศ์เกษม',
    email : 'park@mad.com',
    cardId: '1-5464-64664-53-3',
    phone : '092-939-3939',
    studentId: '6043020505',
    grade : 2.75,
    lineId: 'parkM',
}]

export function getuserinfo() : Promise<userInfoDataBody>{
    return Promise.resolve({result : mockData})
}