import React from 'react';
interface CustomBtnType {
    width?: string | 'fit';
    content: string | React.ReactNode;
    customStyle?: string;
    func?: () => void;
}
const CustomBtn = ({ content, customStyle, func }: CustomBtnType) => {
    return (
        <button
            type="button"
            onClick={func}
            className={customStyle}
        >
            {content}
        </button>
    );
};

export default CustomBtn;
