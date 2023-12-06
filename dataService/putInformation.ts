import axios from "axios"

export type editInformation = {
  
   title:string,
   description:string
}
export type editInformationParam ={
    info_id:string,
  }
  
  export type editInformationBody = {
      result : true
  }

  type prop = {
    param : editInformationParam,
    query : editInformation
  }

  export async function updateInformation({param,query}:prop) : Promise<editInformationBody|undefined> {
    const getToken = sessionStorage.getItem('accessToken');
    console.log(param);
    console.log(query);
    const respone = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/editInformation/${param?.info_id}`,{
        title:query.title,
        description:query.description
    },
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    return Promise.resolve({result :respone.data.result})
  }