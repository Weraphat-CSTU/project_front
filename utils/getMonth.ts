 const getMonth = (std: string, edd: string): string => {
    let months_th = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return (
      new Date(std).getDate().toString() +
      " " +
      months_th[new Date(std).getMonth()] +
      " " +
      [new Date(std).getFullYear() + 543].toString() +
      " - " +
      new Date(edd).getDate().toString() +
      " " +
      months_th[new Date(edd).getMonth()] +
      " " +
      [new Date(edd).getFullYear() + 543].toString()
    );
  }

  export default getMonth;