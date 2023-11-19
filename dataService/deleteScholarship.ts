
import axios from "axios";
import { scholarshipData } from "./getscholarship"

export type deletescholarshipParam = {
    scholarship_id:string,  
  }
  
  export type deletescholarshipRespone= {
      result : scholarshipData[]
  }
  
  export async function deleteScholarship(
      params: deletescholarshipParam,
  ): Promise<deletescholarshipRespone> {
      const getToken = sessionStorage.getItem('accessToken');
      const respone = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/deleteScholarship`,
          {
              scholarship_id: params.scholarship_id,
          },
          {
              headers: {
                  Authorization: `Bearer ${getToken}`,
              },
          },
      );
  
      return Promise.resolve({ result: respone.data.result });
  }
  
 