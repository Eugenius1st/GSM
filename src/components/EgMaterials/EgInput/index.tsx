// material UI
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// hooks
import { useState } from 'react';
// colors
import colors from 'assets/colors/palette';
interface EgInputType {
    width?: string | '100%';
    label: string;
    placeholder?: string;
    func?: React.ReactNode;
}

export default function EgInput({ width, label, placeholder, func }: EgInputType) {
    const { egPurple } = colors;
    const [idValue, setIdValue] = useState('');
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '100%' },
            }}
            // noValidate
            // autoComplete="off"
        >
            <div>
                <TextField
                    sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: egPurple.default, // 포커스되었을 때 라벨의 색상
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: egPurple.default, // focus 되었을 때의 border 색상
                            },
                        },
                    }}
                    label={label}
                    placeholder={placeholder}
                    onChange={(e) => setIdValue(e.target.value)}
                    value={idValue}
                />
            </div>
        </Box>
    );
}
