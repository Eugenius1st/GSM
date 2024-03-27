import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface BasicDatePickerTyle {
    content?: string;
}

export default function BasicDatePicker({ content }: BasicDatePickerTyle) {
    const [curDate, setCurDate] = React.useState('');
    let currentDate = (value: any) => {
        let selectedDate = new Date(value.$d);
        let year = selectedDate.getFullYear();
        let month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
        let day = ('0' + selectedDate.getDate()).slice(-2);
        let dateString = year + '/' + month + '/' + day;
        setCurDate(dateString.slice(2));
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex items-center py-1 pr-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default width-40">
                <DatePicker
                    onChange={(value) => currentDate(value)}
                    sx={{
                        left: '-10px',
                        opacity: 1,
                        '.MuiOutlinedInput-input': { display: 'none' },
                        '.MuiOutlinedInput-notchedOutline': { display: 'none' },
                        width: '35px',
                    }}
                />
                {curDate ? (
                    <div className="text-egBlack-default">{curDate}</div>
                ) : (
                    <div className="text-egGrey-default">{content}</div>
                )}
            </div>
        </LocalizationProvider>
    );
}
