import axios from "axios";

export type userInfoData = {
    is_active: string;
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    card_id: string;
    phone: string;
    login_id: string;
    grade: number;
    line_id: string;
};

export type userInfoDataBody = {
    result: userInfoData[];
};

export async function getuserinfo(): Promise<userInfoDataBody> {
     const getToken = sessionStorage.getItem('accessToken');

     const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/getUserProfile`,
     {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
     })
    return Promise.resolve({ result: respone.data.result });
}