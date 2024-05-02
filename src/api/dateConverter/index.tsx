export function dateConverter(date: any, range: string) {
    let standardDate = new Date(date);
    let year = standardDate.getFullYear();
    let month = ('0' + (standardDate.getMonth() + 1)).slice(-2);
    let day = ('0' + standardDate.getDate()).slice(-2);
    let hours = standardDate.getHours();
    let minutes = standardDate.getMinutes();
    let dateString = '';
    if (range === 'year') dateString = `${year}`;
    else if (range === 'month') dateString = year + '/' + month;
    else if (range === 'day') dateString = year + '/' + month + '/' + day;
    else if (range === 'month_day') dateString = month + '/' + day;
    else if (range === 'time') dateString = `${hours}:${minutes}`;

    return dateString;
}
