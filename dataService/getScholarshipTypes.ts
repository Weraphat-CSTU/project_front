import axios from "axios";
import 'dotenv'

export type scholarshipTypeData={
    scholarship_type_id:number,
    scholarship_type_name:string,
    create_date:string
}

export type scholarshipTypeBody = {
    result: scholarshipTypeData[];
};

export async function getScholarshiptype() : Promise<scholarshipTypeBody>{
    const result = await axios({
        method:'get',
        url:'/api/scholarship/scholarshipType',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
       })
    
    return Promise.resolve({ result: result.data.result });
}