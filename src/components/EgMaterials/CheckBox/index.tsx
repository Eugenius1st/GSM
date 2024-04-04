// Material UI
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

//colors
import colors from 'assets/colors/palette';
interface CheckedType {
    checked: boolean;
    func?: () => void;
}
const EgCheckBox = ({ checked, func }: CheckedType) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { egPurple } = colors;
    return (
        <Checkbox
            {...label}
            checked={checked}
            onClick={func}
            sx={{
                // color: egPurple.default,
                '&.Mui-checked': {
                    color: egPurple.default,
                },
            }}
        />
    );
};
export default EgCheckBox;
