// hooks
import { useState } from 'react';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
//icons
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
//type
interface FeedbackType {
    date: string;
    content: string;
}
interface SignificantType {
    date: string;
    content: string;
}
export interface MemoType {
    salary?: string;
    feedback?: FeedbackType[];
    significant: SignificantType[];
}

export interface MemoCardType {
    tab: string[];
    memo: MemoType;
}

const MemoCard = ({ tab, memo }: MemoCardType) => {
    const [memoTab, setMemoTab] = useState(tab[0]);
    const activeTab = 'text-egWhite-default bg-egPurple-default font-base';
    const inactiveTab = 'text-egPurple-default bg-egGrey-semiLight font-base hover:bg-egPurple-light';
    return (
        <div>
            <div>
                {tab.map((el, idx) => (
                    <button
                        type="button"
                        key={idx}
                        onClick={() => setMemoTab(el)}
                        className={`px-4 py-2 ml-2 rounded-md ${memoTab === el ? activeTab : inactiveTab}`}
                    >
                        {el}
                    </button>
                ))}
            </div>
            <div className="p-2 px-2 mt-2 border-2 border-egPurple-superLight ">
                <div className="overflow-y-auto rounded-md max-h-80">
                    {memoTab === tab[0] && (
                        <div>
                            {tab[0] == '임금' ? (
                                <div>{memo.salary}</div>
                            ) : (
                                memo?.feedback?.map((el, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-full px-4 py-1 mb-4 rounded-lg bg-egPurple-superLight"
                                    >
                                        <div className="w-11/12 text-base">{el.content}</div>
                                        <div className="text-xs text-right">{el.date}</div>
                                        <div className="absolute flex items-center justify-center top-1 right-1">
                                            <MdEdit className="w-4 h-4 text-egPurple-default" />
                                            <MdDelete className="w-4 h-4 text-egPurple-default" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {memoTab === tab[1] && (
                        <div>
                            {tab[1] == '특이사항' &&
                                memo.significant.map((el, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-full px-4 py-1 mb-4 rounded-lg bg-egGrey-light"
                                    >
                                        <div className="w-11/12 text-base">{el.content}</div>
                                        <div className="text-xs text-right">{el.date}</div>
                                        <div className="absolute flex items-center justify-center top-1 right-1">
                                            <MdEdit className="w-4 h-4 text-egPurple-default" />
                                            <MdDelete className="w-4 h-4 text-egPurple-default" />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {memoTab !== '임금' && (
                    <div className="flex justify-center mt-4">
                        <input className="w-11/12 border-2 " />
                        <PurpleBtn
                            content="작성"
                            width="28"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoCard;
