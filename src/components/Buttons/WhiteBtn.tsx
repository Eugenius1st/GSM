interface WhiteBtnType {
    content: string;
}
const WhiteBtn = ({ content }: WhiteBtnType) => {
    return (
        <button className="px-6 py-2 m-1 border rounded-md text-egPurple-default bg-egWhite-default border-egPurple-default">
            {content}
        </button>
    );
};
export default WhiteBtn;
