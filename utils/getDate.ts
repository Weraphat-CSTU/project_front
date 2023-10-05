import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

dayjs.extend(buddhistEra);
function isValidDate(std: string | undefined, edd: string | undefined) {
    // Check if std and edd are defined and non-empty strings
    if (std && edd) {
        // Try creating Date objects from the input strings
        const date = new Date(std);
        const edate = new Date(edd);

        // Check if the Date objects are valid and the input strings were valid dates
        if (Object.prototype.toString.call(date) === '[object Date]') {
            if (!isNaN(date.getTime()) && !isNaN(edate.getTime())) {
                return true;
            }
        } else {
            return false;
        }
    }

    return false;
}
export function getDate(std: string | undefined, edd: string | undefined): string {
    if (isValidDate(std, edd)) {
        return [
            dayjs(std).locale('th').format('DD MMMM BBBB'),

            dayjs(edd).locale('th').format('DD MMMM BBBB'),
        ].join(' - ');
    } else {
        return '-';
    }
    // if (std && edd){

    // }
}
