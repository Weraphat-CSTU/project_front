
import { scholarshipData } from "./getscholarship"

export type deletescholarshipParam = {
    scholarship_id:string,  
  }
  
  export type deletescholarshipRespone= {
      result : scholarshipData[]
  }
  
  const mockscholarship : scholarshipData[] =  [
      {
        scholarship_type_id:1,
        scholarship_type_name: "ทุนภายใน",
        scholarship_name: "เรียนดี",
        scholarship_year: "2566",
        start_date: "2023-09-11",
        end_date: "2023-09-29",
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
        start_date: "2023-09-15",
        end_date: "2023-09-22",
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
        start_date: "2023-09-15",
        end_date: "2023-09-29",
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

    export function deleteScholarship(data: deletescholarshipParam): Promise<deletescholarshipRespone> {
        const normalResult = mockscholarship.filter((item)=>item.scholarship_id !== data.scholarship_id)

        return Promise.resolve({ result: normalResult });
    }