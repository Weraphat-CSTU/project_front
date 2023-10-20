export type infoMationData = {
  
    title: string,
    description: string,
   create_date:string,
}

export type infoMationDataBody = {
    result : infoMationData[]
}
const mockInformation : infoMationData[] = [
    {
      
      title: "ทุนการศึกษาช่วยเหลือนักศึกษาที่ประสบภัยพิบัติ ประจำปีการศึกษา 2566",
      description: "ทุกปีได้เกิดภัยพิบัติตามธรรมชาติ ก่อให้เกิดความเสียหายต่อทรัพย์สินและประชาชนได้รับความเดือดร้อนเป็นจำนวนมาก",
      create_date: '2023-10-18',
    },
    {
   
      title: "รับสมัคร “ทุนส่งน้องเรียนจบ” มูลนิธิอายิโนะโมะโต๊ะ ประจำปีการศึกษา 2566",
      description: "มูลนิธิอายิโนะโมนโต๊ะ รับสมัครนักศึกษา ระดับชั้นปีที่ 1 ที่มีผลการเรียนดี แต่ขาดแคลนทุนทรัพย์",
     create_date: '2023-10-20'
    },
    {
      title: 'ทุน เรียนดี',
      description: 'นักศึกษาคนไหนที่สนใจจะสมัครทุนเรียนดี เหลือเวลาอีกเพียง 3 วันเท่านั้น!!!',
      create_date: '2023-11-1',
  },
  {
      title: 'ทุน กยศ./กรอ.',
      description:
          'นักศึกษาคนไหนที่สนใจจะสมัครทุนเรียนกยศ วันนี้เปิดรับสมัครวันแรก นักศึกษาคนไหนสนใจสามารถไปติดต่อได้ที่ศูนย์การเรียนรู่(ศกร) ชั้นที่ 1 ใกล้กับร้าน Amazon',
      create_date: '2023-11-2',
  },
  {
      title: 'ประกาศจากเจ้าหน้า',
      description:
          'เร็วๆนี้จะมีระบบติดตามทุน อัพเดตเข้ามา ทำให้ไม่สามารถเข้าใช้ระบบได้ในช่วงเวลา 23.00 น. - 10.00 น. ของวันจันทร์ที่ 6 พฤศจิกายน 2566',
      create_date: '2023-11-3',
  },
  ]

  export function getInfomation() : Promise<infoMationDataBody>{
    return Promise.resolve({result : mockInformation})
}