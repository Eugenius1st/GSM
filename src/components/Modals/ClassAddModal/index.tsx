// hooks
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// api
import { requestGet, requestPost } from 'api/basic';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// Cards
import TagCard from 'components/Common/Tags/TagCard';
import MemoCard from 'components/Cards/MemoCard';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { FiPlus } from 'react-icons/fi';
import { IoMdSearch } from 'react-icons/io';
// Modals
import SearchModal from 'components/Modals/SearchModal';
import { AdminDataType } from 'components/Modals/SearchModal';
import BasicModal from 'components/Modals/BasicModal';
// Alerts
import BasicAlert from 'components/Alerts/BasicAlert';
// utils
import { trainingCourseOptions } from 'utility/standardConst';

interface ClassAddModalType {
    isSuccess: boolean;
    setIsSuccess: (isSuccess: boolean) => void;
}
const ClassAddModal = ({ isSuccess, setIsSuccess }: ClassAddModalType) => {
    const isMobile = useRecoilValue(IsMobileSelector);
    const personalClassGroupList = ['개인레슨반'];

    const [lessonType, setLessonType] = useState<string>('group');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [place, setPlace] = useState('판교점');
    const [classType, setClassType] = useState('practice');
    const [classGroups, setClassGroups] = useState([]);
    const [amount, setAmount] = useState('');
    const [masking, setMasking] = useState(0);

    const [coaches, setCoaches] = useState<any>([]);
    const [className, setClassName] = useState('개발중');
    const [note, setNote] = useState('');

    const [isShow, setIsShow] = useState(false);

    const [addClassGroupNameInput, setAddClassGroupNameInput] = useState('');
    const [addClassGroupDescriptionInput, setAddClassGroupDescriptionInput] = useState('');
    const [addClassGroupFlag, setAddClassGroupFlag] = useState(false);

    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    // GET ClassGroup
    const getClassGroup = useQuery({
        queryKey: ['allClassGroup'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/classGroup`,
            });
        },
        staleTime: 5 * 1000,
    });
    useEffect(() => {
        if (addClassGroupFlag) {
            getClassGroup.refetch();
            setAddClassGroupFlag(false);
        }
    }, [addClassGroupFlag]);

    // POST 수업추가 요청을 보낼 함수 정의
    const flagCheckFunc = (flag: boolean) => {
        setIsSuccess(flag);
    };
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
            // return requestPost({ requestUrl: requestUrl, id: id, pw: pw, successFunc: setLoginSelector });
        },
    });
    const postClass = () => {
        const coachIdArray = coaches ? coaches.map((coach: { _id: string }) => coach._id) : [];
        // POST 요청에 보낼 데이터

        mutation.mutate({
            requestUrl: '/class',
            data: {
                startTime: startTime,
                endTime: endTime,
                applicationDeadline: applicationDeadline,
                place: place,
                lessonType: lessonType,
                classType: classType,
                classGroups: classGroups.map((el: any) => el.name),
                name: className,
                amount: 10,
                masking: masking,
                coaches: coachIdArray,
                note: note,
            },
            successFunc: setIsSuccess,
        });
    };

    // POST CLASS GROUP 요청을 보낼 함수 정의
    const classGroupMutate = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: setAddClassGroupFlag,
            });
        },
    });
    const postFeedback = () => {
        if (addClassGroupNameInput && addClassGroupDescriptionInput) {
            classGroupMutate.mutate({
                requestUrl: '/classgroup',
                data: {
                    name: addClassGroupNameInput,
                    description: addClassGroupDescriptionInput,
                },
            });
        } else {
            alert('클래스 그룹명 또는 설명을 입력하세요');
        }
    };

    const handleClean = () => {
        setStartTime('');
        setEndTime('');
        setApplicationDeadline('');
        setPlace('판교점');
        setClassType('practice');
        setClassName('');
        setAmount('');
        setMasking(0);
        setCoaches([]);
        setIsShow(false);
        setIsSuccess(false);
    };

    const dataValidate = () => {
        if (!startTime) {
            alert('시작 시간을 입력하세요');
            return false;
        } else if (!endTime) {
            alert('종료 시간을 입력하세요');
            return false;
        } else if (!applicationDeadline) {
            alert('신청 마감 시간을 입력하세요');
            return false;
        } else if (!place) {
            alert('수업 장소를 입력하세요');
            return false;
        } else if (!classType) {
            alert('이론, 실기 구분을 입력하세요');
            return false;
        } else if (!className) {
            alert('수업 명을 입력하세요');
            return false;
        } else if (!amount) {
            alert('제한 인원을 입력하세요');
            return false;
        }
        return true;
    };
    const handleAddCoaches = (coachInfo: AdminDataType) => {
        const isIdMatch = coaches.some((coach: any) => coach._id === coachInfo._id);

        // _id가 일치하지 않는 경우에만 추가
        if (!isIdMatch) {
            // 새로운 배열을 만들어서 coachInfo 추가
            const updatedCoaches = [...coaches, coachInfo];
            // state 업데이트
            setCoaches(updatedCoaches);
        } else {
            alert('이미 추가한 코치입니다.');
        }
    };
    const handleDeleteCoaches = (idx: number) => {
        const newCoachList = [...coaches];
        if (newCoachList.length > 0) {
            newCoachList.splice(idx, 1);
            setCoaches(newCoachList);
        }
    };

    const submitData = () => {
        const checkValid = dataValidate();
        if (checkValid) postClass();
    };

    useEffect(() => {
        setClassType('practice');
    }, [className]);
    return (
        <div>
            <WhiteBtn
                content="+ 수업 추가"
                func={handleShowModal}
            />
            {isShow && isSuccess ? (
                <BasicAlert
                    alertContents="수업 등록이 완료되었습니다"
                    alertFooterActiveFunc={handleClean}
                    alertFooterActiveBtn="확인"
                />
            ) : (
                <></>
            )}
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div
                        className={
                            isMobile
                                ? 'fixed bg-egWhite-default z-[70] w-11/12 h-2/3 overflow-y-scroll p-4 rounded-lg'
                                : 'fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg'
                        }
                    >
                        <div className="flex justify-between">
                            <div className="mb-2 text-lg font-bold">수업 추가하기</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between px-1 py-2 border items border-egGrey-default">
                                <span className="ml-1 text-lg w-28">수업 형태</span>
                                <div className="flex items-center text-egGrey-default">
                                    <div className="mr-1">
                                        <input
                                            type="radio"
                                            id="group"
                                            name="lessonType"
                                            value="group"
                                            className="hidden"
                                            defaultChecked={true}
                                            onChange={(e) => setLessonType(e.target.value)}
                                        />
                                        <label
                                            htmlFor="group"
                                            className={
                                                lessonType === 'group'
                                                    ? 'px-5 py-2 border rounded-md border-egPurple-default text-egPurple-default'
                                                    : 'px-5 py-2 border rounded-md border-egGrey-default'
                                            }
                                        >
                                            단체
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="personal"
                                            name="lessonType"
                                            value="personal"
                                            className="hidden"
                                            onChange={(e) => setLessonType(e.target.value)}
                                        />
                                        <label
                                            htmlFor="personal"
                                            className={
                                                lessonType === 'personal'
                                                    ? 'px-5 py-2 border rounded-md border-egPurple-default text-egPurple-default'
                                                    : 'px-5 py-2 border rounded-md border-egGrey-default'
                                            }
                                        >
                                            개인
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 수업명 */}
                            <div className="flex items-center justify-between px-1 py-2 mt-[-1px] border border-egGrey-default">
                                <label
                                    htmlFor="className"
                                    className="ml-1 text-lg w-28"
                                >
                                    수업명
                                </label>
                                <div className="flex items-center">
                                    <select
                                        name="className"
                                        id="className"
                                        className="w-32 p-1 "
                                        onChange={(e) => setClassName(e.target.value)}
                                    >
                                        {lessonType === 'group'
                                            ? trainingCourseOptions.map((el, idx) => (
                                                  <option
                                                      key={idx}
                                                      value={el}
                                                  >
                                                      {el}
                                                  </option>
                                              ))
                                            : personalClassGroupList.map((el, idx) => (
                                                  <option
                                                      key={idx}
                                                      value={el}
                                                  >
                                                      {el}
                                                  </option>
                                              ))}
                                    </select>
                                </div>
                            </div>

                            {/* 수업 분류 */}
                            {className === '엘리트반(초3-6/중,고,대)' && (
                                <div className="flex justify-between px-1 py-2 border items border-egGrey-default mt-[-1px]">
                                    <span className="ml-1 text-lg w-28">수업분류</span>
                                    <div className="flex items-center text-egGrey-default">
                                        <div className="mr-1">
                                            <input
                                                type="radio"
                                                id="practice"
                                                name="classification"
                                                value="practice"
                                                className="hidden"
                                                defaultChecked={true}
                                                onChange={(e) => setClassType(e.target.value)}
                                            />
                                            <label
                                                htmlFor="practice"
                                                className={
                                                    classType === 'practice'
                                                        ? 'px-5 py-2 border rounded-md border-egPurple-default text-egPurple-default'
                                                        : 'px-5 py-2 border rounded-md border-egGrey-default'
                                                }
                                            >
                                                실기
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="theory"
                                                name="classification"
                                                value="theory"
                                                className="hidden"
                                                onChange={(e) => setClassType(e.target.value)}
                                            />
                                            <label
                                                htmlFor="theory"
                                                className={
                                                    classType === 'theory'
                                                        ? 'px-5 py-2 border rounded-md border-egPurple-default text-egPurple-default'
                                                        : 'px-5 py-2 border rounded-md border-egGrey-default'
                                                }
                                            >
                                                이론
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 수업 대상자 선택 */}
                            {getClassGroup?.data && (
                                <div className="flex items-start justify-between px-1 py-2 mt-[-1px] border items border-egGrey-default">
                                    <span className="ml-1 text-lg w-28">수업 대상</span>
                                    <div className="flex items-center text-egGrey-default">
                                        <TagCard
                                            tagList={getClassGroup?.data.result}
                                            func={setClassGroups}
                                        />
                                    </div>
                                    <BasicModal
                                        modalBtn={
                                            <button
                                                type="button"
                                                className="w-12 border rounded-sm px-15 text-egPurple-default border-egPurple-default hover:bg-egPurple-superLight"
                                            >
                                                + 추가
                                            </button>
                                        }
                                        modalTitle={'교육과정 추가'}
                                        modalContents={
                                            <div>
                                                <div className="mt-4">클래스 그룹</div>
                                                <input
                                                    placeholder={`클래스 그룹명을 입력하세요`}
                                                    type="text"
                                                    maxLength={20}
                                                    onChange={(e) => setAddClassGroupNameInput(e.target.value)}
                                                    className="w-full p-2 mt-2 mb-4 border border-egPurple-default"
                                                />
                                                <div>그룹 설명</div>
                                                <input
                                                    placeholder={`설명을 입력하세요(ex: 초6~중3 선수반)`}
                                                    type="text"
                                                    maxLength={50}
                                                    onChange={(e) => setAddClassGroupDescriptionInput(e.target.value)}
                                                    className="w-full p-2 mt-2 mb-4 border border-egPurple-default"
                                                />
                                            </div>
                                        }
                                        modalFooterExitBtn={'취소'}
                                        modalFooterActiveBtn={'추가'}
                                        modalFooterActiveFunc={postFeedback}
                                        modalFooterActiveFuncAfterClose={true}
                                    />
                                </div>
                            )}

                            {/* 시간 날짜 */}
                            <div className="flex justify-between p-2 border border-egGrey-default mt-[-1px]">
                                <span className="mr-4 text-lg w-28">시작 날짜</span>
                                <input
                                    onChange={(e) => setStartTime(e.target.value)}
                                    type="datetime-local"
                                    id="datetime"
                                    // max="2077-06-20T21:00"
                                    // min="2077-06-05T12:30"
                                    // value="2077-06-15T13:27"
                                />
                            </div>
                            <div className="flex justify-between p-2 border border-egGrey-default mt-[-1px]">
                                <span className="mr-4 text-lg w-28">종료 날짜</span>
                                <input
                                    onChange={(e) => setEndTime(e.target.value)}
                                    type="datetime-local"
                                    id="datetime"
                                    // max="2077-06-20T21:00"
                                    // min={startTime}
                                    // value="2077-06-15T13:27"
                                />
                            </div>
                            <div className="flex justify-between p-2 border border-egGrey-default mt-[-1px]">
                                <span className="mr-4 text-lg w-28">등록 마감</span>
                                <input
                                    onChange={(e) => setApplicationDeadline(e.target.value)}
                                    type="datetime-local"
                                    id="datetime"
                                    // max="2077-06-20T21:00"
                                    // min={startTime}
                                    // value="2077-06-15T13:27"
                                />
                            </div>

                            {/* 위치 */}
                            <div className="flex items-center justify-between px-1 pt-3  pb-2 border border-egGrey-default mt-[-1px]">
                                <span className="ml-1 mr-4 text-lg w-28">위치</span>

                                <div
                                    className={
                                        isMobile
                                            ? 'grid grid-cols-1 gap-4 text-egGrey-default'
                                            : 'flex text-egGrey-default'
                                    }
                                >
                                    <div className="inline-block mr-1">
                                        <input
                                            type="radio"
                                            id="판교점"
                                            name="location"
                                            value="판교점"
                                            className="hidden"
                                            defaultChecked={true}
                                            onChange={(e) => setPlace(e.target.value)}
                                        />
                                        <label
                                            htmlFor="판교점"
                                            className={
                                                place === '판교점'
                                                    ? 'px-5 py-2 border rounded-md border-egPurple-default text-egPurple-default'
                                                    : 'px-5 py-2 border rounded-md border-egGrey-default'
                                            }
                                        >
                                            판교점
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="수원월드컵점"
                                            name="location"
                                            value="수원월드컵점"
                                            className="hidden"
                                            onChange={(e) => setPlace(e.target.value)}
                                        />
                                        <label
                                            htmlFor="수원월드컵점"
                                            className={
                                                place === '수원월드컵점'
                                                    ? 'px-5 py-2 border rounded-md border-egPurple-default text-egPurple-default'
                                                    : 'px-5 py-2 border rounded-md border-egGrey-default'
                                            }
                                        >
                                            수원월드컵점
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 인원제한 */}
                            <div className="flex items-center justify-between py-2 px-1 border border-egGrey-default mt-[-1px]">
                                <span className="ml-1 mr-4 text-lg w-28">인원 제한</span>
                                <input
                                    placeholder="숫자입력"
                                    type="number"
                                    min="0"
                                    max="99"
                                    className="w-24 py-1 pl-3 text-center border rounded-md border-egGrey-default"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                            {/* 알림 포인트 */}
                            <div className="flex items-center justify-between py-2 px-1 border border-egGrey-default mt-[-1px]">
                                <span className="ml-1 mr-4 text-lg w-30">회차소진 + 교육안내 알림 회차</span>
                                <input
                                    placeholder="개발중"
                                    type="number"
                                    min="0"
                                    max="99"
                                    className="w-24 py-1 pl-3 text-center border rounded-md border-egGrey-default"
                                    // onChange={(e) => {
                                    // }}
                                />
                            </div>
                            {/* 마스킹 */}
                            <div className="flex items-center justify-between py-2 px-1 border border-egGrey-default mt-[-1px]">
                                <span className="ml-1 mr-4 text-lg w-28">인원 마스킹</span>
                                <input
                                    value={masking}
                                    placeholder="숫자 입력"
                                    type="number"
                                    min={0}
                                    max={amount}
                                    className="w-24 p-1 border rounded-md text-end border-egGrey-default"
                                    onChange={(e) => {
                                        setMasking(Number(e.target.value));
                                    }}
                                />
                            </div>
                            {/* 참석 코치 */}
                            <div
                                className={
                                    isMobile
                                        ? 'p-2 border border-egGrey-default mt-[-1px]'
                                        : 'flex justify-between p-2 border border-egGrey-default mt-[-1px]'
                                }
                            >
                                <span className="mr-4 text-lg w-28">참석 코치</span>
                                <div className="flex">
                                    <div className="w-40 p-1 mr-1 border rounded-md h-fit min-h-8 border-egGrey-default">
                                        {coaches.length > 0 && (
                                            <div className="inline-block">
                                                {coaches.map((el: any, idx: number) => (
                                                    <div className="flex items-center px-1 my-1 mr-1 text-sm rounded-sm bg-egBlack-superLight w-fit">
                                                        {el.name} <CgClose onClick={() => handleDeleteCoaches(idx)} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <SearchModal
                                        modalBtn={
                                            <button className="flex items-center justify-center px-2 py-1 border rounded-md border-egPurple-default hover:bg-egPurple-superLight">
                                                <div className="mr-1 text-sm">코치</div>
                                                <IoMdSearch className="h-4 text-egPurple-default" />
                                            </button>
                                        }
                                        modalTitle={'코치 검색'}
                                        modalContents={'찾으시는 코치의 이름을 입력하세요(최대 10글자)'}
                                        // modalFooterExitBtn={'취소'}
                                        // modalFooterActiveBtn={'입력'}
                                        modalActiveFunc={handleAddCoaches}
                                        modalScrollStayFlag={false}
                                    />
                                </div>
                            </div>
                            <div className="mb-2 border border-egGrey-default mt-[-1px] p-2">
                                <div className="mb-2 text-lg w-28">안내 사항</div>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    name="opinion"
                                    cols={30}
                                    rows={4}
                                    maxLength={100}
                                    placeholder="안내사항은 100글자 내로 작성하세요"
                                    className="w-full p-1 border rounded-md border-egGrey-default"
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <div className="text-end">
                                <PurpleBtn
                                    content="추가"
                                    func={submitData}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-0 z-0 w-screen h-screen"
                    ></button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
export default ClassAddModal;
