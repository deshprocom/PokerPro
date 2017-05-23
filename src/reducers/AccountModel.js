/**
 * Created by lorne on 2017/1/4.
 */
import Time from '../utils/time'

export function _createDateData() {
    let currentYear = Time(new Date(), '%y')
    let date = [];
    let years = [];
    let months = [];
    let days = [];

    for (let i = 1900; i <= currentYear; i++) {
        years.push(i + '');
    }
    for (let k = 1; k < 31; k++) {
        days.push(k + '');
    }
    for (let j = 1; j < 13; j++) {
        months.push(j + '');
    }

    date.push(years);
    date.push(months);
    date.push(days);
    return date;
}