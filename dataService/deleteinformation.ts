
import axios from "axios";
import { infoMationData } from "./getinformation";

export type deleteinformationParam = {
    info_id:string,  
  }
  
  export type deleteinformationRespone= {
      result : infoMationData[]
  }
  
  export async function deleteInformation(
      params: deleteinformationParam,
  ): Promise<deleteinformationRespone> {
      const getToken = sessionStorage.getItem('accessToken');
      const respone = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/deleteInformation`,
          {
              info_id: params.info_id,
          },
          {
              headers: {
                  Authorization: `Bearer ${getToken}`,
              },
          },
      );
  
      return Promise.resolve({ result: respone.data.result });
  }
  
 