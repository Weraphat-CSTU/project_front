export type followScholarshipData = {
    scholarship_name: string,
    scholarship_year: string,
    start_date: string,
    end_date: string,
    create_date:string,
    scholarship_type_id: number,
    scholarship_type_name: string,
    scholarship_id:string,
}

export type followScholarshipDataParam ={
    scholarship_id?:string,
  }

export type followScholarshipDataBody = {
    result : followScholarshipData[]
}

const mockscholarship : followScholarshipData[] =  [
    {
      scholarship_type_id:1,
      scholarship_type_name: "ทุนภายใน",
      scholarship_name: "เรียนดี",
      scholarship_year: "2566",
      start_date: "2023-09-27",
      end_date: "2023-10-15",
      create_date:"2023-09-11",
      scholarship_id:"0",
    },
    {
      scholarship_type_id:2,
      scholarship_type_name: "ทุนภายนอก",
      scholarship_name: "กยศ.",
      scholarship_year: "2566",
      start_date: "2023-09-29",
      end_date: "2023-10-20",
      create_date:"2023-09-11",
      scholarship_id:"1",
    },
    {
      scholarship_type_id:2,
      scholarship_type_name: "ทุนภายนอก",
      scholarship_name: "สนับสนุนเรียนต่อต่างประเทศ",
      scholarship_year: "2566",
      start_date: "2023-09-29",
      end_date: "2023-10-20",
      create_date:"2023-09-11",
      scholarship_id:"2",
    },
  ]

  export function getScholarship(param?:followScholarshipDataParam) : Promise<followScholarshipDataBody|undefined>{
    if(param && param.scholarship_id){
      const foundScholarshipId = mockscholarship.filter((obj) => obj.scholarship_id === param.scholarship_id )
      return Promise.resolve({result : foundScholarshipId})
    }
    return Promise.resolve({result : mockscholarship})
}