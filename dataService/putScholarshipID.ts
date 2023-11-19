import axios from "axios"

export type editScholarship = {
    
    scholarship_name: string,
    scholarship_year: string,
    start_date?: string,
    end_date?: string,
    scholarship_grade:string,
    class_type_id:number,
    scholarship_type_id: number,
    scholarship_condition:string,
    scholarship_qualification:string,
    color_tag:string,
}
export type editScholarshipParam ={
    scholarship_id:string,
  }
  
  export type editscholarshipBody = {
      result : true
  }

  type prop = {
    param : editScholarshipParam,
    query : editScholarship
  }

  export async function updateScholarship({param,query}:prop) : Promise<editscholarshipBody|undefined> {
    const getToken = sessionStorage.getItem('accessToken');
    const respone = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/editScholarship/${param?.scholarship_id}`,{
        scholarship_name:query.scholarship_name,
        scholarship_year:query.scholarship_year,
        scholarship_grade:query.scholarship_grade,
        class_type_id:query.class_type_id,
        start_date:query.start_date,
        end_date:query.end_date,
        scholarship_type_id:query.scholarship_type_id,
        color_tag:query.color_tag,
        scholarship_condition:query.scholarship_condition,
        scholarship_qualification:query.scholarship_qualification,
    },
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    return Promise.resolve({result :respone.data.result})
  }