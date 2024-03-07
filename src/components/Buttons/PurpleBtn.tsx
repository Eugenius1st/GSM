interface PurpleBtnType {
    width?: string | 'fit';
    content: string;
}
const PurpleBtn = ({ content, width }: PurpleBtnType) => {
    return (
        <button className={`px-6 py-2 m-1 rounded-md bg-egPurple-default text-egWhite-default w-${width} `}>
            {content}
        </button>
    );
};

export default PurpleBtn;
