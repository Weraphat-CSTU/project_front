import axios from "axios";

export type alertEmailScholarshipPlayloadParam ={
    scholarship_id:string,
  }

export type alertEmailScholarshipPlayloadRespone = {
    result: boolean;
};

export async function postAlertScholarship(param: alertEmailScholarshipPlayloadParam): Promise<alertEmailScholarshipPlayloadRespone> {
   
    const getToken = sessionStorage.getItem('accessToken');

    const respone = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/alertscholarship/${param.scholarship_id}`,
    {},
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    console.log(respone)
    return Promise.resolve( {result : respone.data.result });
}