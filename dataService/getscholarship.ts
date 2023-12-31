import axios from "axios"

export type scholarshipData = {
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

export type scholarshipDataBody = {
    result : scholarshipData[]
}

  export async function getScholarship() : Promise<scholarshipDataBody|undefined>{
    const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/getScholarshipAll`)

    return Promise.resolve({result : respone.data.result})
}