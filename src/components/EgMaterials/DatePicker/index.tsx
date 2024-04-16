import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// icons
import { AiOutlineCalendar } from 'react-icons/ai';

interface BasicDatePickerTyle {
    content?: string;
    range?: 'year' | 'month' | 'day';
    isMobile?: boolean;
}

export default function BasicDatePicker({ content, range, isMobile }: BasicDatePickerTyle) {
    const [curDate, setCurDate] = React.useState('');
    let currentDate = (value: any) => {
        let selectedDate = new Date(value.$d);
        let year = selectedDate.getFullYear();
        let month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
        let day = ('0' + selectedDate.getDate()).slice(-2);
        let dateString = '';
        if (range === 'year') dateString = `${year}`;
        else if (range === 'month') dateString = year + '/' + month;
        else dateString = year + '/' + month + '/' + day;
        setCurDate(dateString);
    };
    console.log('curDate', curDate);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isMobile ? (
                <div className="mr-1">
                    <DatePicker
                        label={content}
                        sx={{
                            opacity: 1,
                            width: '110px',
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center py-1 pr-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default width-40">
                    <DatePicker
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
            )}
        </LocalizationProvider>
    );
}
