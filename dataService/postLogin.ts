import axios from "axios";

export type loginPlayload = {
    username: string;
    password: string;
};

export type loginPlayloadResponse = {
    result: { accessToken: string };
};

type Prop = {
    data : loginPlayload;
}
export async function postLogin({ data }: Prop): Promise<loginPlayloadResponse> {
    const respone = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/login`,{
        username: data.username,
        password:data.password
    })
    return Promise.resolve({ result: { accessToken: respone.data.result.accessToken } });
}
