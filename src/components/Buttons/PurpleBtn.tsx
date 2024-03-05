interface PurpleBtnType {
    content: string;
}
const PurpleBtn = ({ content }: PurpleBtnType) => {
    return <button className="px-6 py-2 m-1 rounded-md bg-egPurple-default text-egWhite-default">{content}</button>;
};

export default PurpleBtn;
