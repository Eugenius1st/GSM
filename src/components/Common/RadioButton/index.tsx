import { useState } from 'react';

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
        <fieldset>
            {RadioBtnList.map((el, idx) => (
                <label
                    key={idx}
                    className="mr-8"
                    htmlFor={`${idx}`}
                >
                    <input
                        id={`${idx}`}
                        type="radio"
                        name={el.name}
                        value={el.value}
                        checked={curRadio === el.value}
                        onChange={handleRadioChange}
                    />
                    <span className={curRadio === el.value ? 'text-egBlack-semiLght ml-2' : 'ml-2'}>{el.name}</span>
                </label>
            ))}
        </fieldset>
    );
};

export default RadioButton;
