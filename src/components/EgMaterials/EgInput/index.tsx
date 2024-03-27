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
    type?: string | 'text';
    placeholder?: string;
    func?: (value: string) => void;
}

export default function EgInput({ width, type, label, placeholder, func }: EgInputType) {
    const { egPurple } = colors;
    return (
        <Box
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
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => func && func(e.target.value)}
                />
            </div>
        </Box>
    );
}
