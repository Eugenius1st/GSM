// Material UI
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

//colors
import colors from 'assets/colors/palette';
interface CheckedType {
    checked: boolean;
}
const EgCheckBox = ({ checked }: CheckedType) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { egPurple } = colors;
    return (
        <div>
            <Checkbox
                {...label}
                checked={checked}
                sx={{
                    // color: egPurple.default,
                    '&.Mui-checked': {
                        color: egPurple.default,
                    },
                }}
            />
        </div>
    );
};
export default EgCheckBox;
