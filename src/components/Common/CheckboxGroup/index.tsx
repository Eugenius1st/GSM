// hooks
import React, { useState } from 'react';
// icons
import { MdOutlineCheckBox } from 'react-icons/md';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
interface CheckboxGroupProps {
    options: string[];
    onChange: (selectedOptions: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const optionStyle = 'w-full p-2 border border-egGrey-default mt-[-1px]';
    const handleCheckboxChange = (option: string) => {
        const currentIndex = selectedOptions.indexOf(option);
        const newSelectedOptions = [...selectedOptions];

        if (currentIndex === -1) {
            newSelectedOptions.push(option);
        } else {
            newSelectedOptions.splice(currentIndex, 1);
        }

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };
    return (
        <div>
            {options.map((option, index) => (
                <div
                    key={index}
                    className={optionStyle}
                >
                    <input
                        type="checkbox"
                        id={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="hidden"
                    />
                    {selectedOptions.includes(option) ? (
                        <label
                            htmlFor={option}
                            className="flex items-center "
                        >
                            <MdOutlineCheckBox className="mr-2 text-egPurple-default" />
                            {option}
                        </label>
                    ) : (
                        <label
                            htmlFor={option}
                            className="flex items-center text-egGrey-default"
                        >
                            <MdOutlineCheckBoxOutlineBlank className="mr-2" />
                            {option}
                        </label>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;
