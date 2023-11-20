import axios from "axios";

export type studentInfoData = {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    card_id: string;
    phone: string;
    is_active: 'Y'|'N';
    login_id: string;
    grade: number;
    line_id: string;
};

export type studentInfoDataBody = {
    result: studentInfoData[];
};

export async function getStudent(): Promise<studentInfoDataBody> {
     const getToken = sessionStorage.getItem('accessToken');

     const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/getStudent`,
     {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
     })
    return Promise.resolve({ result: respone.data.result });
}