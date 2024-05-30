// hooks
import { useState, useEffect } from 'react';

interface ClassGroupDropdownType {
    placehorder?: string;
    value?: string | number | undefined;
    formStyle?: string;
    itemList: { _id?: string; name: string; description: string }[];
    inputStyle?: string;
    itemStyle?: string;
    func?: (item: any) => void;
}

const ClassGroupDropdown = ({
    placehorder,
    value,
    formStyle,
    itemList,
    inputStyle,
    itemStyle,
    func,
}: ClassGroupDropdownType) => {
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
                        value={el.name}
                        key={idx}
                    >
                        {`${el.name} (${el.description})`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ClassGroupDropdown;
