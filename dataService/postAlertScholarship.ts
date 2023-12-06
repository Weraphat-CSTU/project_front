import axios from "axios";

export type alertEmailScholarshipPlayloadParam ={
    scholarship_id:string,
  }

  export type alertEmailDataRespone = {
    firstname: string,
    lastname: string,
    email:string,
    scholarship_id: string,
    scholarship_name: string
  }

export type alertEmailScholarshipPlayloadRespone = {
    result: alertEmailDataRespone[];
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