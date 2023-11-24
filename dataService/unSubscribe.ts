import axios from "axios";

export type unSubscribePlayloadParam ={
    subscribe_id:string,
  }

export type unSubscribePlayloadRespone = {
    result: boolean;
};

export async function unSubscribe(param: unSubscribePlayloadParam): Promise<unSubscribePlayloadRespone> {
   
    const getToken = sessionStorage.getItem('accessToken');
    
    const respone = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/unSubscribe/${param.subscribe_id}`,
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    
    return Promise.resolve( {result : respone.data.result });
}