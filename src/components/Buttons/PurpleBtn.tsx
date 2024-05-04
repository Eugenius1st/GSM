interface PurpleBtnType {
    width?: string | 'fit';
    content: string;
    customStyle?: string;
    func?: () => void;
}
const PurpleBtn = ({ content, width, customStyle, func }: PurpleBtnType) => {
    return (
        <button
            type="button"
            onClick={func && func}
            className={` px-4 py-2 m-1 rounded-md bg-egPurple-default text-egWhite-default w-${width}`}
        >
            {content}
        </button>
    );
};

export default PurpleBtn;
