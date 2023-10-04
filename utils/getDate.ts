import dayjs from "dayjs";
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

dayjs.extend(buddhistEra);
const getDate = (std: string|undefined, edd: string|undefined): string => {
    
    return (

         [dayjs(std)
            .locale('th')
            .format('DD MMMM BBBB'),
        
        dayjs(edd)
            .locale('th')
            .format('DD MMMM BBBB')].join(" - ")
    );
  }

  export default getDate;