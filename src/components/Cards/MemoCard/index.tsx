// hooks
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { requestPost, requestDelete } from 'api/basic';
import { useRecoilValue } from 'recoil';
import { LoginAtomSelector } from 'atom/auth';
import { useParams } from 'react-router-dom';
// api
import { decode } from 'api/decode';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Commom
import EmptyCard from 'components/Cards/EmptyCard';
//icons
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
//type
interface FeedbackType {
    _id: string;
    adminId: string;
    createdAt: string;
    detail: string;
    studentId: string;
    type: string;
    updatedAt: string;
}
interface SignificantType {
    _id: string;
    adminId: string;
    createdAt: string;
    detail: string;
    studentId: string;
    type: string;
    updatedAt: string;
}
export interface MemoType {
    salary?: string;
    feedback?: { count: number; result: FeedbackType[] };
    significant: { count: number; result: SignificantType[] };
}

export interface MemoCardType {
    tab: string[];
    annotation: MemoType;
    feedbackRefetchFunc: () => void;
    significantRefetchFunc: () => void;
}

const MemoCard = ({ tab, annotation, feedbackRefetchFunc, significantRefetchFunc }: MemoCardType) => {
    const [memoTab, setMemoTab] = useState(tab[0]);
    const [feedbackInput, setFeedbackInput] = useState('');
    const [significantInput, setSignificantInput] = useState('');
    const { feedback, significant } = annotation;
    const activeTab = 'text-egPurple-default border-b-4 border-egPurple-default px-4 py-1 mx-2';
    const inactiveTab = 'text-egGrey-default border-b-4 border-egGrey-default px-4 py-1 mx-2';
    // admin id
    const adminAtom = useRecoilValue(LoginAtomSelector);
    const adminInfo = decode(adminAtom.accessToken);
    // user id
    const { userId } = useParams();

    // POST 요청을 보낼 함수 정의
    const postFeedback = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
            });
        },
    });
    const postSignificant = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
            });
        },
    });
    // POST 요청 및 기존 coach 배열에 이미 있는 id 인지 확인하는 함수
    const PostFeedback = () => {
        postFeedback.mutate({
            requestUrl: '/annotation/feedback',
            data: {
                studentId: userId,
                adminId: adminInfo.profileId,
                detail: feedbackInput,
            },
        });
    };
    const PostSignificant = () => {
        postSignificant.mutate({
            requestUrl: '/annotation/significant',
            data: {
                studentId: userId,
                adminId: adminInfo.profileId,
                detail: significantInput,
            },
        });
    };

    // DELETE 요청
    const [deleteFeedbackState, setDeleteFeedbackState] = useState(false);
    const [deleteSignificantState, setDeleteSignificantState] = useState(false);

    const deleteFeedback = async (feedbackId: string) => {
        requestDelete({
            requestUrl: `/annotation/feedback/${feedbackId}`,
            flagCheckFunc: setDeleteFeedbackState,
        });
    };

    const deleteSignificant = async (significantId: string) => {
        requestDelete({
            requestUrl: `/annotation/significant/${significantId}`,
            flagCheckFunc: setDeleteSignificantState,
        });
    };

    // REFETCH-POST
    useEffect(() => {
        if (postFeedback.isSuccess) {
            feedbackRefetchFunc();
            setFeedbackInput('');
        }
    }, [postFeedback.isSuccess]);
    useEffect(() => {
        if (postSignificant.isSuccess) {
            significantRefetchFunc();
            setSignificantInput('');
        }
    }, [postSignificant.isSuccess]);
    // REFETCH-DELTE
    useEffect(() => {
        if (deleteFeedbackState) {
            alert('피드백이 삭제되었습니다');
            feedbackRefetchFunc();
            setDeleteFeedbackState(false);
        }
    }, [deleteFeedbackState]);
    useEffect(() => {
        if (deleteSignificantState) {
            alert('특이사항이 삭제되었습니다');
            significantRefetchFunc();
            setDeleteSignificantState(false);
        }
    }, [deleteSignificantState]);
    return (
        <div>
            <div className="p-2 px-2 border border-egGrey-default ">
                <div>
                    {tab.map((el, idx) => (
                        <button
                            type="button"
                            key={idx}
                            onClick={() => setMemoTab(el)}
                            className={`${memoTab === el ? activeTab : inactiveTab}`}
                        >
                            {el === 'feedback' ? '피드백' : '특이사항'}
                        </button>
                    ))}
                </div>
                <div className="mt-2 rounded-md max-h-80">
                    {/* {memoTab === tab[0] && (
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
                    )} */}
                    {memoTab === tab[0] && (
                        <div>
                            <div className="overflow-y-auto max-h-56 ">
                                {feedback?.result && feedback?.result?.length > 0 ? (
                                    feedback.result.map((el, idx) => (
                                        <div
                                            key={idx}
                                            className="relative w-full px-4 py-1 mb-4 rounded-lg bg-egGrey-light"
                                        >
                                            <div className="w-11/12 text-base">{el.detail}</div>
                                            <div className="text-xs text-right">{el.createdAt.slice(0, 10)}</div>
                                            <div className="absolute flex items-center justify-center top-1 right-1">
                                                <MdDelete
                                                    className="w-4 h-4 text-egPurple-default"
                                                    onClick={() => deleteFeedback(el._id)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <EmptyCard
                                            content={'작성된 피드백이 없습니다.'}
                                            customStyle="h-20 text-center text-egPurple-semiLight"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center mt-4">
                                <input
                                    className="w-11/12 p-2 border-2"
                                    value={feedbackInput}
                                    onChange={(e) => setFeedbackInput(e.target.value)}
                                />
                                <WhiteBtn
                                    func={PostFeedback}
                                    content="작성"
                                    width="28"
                                />
                            </div>
                        </div>
                    )}
                    {memoTab === tab[1] && (
                        <div>
                            <div className="overflow-y-auto max-h-56 ">
                                {significant && significant?.result?.length > 0 ? (
                                    significant.result.map((el, idx) => (
                                        <div
                                            key={idx}
                                            className="relative w-full px-4 py-1 mb-4 rounded-lg bg-egGrey-light"
                                        >
                                            <div className="w-11/12 text-base">{el.detail}</div>
                                            <div className="text-xs text-right">{el.createdAt.slice(0, 10)}</div>
                                            <div className="absolute flex items-center justify-center top-1 right-1">
                                                <MdDelete
                                                    className="w-4 h-4 text-egPurple-default"
                                                    onClick={() => deleteSignificant(el._id)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <EmptyCard
                                            content={'작성된 특이사항이 없습니다.'}
                                            customStyle="h-20 text-center text-egPurple-semiLight"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center mt-4">
                                <input
                                    className="w-11/12 p-2 border-2"
                                    value={significantInput}
                                    onChange={(e) => setSignificantInput(e.target.value)}
                                />
                                <WhiteBtn
                                    func={PostSignificant}
                                    content="작성"
                                    width="28"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemoCard;
