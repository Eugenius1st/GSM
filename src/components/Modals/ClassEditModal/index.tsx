// hooks
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// api
import { requestPatch } from 'api/basic';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// icons
import { CgClose } from 'react-icons/cg';
import { FiPlus } from 'react-icons/fi';
import { IoMdSearch } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
// Modals
import SearchModal from 'components/Modals/SearchModal';
import { AdminDataType } from 'components/Modals/SearchModal';
import BasicModal from 'components/Modals/BasicModal';
// Alerts
import BasicAlert from 'components/Alerts/BasicAlert';
// utils
import { trainingCourseOptions } from 'utility/standardConst';

interface ClassEditModalType {
    classId: string;
    curClass: any;
    patchCheckFlag: boolean;
    setPatchCheckFlag: (patchCheckFlag: boolean) => void;
}
const ClassEditModal = ({ classId, curClass, patchCheckFlag, setPatchCheckFlag }: ClassEditModalType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const [startTime, setStartTime] = useState(curClass.startTime);
    const [endTime, setEndTime] = useState(curClass.endTime);
    const [applicationDeadline, setApplicationDeadline] = useState(curClass.applicationDeadline);
    const [place, setPlace] = useState(curClass.place);
    const [type, setType] = useState(curClass.type);
    const [amount, setAmount] = useState(curClass.amount);
    const [masking, setMasking] = useState(curClass.masking);

    const [coaches, setCoaches] = useState<any>(curClass.coaches);
    const [className, setClassName] = useState(curClass.name);
    const [note, setNote] = useState(curClass.note);
    const [isShow, setIsShow] = useState(false);
    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);

        document.body.style.overflow = 'unset';
    };
    // PATCH 수업추가 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPatch({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });

    const patchClass = () => {
        const coachIdArray = coaches ? coaches.map((coach: { _id: string }) => coach._id) : [];
        // PATCH 요청에 보낼 데이터
        mutation.mutate({
            requestUrl: `/class/${classId}`,
            data: {
                startTime: startTime,
                endTime: endTime,
                applicationDeadline: applicationDeadline,
                place: place,
                type: type,
                name: className,
                amount: Number(amount),
                masking: masking,
                coaches: coachIdArray,
                note: note,
            },
            flagCheckFunc: setPatchCheckFlag,
        });
    };
    const handleClean = () => {
        setStartTime(curClass.startTime);
        setEndTime(curClass.endTime);
        setApplicationDeadline(curClass.applicationDeadline);
        setPlace(curClass.place);
        setType(curClass.type);
        setClassName(curClass.name);
        setAmount(curClass.amount);
        setMasking(curClass.masking);
        setCoaches(curClass.coaches);
        setIsShow(false);
        setPatchCheckFlag(false);
    };
    const dataValidate = () => {
        if (!startTime) {
            alert('시작 시간을 입력하세요');
            return false;
        } else if (!endTime) {
            alert('종료 시간을 입력하세요');
            return false;
        } else if (!applicationDeadline) {
            alert('마감 시간을 입력하세요');
            return false;
        } else if (!place) {
            alert('수업 장소를 입력하세요');
            return false;
        } else if (!type) {
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
        if (checkValid) patchClass();
    };

    useEffect(() => {
        setType('theory');
    }, [className]);

    return (
        <div>
            <button
                type="button"
                onClick={handleShowModal}
                className="flex items-center ml-2"
            >
                <span className="text-sm">수정</span>
                <MdEdit className="w-5 h-5 text-egPurple-default" />
            </button>
            {isShow && patchCheckFlag ? (
                <BasicAlert
                    alertContents="수업 수정이 완료되었습니다"
                    alertFooterActiveFunc={handleClean}
                    alertFooterActiveBtn="확인"
                />
            ) : (
                <></>
            )}
            {isShow ? (
                <div className="fixed flex text-base font-medium justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
                    <div
                        className={
                            isMobile
                                ? 'fixed bg-egWhite-default z-[70] w-full max-w-[30rem] p-4 rounded-lg'
                                : 'fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg'
                        }
                    >
                        <div className="flex justify-between">
                            <div className="mb-2 text-lg font-bold">수업 수정하기</div>
                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <label
                                    htmlFor="className"
                                    className="w-20 mr-4 text-lg font-semibold"
                                >
                                    수업명
                                </label>
                                <select
                                    name="className"
                                    id="className"
                                    className="w-32 p-1 font-normal border rounded-md text-md border-egGrey-default"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                >
                                    {trainingCourseOptions.map((el, idx) => (
                                        <option
                                            key={idx}
                                            value={el}
                                        >
                                            {el}
                                        </option>
                                    ))}
                                </select>
                                <BasicModal
                                    modalBtn={
                                        <button className="flex items-center p-1 ml-2 border rounded-md border-egPurple-default hover:bg-egPurple-superLight">
                                            <div className="text-sm">수업 추가</div>
                                            <FiPlus className="w-4 h-4 text-egPurple-default " />
                                            <div></div>
                                        </button>
                                    }
                                    modalTitle={'수업 추가'}
                                    modalContents={
                                        <div className="p-2 ">
                                            <div>추가하실 수업명을 입력하세요 (최대 15글자)</div>
                                            <input
                                                placeholder="수업명"
                                                maxLength={15}
                                                type="text"
                                                className="w-full p-2 my-4 border border-egPurple-default"
                                            />
                                        </div>
                                    }
                                    modalFooterExitBtn={'취소'}
                                    modalFooterActiveBtn={'입력'}
                                    modalScrollStayFlag={false}
                                />
                            </div>
                            {className === '엘리트반(초3-6/중,고,대)' && (
                                <div className="flex mb-2 items">
                                    <span className="w-20 mr-4 text-lg font-semibold">수업분류</span>

                                    <div className="flex items-center mr-2">
                                        <input
                                            type="radio"
                                            id="theory"
                                            name="classification"
                                            value="theory"
                                            className="w-4 h-4 mr-1"
                                            defaultChecked={type === 'theory'}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                        <label htmlFor="theory">실기</label>
                                    </div>
                                    <div className="flex items-center mr-2">
                                        <input
                                            type="radio"
                                            id="practice"
                                            name="classification"
                                            value="practice"
                                            className="w-4 h-4 mr-1"
                                            defaultChecked={type === 'practice'}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                        <label htmlFor="practice">이론</label>
                                    </div>
                                </div>
                            )}
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">시작 날짜</span>
                                <input
                                    value={startTime && startTime.slice(0, 16)}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    type="datetime-local"
                                    id="datetime"
                                    // max="2077-06-20T21:00"
                                    // min="2077-06-05T12:30"
                                    // value="2077-06-15T13:27"
                                />
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">종료 날짜</span>
                                <input
                                    value={endTime && endTime.slice(0, 16)}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    type="datetime-local"
                                    id="datetime"
                                    // max="2077-06-20T21:00"
                                    // min={startTime}
                                    // value="2077-06-15T13:27"
                                />
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">등록 마감</span>
                                <input
                                    value={applicationDeadline && applicationDeadline.slice(0, 16)}
                                    onChange={(e) => setApplicationDeadline(e.target.value)}
                                    type="datetime-local"
                                    id="datetime"
                                    // max="2077-06-20T21:00"
                                    // min={startTime}
                                    // value="2077-06-15T13:27"
                                />
                            </div>
                            <div className="flex mb-2 items">
                                <span className="w-20 mr-4 text-lg font-semibold">위치</span>
                                <div className="flex items-center mr-2">
                                    <input
                                        type="radio"
                                        id="판교점"
                                        name="location"
                                        value="판교점"
                                        className="w-4 h-4 mr-1"
                                        defaultChecked={true}
                                        onChange={(e) => {
                                            setPlace(e.target.value);
                                        }}
                                    />
                                    <label htmlFor="판교점">판교점</label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="수원월드컵점"
                                        name="location"
                                        value="수원월드컵점"
                                        className="w-4 h-4 mr-1"
                                        onChange={(e) => {
                                            setPlace(e.target.value);
                                        }}
                                    />
                                    <label htmlFor="수원월드컵점">수원월드컵점</label>
                                </div>
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">인원 제한</span>
                                <input
                                    value={amount}
                                    placeholder="숫자입력"
                                    type="number"
                                    min={0}
                                    max="99"
                                    className="w-40 p-1 border rounded-md border-egGrey-default"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                            {/* 알림 포인트 */}
                            <div className="flex items-center mb-2">
                                <span className="mr-4 text-base font-semibold w-22">Alert point</span>
                                <input
                                    value={''}
                                    placeholder="개발중"
                                    type="number"
                                    min={0}
                                    max={amount}
                                    className="w-20 p-1 border rounded-md border-egGrey-default"
                                    // onChange={(e) => {
                                    // }}
                                />
                                <span className="ml-2 text-base">(회차 소진+교육안내 알림 point)</span>
                            </div>
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">마스킹</span>
                                <input
                                    value={masking}
                                    placeholder="숫자입력"
                                    type="number"
                                    min={0}
                                    max={amount}
                                    className="w-40 p-1 border rounded-md border-egGrey-default"
                                    onChange={(e) => {
                                        setMasking(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">참석 코치</span>
                                <div className="w-40 p-1 border rounded-md h-fit min-h-8 border-egGrey-default">
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
                                        <button className="flex items-center p-1 ml-1 border rounded-md border-egPurple-default hover:bg-egPurple-superLight">
                                            <div className="text-sm ">코치</div>
                                            <IoMdSearch className="w-4 h-4 text-egPurple-default" />
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
                            <div className="flex mb-2">
                                <span className="w-20 mr-4 text-lg font-semibold">안내 사항</span>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    name="opinion"
                                    cols={30}
                                    rows={4}
                                    maxLength={100}
                                    placeholder="안내사항은 100글자 내로 작성하세요"
                                    className="p-1 border rounded-md border-egGrey-default"
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
export default ClassEditModal;
