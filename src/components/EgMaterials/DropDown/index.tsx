// materialUI
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// colors
import colors from 'assets/colors/palette';
interface itemListType {
    item: string;
    bgColor: string | '#ffffff';
}
interface DropDownModalType {
    itemList: itemListType[];
}

export default function DropDownModal({ itemList }: DropDownModalType) {
    const { egPurple, egWhite } = colors;
    const [value, setValue] = React.useState(itemList[0].item);
    const [bgColor, setBgColor] = React.useState(egWhite.default);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    const handleIdxChange = (idx: number) => {
        if (itemList[0].bgColor) {
            setBgColor(itemList[idx].bgColor);
        }
    };

    return (
        <Box>
            <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">참석</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // defaultValue={itemList[0]}
                    value={value}
                    onChange={handleChange}
                    sx={{
                        width: '5rem',
                        height: '2.6rem',
                        border: `1px solid ${egPurple.default}`,
                        background: bgColor,
                    }}
                >
                    {itemList[0] &&
                        itemList.map((el, idx) => (
                            <MenuItem
                                key={idx}
                                value={el.item}
                                onClick={() => handleIdxChange(idx)}
                            >
                                {el.item}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    );
}
