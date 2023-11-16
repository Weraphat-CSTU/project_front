import axios from "axios";

export type createScholarshipPlayload = {
    scholarship_name: string;
    scholarship_year: string;
    start_date?: string;
    end_date?: string;
    scholarship_grade: string;
    scholarship_type_id: number;
    class_type_id: number;
    scholarship_condition: string;
    scholarship_qualification: string;
    color_tag: string;
}

export type createScholarshipPlayloadRespone = {
    result: true;
};

type Prop = {
    data : createScholarshipPlayload;
}

export async function postCreateScholarship({data}: Prop): Promise<createScholarshipPlayloadRespone> {
   
    const getToken = sessionStorage.getItem('accessToken');
    console.log(data)
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/addScholarship`,{
        scholarship_name:data.scholarship_name,
        scholarship_year:data.scholarship_year,
        scholarship_grade:data.scholarship_grade,
        class_type_id:data.class_type_id,
        start_date:data.start_date,
        end_date:data.end_date,
        scholarship_type_id:data.scholarship_type_id,
        color_tag:data.color_tag,
        scholarship_condition:data.scholarship_condition,
        scholarship_qualification:data.scholarship_qualification,
    },
    {
        headers: {
            Authorization: `Bearer ${getToken}`,
          },
    })
    
    return Promise.resolve( {result : respone.data.result });
}