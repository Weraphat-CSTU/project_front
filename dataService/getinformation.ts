export type infoMationData = {
    imname: string,
    headname: string,
    infoname: string,
    desname: string,
}

export type infoMationDataBody = {
    result : infoMationData[]
}
const mockInformation : infoMationData[] = [
    {
      imname: "ภาพ",
      headname: "ข่าวสาร",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร",
      desname: "เพิ่มเติม",
    },
    {
      imname: "ภาพ2",
      headname: "ข่าวสาร2",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร2",
      desname: "เพิ่มเติม2",
    },
    {
      imname: "ภาพ3",
      headname: "ข่าวสาร3",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร3",
      desname: "เพิ่มเติม3",
    },
    {
      imname: "ภาพ4",
      headname: "ข่าวสาร4",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร4",
      desname: "เพิ่มเติม4",
    },
    {
      imname: "ภาพ5",
      headname: "ข่าวสาร5",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร5",
      desname: "เพิ่มเติม5",
    },
    {
      imname: "ภาพ6",
      headname: "ข่าวสาร6",
      infoname: "รายละเอียดต่างๆเกี่ยวกับข่าวสาร6",
      desname: "เพิ่มเติม6",
    },
  ]

  export function getInfomation() : Promise<infoMationDataBody>{
    return Promise.resolve({result : mockInformation})
}