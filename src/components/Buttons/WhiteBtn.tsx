interface WhiteBtnType {
    width?: string | 'fit';
    content: string;
}
const WhiteBtn = ({ content, width }: WhiteBtnType) => {
    return (
        <button
            className={`px-6 py-2 m-1 border rounded-md text-egPurple-default bg-egWhite-default hover:bg-egPurple-superLght border-egPurple-default w-${width}`}
        >
            {content}
        </button>
    );
};
export default WhiteBtn;
