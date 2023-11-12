export type createMessagePlayload = {
    scholarship_name:string
    description : string
}

export type createMessagePlayloadRespone = {
    success: boolean;
};

export function postMessageAlert(data: createMessagePlayload): Promise<createMessagePlayloadRespone> {
    return Promise.resolve( {success :  true });
}