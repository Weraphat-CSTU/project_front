export type scholarshipData = {
  scholarship_id:string,  
    scholarship_name: string,
    scholarship_year: string,
    start_date: string,
    end_date: string,
    scholarship_grade:number,
    class_type_id:number,
    description:string,
    create_date:string,
    is_active:'Y'|'N',
    scholarship_type_id: number,
    scholarship_condition_name:string,
    scholarship_qualification_name:string,
    scholarship_type_name: string,
    class_type_name: string,
    tag_color:string,
    scholarship_year_id:number
}

export type scholarshipDataParam ={
  scholarship_id?:string,
}

export type scholarshipDataBody = {
    result : scholarshipData[]
}

const mockscholarship : scholarshipData[] =  [
    {
      scholarship_type_id:1,
      scholarship_type_name: "ทุนภายใน",
      scholarship_name: "เรียนดี",
      scholarship_year: "2566",
      scholarship_year_id:0,
      start_date: "2023-09-27",
      end_date: "2023-10-15",
      class_type_id:0,
      create_date:"2023-09-11",
      description:"ทุนเพื่อการศึกษา",
      is_active:'Y',
      scholarship_condition_name:"เกรดเฉลี่ย 3.00 ขึ้นไป",
      scholarship_grade:3.00,
      scholarship_id:"0",
      scholarship_qualification_name:"มีจิตอาสา",
      class_type_name: "ทุกชั้นปี",
      tag_color:"#87D57C"
    },
    {
      scholarship_type_id:2,
      scholarship_type_name: "ทุนภายนอก",
      scholarship_name: "กยศ.",
      scholarship_year: "2566",
      scholarship_year_id:0,
      start_date: "2023-09-29",
      end_date: "2023-10-20",
      class_type_id:0,
      create_date:"2023-09-11",
      description:"ทุนเพื่อการศึกษา",
      is_active:'Y',
      scholarship_condition_name:"เกรดเฉลี่ย 3.00 ขึ้นไป",
      scholarship_grade:3.00,
      scholarship_id:"1",
      scholarship_qualification_name:"มีจิตอาสา",
      class_type_name: "ทุกชั้นปี",
      tag_color:"#0250E3"
    },
    {
      scholarship_type_id:2,
      scholarship_type_name: "ทุนภายนอก",
      scholarship_name: "สนับสนุนเรียนต่อต่างประเทศ",
      scholarship_year: "2566",
      scholarship_year_id:0,
      start_date: "2023-09-29",
      end_date: "2023-10-20",
      class_type_id:0,
      create_date:"2023-09-11",
      description:"ทุนเพื่อการศึกษา",
      is_active:'Y',
      scholarship_condition_name:"เกรดเฉลี่ย 3.00 ขึ้นไป",
      scholarship_grade:3.00,
      scholarship_id:"2",
      scholarship_qualification_name:"มีจิตอาสา",
      class_type_name: "ทุกชั้นปี",
      tag_color:"#F5A01E"
    },
  ]

  export function getScholarship(param?:scholarshipDataParam) : Promise<scholarshipDataBody|undefined>{
    if(param && param.scholarship_id){
      const foundScholarshipId = mockscholarship.filter((obj) => obj.scholarship_id === param.scholarship_id )
      return Promise.resolve({result : foundScholarshipId})
    }
    return Promise.resolve({result : mockscholarship})
}