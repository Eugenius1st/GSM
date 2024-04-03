// hooks
import React, { useState } from 'react';
// 태그 타입 정의
interface TagType {
    [key: string]: boolean;
}
interface TagCardType {
    tagList: string[];
}

const TagCard = ({ tagList }: TagCardType) => {
    // 각 태그의 체크 여부를 관리하기 위한 상태
    const [tagChecked, setTagChecked] = useState<TagType>({});

    // 체크박스의 상태를 변경하는 함수
    const handleCheckboxChange = (tag: string) => {
        setTagChecked((prevChecked) => ({
            ...prevChecked,
            [tag]: !prevChecked[tag], // 해당 태그의 체크 여부를 반전시킴
        }));
    };

    return (
        <div>
            {/* 각 태그에 대한 체크박스 생성 */}
            {tagList.map((tag, index) => (
                <div
                    key={index}
                    className={
                        tagChecked[tag]
                            ? 'inline-block w-fit border bg-egPurple-default border-egPurple-default text-egWhite-default px-2 py-1 rounded-md m-1'
                            : 'inline-block w-fit border border-egBlack-light text-egBlack-light px-2 py-1 rounded-md m-1 hover:bg-egGrey-light'
                    }
                >
                    <input
                        type="checkbox"
                        id={tag}
                        checked={tagChecked[tag]} // 해당 태그의 체크 여부에 따라 체크박스 상태 설정
                        onChange={() => handleCheckboxChange(tag)} // 체크박스 상태 변경 이벤트 핸들러
                        className="hidden"
                    />
                    <div>
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TagCard;
