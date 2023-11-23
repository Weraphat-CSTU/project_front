import axios from "axios"

export type followScholarshipData = {
    user_id:string,
    scholarship_id:string,
}

export type followScholarshipDataBody = {
    result : followScholarshipData[]
}

  export async function getFollowScholarship() : Promise<followScholarshipDataBody|undefined>{
    const getToken = sessionStorage.getItem('accessToken');
    const respone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scholarship/followscholarship`,
    {
      headers: {
          Authorization: `Bearer ${getToken}`,
      },
  },
  );

    return Promise.resolve({result : respone.data.result})
    
    
   
}