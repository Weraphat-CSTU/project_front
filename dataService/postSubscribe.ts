import axios from "axios";

export type createSubscribePlayloadParam ={
    scholarship_id:string,
  }

export type createSubscribePlayloadRespone = {
    result: boolean;
};

export async function postSubscribe(param: createSubscribePlayloadParam): Promise<createSubscribePlayloadRespone> {
   
    const getToken = sessionStorage.getItem('accessToken');
    
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/subscribe/${param.scholarship_id}`,
    {},
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    
    return Promise.resolve( {result : respone.data.result });
}