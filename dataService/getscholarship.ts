export type scholarshipData = {
    sctype: string,
    scname: string,
    scyear: string,
    std: string,
    edd: string,
}

export type scholarshipDataBody = {
    result : scholarshipData[]
}

const mockscholarship : scholarshipData[] =  [
    {
      sctype: "ทุนภายใน",
      scname: "เรียนดี",
      scyear: "2566",
      std: "2023-09-11",
      edd: "2023-09-29",
    },
    {
      sctype: "ทุนภายนอก",
      scname: "กยศ.",
      scyear: "2566",
      std: "2023-09-15",
      edd: "2023-09-22",
    },
    {
      sctype: "ทุนภายนอก",
      scname: "สนับสนุนเรียนต่อต่างประเทศ",
      scyear: "2566",
      std: "2023-09-15",
      edd: "2023-09-29",
    },
  ]

  export function getScholarship() : Promise<scholarshipDataBody>{
    return Promise.resolve({result : mockscholarship})
}