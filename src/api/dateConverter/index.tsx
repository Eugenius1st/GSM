export function dateConverter(date: any, range: string) {
    let standardDate = new Date(date);
    let year = standardDate.getFullYear();
    let month = ('0' + (standardDate.getMonth() + 1)).slice(-2);
    let day = ('0' + standardDate.getDate()).slice(-2);
    let hours = ('0' + standardDate.getHours()).slice(-2);
    let minutes = ('0' + standardDate.getMinutes()).slice(-2);
    let dateString = '';

    if (range === 'year') dateString = `${year}`;
    else if (range === 'month') dateString = year + '/' + month;
    else if (range === 'day') dateString = year + '/' + month + '/' + day;
    else if (range === 'month_day') dateString = month + '/' + day;
    else if (range === 'time') dateString = `${hours}:${minutes}`;
    return dateString ? dateString : '개발중';
}
