interface CustomBtnType {
    width?: string | 'fit';
    content: string;
    customStyle?: string;
    func?: () => void;
}
const CustomBtn = ({ content, customStyle, func }: CustomBtnType) => {
    return (
        <button
            onClick={func}
            className={customStyle}
        >
            {content}
        </button>
    );
};

export default CustomBtn;
