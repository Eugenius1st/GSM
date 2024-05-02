interface LightPurpleBtnType {
    width?: string | 'fit';
    content: string;
    customStyle?: string;
    func?: () => void;
}
const LightPurpleBtn = ({ content, width, customStyle, func }: LightPurpleBtnType) => {
    return (
        <button
            type="button"
            onClick={func}
            className={`${customStyle} px-4 py-2 m-1 rounded-md bg-egPurple-semiLight text-egWhite-default w-${width}`}
        >
            {content}
        </button>
    );
};

export default LightPurpleBtn;
