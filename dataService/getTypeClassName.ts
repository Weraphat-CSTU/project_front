import got from 'got';
import axios from "axios";
import 'dotenv'

export type classTypeYearData = {
    class_type_id: number;
    class_type_name: string;
    is_active: 'Y' | 'N';
    create_date: string;
};

export type classTypeYearBody = {
    result: classTypeYearData[];
};

export async function getTypeclassname() : Promise<classTypeYearBody>{
    const result = await axios({
        method:'get',
        url:'/api/scholarship/classYearType',
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
       })
    
    return Promise.resolve({ result: result.data.result });
}
