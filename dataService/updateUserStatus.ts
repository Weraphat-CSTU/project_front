import axios from 'axios';
import { studentInfoData } from './getStudent';

export type updateUserStatusParam = {
    user_id: string;
   
};

export type updateUserStatusRespone = {
    result: studentInfoData[];
};

export async function updateUserStatus(params: updateUserStatusParam): Promise<updateUserStatusRespone> {
    const getToken = sessionStorage.getItem('accessToken');
    const respone = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/updatestatus`,
        {
            user_id: params.user_id,
           
        },
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
            },
        },
    );

    return Promise.resolve({ result: respone.data.result });
}
