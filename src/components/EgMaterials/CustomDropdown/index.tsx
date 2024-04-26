// hooks
import { useState, useEffect } from 'react';

interface CustomDropdownType {
    placehorder?: string;
    value?: string | number | undefined;
    formStyle?: string;
    itemList: string[] | number[];
    inputStyle?: string;
    itemStyle?: string;
    func?: (item: any) => void;
}

const CustomDropdown = ({
    placehorder,
    value,
    formStyle,
    itemList,
    inputStyle,
    itemStyle,
    func,
}: CustomDropdownType) => {
    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (func) func(event.target.value);
    };
    return (
        <div className={formStyle}>
            <select
                value={value}
                onChange={handleValueChange}
                className={value ? 'text-egBlack-default' : ''}
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
