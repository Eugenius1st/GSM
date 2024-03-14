interface WhiteBtnType {
    width?: string | 'fit';
    content: string;
    func?: () => void;
}
const WhiteBtn = ({ content, width, func }: WhiteBtnType) => {
    return (
        <button
            className={`px-4 py-2 m-1  rounded-md text-egPurple-default bg-egGrey-default hover:bg-egPurple-superLght w-${width} active:bg-egPurple-default active:text-egWhite-default`}
        >
            {content}
        </button>
    );
};
export default WhiteBtn;
