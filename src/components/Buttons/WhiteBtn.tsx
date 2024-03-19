interface WhiteBtnType {
    width?: string | 'fit';
    content: string;
    style?: string;
    func?: () => void;
}
const WhiteBtn = ({ content, width, style, func }: WhiteBtnType) => {
    return (
        <button
            onClick={func}
            className={`${style} px-4 py-2 m-1 rounded-md text-egPurple-default bg-egGrey-semiLight hover:bg-egPurple-superLght w-${width} active:bg-egPurple-default active:text-egWhite-default`}
        >
            {content}
        </button>
    );
};
export default WhiteBtn;
