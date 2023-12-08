import axios from "axios"

export type manageScholarshipData = {
  scholarship_id:string,  
    scholarship_name: string,
    scholarship_year: string,
    start_date: string,
    end_date: string,
    scholarship_grade:string,
    class_type_id:number,
    create_date:string,
    is_active:'Y'|'N',
    scholarship_type_id: number,
    scholarship_condition:string,
    scholarship_qualification:string,
    scholarship_type_name: string,
    class_type_name: string,
    color_tag:string,
    scholarship_year_id:number
}
export type manageScholarshipQuery = {
  scholarship_type_id?: string;
  schoalrship_year?: string;
};
export type manageScholarshipDataBody = {
    result : manageScholarshipData[]
}

  export async function getManageScholarship(query:manageScholarshipQuery|undefined) : Promise<manageScholarshipDataBody|undefined>{
    const getToken = sessionStorage.getItem('accessToken');
    const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/getManageScholarship`,
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
          params: {
            scholarship_id:query?.scholarship_type_id,
            scholaship_year:query?.schoalrship_year
          },
    })

    return Promise.resolve({result : respone.data.result})
}