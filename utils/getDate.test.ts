import {getDate} from './getDate';

describe('Test function getDate', () => {
    test('should be return Valid format', () => {
        expect(getDate('2023-09-11', '2023-09-29')).toBe('11 กันยายน 2566 - 29 กันยายน 2566');
    });

    test('should be return Valid format', () => {
        expect(getDate('2023-10-11', '2023-10-29')).toBe('11 ตุลาคม 2566 - 29 ตุลาคม 2566');
    });

    test('should be return Valid format', () => {
        expect(getDate('2024-10-11', '2024-10-29')).toBe('11 ตุลาคม 2567 - 29 ตุลาคม 2567');
    });

    test('should be return - , if format date is undefined', () => {
        expect(getDate(undefined, '2023-09-29')).toBe('-');
    });

    test('should be return - , if format date is undefined', () => {
        expect(getDate(undefined, undefined)).toBe('-');
    });

    test('should be return - , if format date is a string character', () => {
        expect(getDate('abcdefg', '2023-09-29')).toBe('-');
    });

    test('should be return - , if format date is a string character', () => {
        expect(getDate('1234', '2023-09-29')).toBe('-');
    });

    test('should be return - , if format date is a string character', () => {
        expect(getDate('null', 'null')).toBe('-');
    });
});
