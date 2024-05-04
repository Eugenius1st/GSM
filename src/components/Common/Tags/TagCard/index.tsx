import React, { useEffect, useState } from "react";

interface TagType {
  _id: string;
  name: string;
  category: string;
}
interface TagListType {
  defaultTagList?: TagType[];
  tagList: TagType[];
  func?: (tagList: any) => void;
}

const TagCard = ({ tagList, func, defaultTagList }: TagListType) => {
  // 각 태그의 체크 여부를 관리하기 위한 상태
  const [checkedTag, setCheckedTag] = useState<TagType[] | []>([]);
  const tagHandler = (tag: TagType, idx: number) => {
    // 태그가 이미 선택된 경우
    if (checkedTag.some((checkedTag) => checkedTag._id === tag._id)) {
      // 이미 선택된 경우 해당 태그를 삭제
      const newTagDelete = checkedTag.filter(
        (checkedTag) => checkedTag._id !== tag._id
      );
      if (func) func(newTagDelete);
      setCheckedTag((prevCheckedTag) =>
        prevCheckedTag.filter((checkedTag) => checkedTag._id !== tag._id)
      );
    } else {
      // 선택되지 않은 경우 해당 태그를 추가
      const newTagAdd = [...checkedTag, tag];
      if (func) func(newTagAdd);
      setCheckedTag(newTagAdd);
    }
  };
  useEffect(() => {
    if (defaultTagList) setCheckedTag(defaultTagList);
  }, [defaultTagList]);
  return (
    <div>
      {/* 각 태그에 대한 체크박스 생성 */}
      {tagList.map((tag: TagType, idx, number) => (
        <div
          key={idx}
          className={
            checkedTag.some((checkedTag) => checkedTag._id === tag._id)
              ? "inline-block w-fit border bg-egPurple-default border-egPurple-default text-egWhite-default px-2 py-1 rounded-md m-1"
              : "inline-block w-fit border border-egBlack-light text-egBlack-light px-2 py-1 rounded-md m-1 hover:bg-egGrey-light"
          }
          onClick={() => tagHandler(tag, idx)} // 체크박스 상태 변경 이벤트 핸들러
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};

export default TagCard;
