import axios from "axios"

export type historyscholarshipData = {
  scholarship_id:string,  
    scholarship_name: string,
    scholarship_year: string,
    start_date: string,
    end_date: string,
    scholarship_grade:string,
    class_type_id:number,
    create_date:string,
    is_active:'Y',
    scholarship_type_id: number,
    scholarship_condition:string,
    scholarship_qualification:string,
    scholarship_type_name: string,
    class_type_name: string,
    color_tag:string,
    scholarship_year_id:number
}
export type historyScholarshipQuery = {
  scholarship_type_id?: string;
  schoalrship_year?: string;
};
export type historyscholarshipDataBody = {
    result : historyscholarshipData[]
}

  export async function getHistoryScholarship(query:historyScholarshipQuery|undefined) : Promise<historyscholarshipDataBody|undefined>{
    const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/getHistoryScholarship`,{
      params: {
        scholarship_id:query?.scholarship_type_id,
        scholaship_year:query?.schoalrship_year
      },
    }
    )

    return Promise.resolve({result : respone.data.result})
}