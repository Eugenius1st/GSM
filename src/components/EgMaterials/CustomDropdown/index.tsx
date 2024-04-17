// hooks
import { useState, useEffect } from 'react';

interface CustomDropdownType {
    placehorder?: string;
    formStyle?: string;
    itemList: string[] | number[];
    inputStyle?: string;
    itemStyle?: string;
    func?: (item: any) => void;
}

const CustomDropdown = ({ placehorder, formStyle, itemList, inputStyle, itemStyle, func }: CustomDropdownType) => {
    const [curValue, setCurValue] = useState('');

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurValue(event.target.value);
        if (func) func(event.target.value);
    };
    return (
        <div className={formStyle}>
            <select
                value={curValue}
                onChange={handleValueChange}
                className={curValue && 'text-egBlack-default'}
            >
                <option
                    value=""
                    disabled
                    hidden
                >
                    {placehorder}
                </option>
                {itemList.map((el, idx) => (
                    <option
                        value={el}
                        key={idx}
                    >
                        {el}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomDropdown;
