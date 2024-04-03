interface TagCardType {
    tagList: string[];
}

const TagCard = ({ tagList }: TagCardType) => {
    return (
        <div>
            {/* 각 태그에 대한 체크박스 생성 */}
            {tagList.map((tag, index) => (
                <div
                    key={index}
                    className="inline-block px-3 py-1 m-1 border rounded-md w-fit bg-egPurple-default border-egPurple-default text-egWhite-default"
                >
                    {tag}
                </div>
            ))}
        </div>
    );
};

export default TagCard;
