import axios from "axios";

export type createInfoMationPlayload = {

    title: string,
    description: string,
}

export type createInfoMationPlayloadRespone = {
    result : true;
}

type Prop = {
    data : createInfoMationPlayload
}

  export async function postInfomation({data}:Prop) : Promise<createInfoMationPlayloadRespone>{
    const getToken = sessionStorage.getItem('accessToken');

    const respone = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/addInformation`,{
        title:data.title,
        description:data.description
    },
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    return Promise.resolve({result : respone.data.result})
}