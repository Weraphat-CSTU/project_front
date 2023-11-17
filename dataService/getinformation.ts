import axios from "axios"

export type infoMationData = {
  
    title: string,
    description: string,
   create_date:string,
}

export type infoMationDataBody = {
    result : infoMationData[]
}

  export async function getInfomation() : Promise<infoMationDataBody>{
    const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/getInformation`,{params:{limit:10,offset:0}})
    console.log(respone)
    return Promise.resolve({result : respone.data.result})
}