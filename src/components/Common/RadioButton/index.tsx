import { useEffect, useState } from 'react';
// icons
import { MdOutlineCheckBox } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
interface RadioButtonType {
    value: string;
    name: string;
}

interface RadioBtnListType {
    RadioBtnList: RadioButtonType[];
    defaultRadio?: string;
    func?: (radio: any) => void;
}

const RadioButton = ({ RadioBtnList, defaultRadio, func }: RadioBtnListType) => {
    const [curRadio, setCurRadio] = useState('');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurRadio(event.target.value);
        if (func) func(event.target.value);
    };
    useEffect(() => {
        if (defaultRadio) {
            setCurRadio(defaultRadio);
        }
    }, [defaultRadio]);
    return (
        <fieldset className="flex">
            {RadioBtnList.map((el, idx) => (
                <label
                    key={idx}
                    htmlFor={`${el.value}`}
                >
                    {curRadio === el.value ? (
                        <div className="flex items-center mr-8">
                            <input
                                id={`${el.value}`}
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
                                id={`${el.value}`}
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
