import axios from "axios";

export type registerPlayload = {
    firstname: string;
    lastname: string;
    email: string;
    login_id: string;
    password: string;
    card_id: string;
    line_id: string|null;
    grade: number|null;
    phone: string; 
};

export type registerPlayloadRespone = {
    result: true;
};

type Prop = {
    data : registerPlayload;
}
export async function postRegister({data}: Prop): Promise<registerPlayloadRespone> {
    const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/register`,{
        firstname : data.firstname,
        lastname: data.lastname,
        email:data.email,
        login_id: data.login_id,
        password: data.password,
        card_id:data.card_id,
        line_id:data.line_id,
        grade:data.grade,
        phone:data.phone
    })
    return Promise.resolve( {result :  result.data.result });
}
