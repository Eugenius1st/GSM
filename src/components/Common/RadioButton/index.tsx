import { useState } from 'react';
// icons
import { MdOutlineCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
interface RadioButtonType {
    checked: boolean;
    value: string;
    name: string;
}

interface RadioBtnListType {
    RadioBtnList: RadioButtonType[];
}

const RadioButton = ({ RadioBtnList }: RadioBtnListType) => {
    const [curRadio, setCurRadio] = useState('');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurRadio(event.target.value);
    };
    return (
        <fieldset className="flex">
            {RadioBtnList.map((el, idx) => (
                <label
                    key={idx}
                    htmlFor={`${idx}`}
                >
                    {curRadio === el.value ? (
                        <div className="flex items-center mr-8">
                            <input
                                id={`${idx}`}
                                type="radio"
                                name={el.name}
                                value={el.value}
                                checked={curRadio === el.value}
                                onChange={handleRadioChange}
                                className="hidden"
                            />
                            <MdOutlineCheckBox className="text-egPurple-default" />
                            <span className="ml-2 text-egPurple-default">{el.name}</span>
                        </div>
                    ) : (
                        <div className="flex items-center mr-8 ">
                            <input
                                id={`${idx}`}
                                type="radio"
                                name={el.name}
                                value={el.value}
                                checked={curRadio === el.value}
                                onChange={handleRadioChange}
                                className="hidden"
                            />
                            <MdCheckBoxOutlineBlank />
                            <span className="ml-2">{el.name}</span>
                        </div>
                    )}
                </label>
            ))}
        </fieldset>
    );
};

export default RadioButton;
