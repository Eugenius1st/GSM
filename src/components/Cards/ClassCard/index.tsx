// hooks
import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { requestGet, requestPost } from 'api/basic';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// api
import { decode } from 'api/decode';
import { dateConverter } from 'api/dateConverter';
import { requestDelete } from 'api/basic';
// Card
import EmptyCard from 'components/Cards/EmptyCard';
// Modals
import AddCoachModal from 'components/Modals/CoachAddModal';
import BasicModal from 'components/Modals/BasicModal';
// icons
import { IoClose } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

export interface ClassInfoType {
    _id: string;
    name: string;
    place: string;
    startTime: string;
    endTime: string;
    applicationDeadline?: string;
    type: string;
    amount: number;
    masking?: number;
    students: string[];
    attendance: number;
    reserved: number;
    coaches?: string[];
    note?: string;
    attendancereservations?: any;
}

interface ClasCardType {
    title?: string;
    classInfo: ClassInfoType | undefined;
}

const ClassCard = ({ title, classInfo }: ClasCardType) => {
    const { classId } = useParams();
    let isMobile = useRecoilValue(IsMobileSelector);
    const [loginState, setLoginState] = useRecoilState(LoginStateSelector);
    const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [userId, setUserId] = useState<any>('');
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default items-center';
    const titleStyle = isMobile ? 'mr-2 w-24 flex-shrink-0' : 'mr-2 w-20 ';
    const highLight = 'px-1 bg-egPurple-superLight';
    const [attendState, setAttendState] = useState(false);
    const [coachesInfo, setCoachesInfo] = useState<any>([]);
    const [isPostSuccess, setIsPostSuccess] = useState(false);
    const [deleteState, setDeleteState] = useState(false);

    // api
    useEffect(() => {
        // user Id  확인
        if (!(loginAtom === 'initial')) {
            const newUserInfo = decode(loginAtom.accessToken);
            setUserId(newUserInfo.login_id);
            if (classInfo && classInfo?.students?.includes(userId)) setAttendState(true);
        }
    }, [loginAtom, classInfo]);
    const attendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    // GET coachId 로 코치 정보 조회
    const searchCoach = async () => {
        if (classInfo) {
            const coachRequests = classInfo.coaches?.map((coach: any) =>
                requestGet({ requestUrl: `/admin/${coach._id}` })
            );
            if (coachRequests) {
                const coachResponses = await Promise.all(coachRequests);
                if (coachResponses) {
                    setCoachesInfo(coachResponses);
                }
            }
        }
    };
    // POST 수업추가 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                successFunc: successFunc,
            });
        },
    });
    // POST 요청 및 기존 coach 배열에 이미 있는 id 인지 확인하는 함수
    const handleAddCoaches = (coachInfo: any) => {
        const isIdMatch = coachesInfo.some((coach: any) => coach._id === coachInfo._id);
        if (!isIdMatch) {
            mutation.mutate({
                requestUrl: '/class/coach',
                data: {
                    coachId: coachInfo._id,
                    classId: classId,
                },
                successFunc: setIsPostSuccess,
            });
            const updatedCoaches = [...coachesInfo, coachInfo];
            setCoachesInfo(updatedCoaches);
        } else {
            alert('이미 추가한 코치입니다.');
        }
    };

    // DELETE 요청을 보낼 함수 정의
    const handleDelete = (idx: number) => {
        const newCoachesInfo = [...coachesInfo];
        if (newCoachesInfo.length > 0) {
            newCoachesInfo.splice(idx, 1);
            setCoachesInfo(newCoachesInfo);
        }
    };
    const deleteSubmit = async (id: string, idx: number) => {
        requestDelete({
            requestUrl: `/class/coach`,
            data: {
                coachId: id,
                classId: classId,
            },
            flagCheckFunc: setDeleteState,
        });
        setDeleteState(true);
        handleDelete(idx);
    };

    // 렌더링 관련
    useEffect(() => {
        if (classInfo) {
            searchCoach();
        }
    }, [classInfo]);

    return (
        <div>
            {classInfo ? (
                <div className="relative p-4 mb-4 border shadow-md z-100 border-egGrey-default">
                    {attendState && <div className="mb-2 text-lg font-bold">내 수업</div>}

                    {attendState && (
                        <button
                            type="button"
                            onClick={(e) => attendHandler(e)}
                            className={
                                attendState
                                    ? 'absolute z-10 px-6 py-2 rounded-md top-2 right-2 bg-egPurple-default text-egWhite-default'
                                    : 'absolute z-10 px-6 py-2 rounded-md top-2 right-2 border-egGrey-default text-egGrey-default border'
                            }
                        >
                            참석
                        </button>
                    )}
                    <div className={isMobile ? 'flex flex-col items-center justify-center' : 'flex items-center'}>
                        <div className={isMobile ? 'w-full h-[16rem] mb-4' : 'w-[30rem] h-[10rem] mb-4'}>
                            <img
                                // src={classInfo.classImage}
                                alt="title"
                                className="object-cover w-full h-full mr-4 border-2"
                            />
                        </div>
                        <div className="w-full ml-4">
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>수업명</span>
                                </div>
                                <div>{classInfo?.name}</div>
                            </div>
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>시간</span>
                                </div>
                                <div>
                                    {`${dateConverter(classInfo?.startTime, 'month_day')} ${dateConverter(
                                        classInfo?.startTime,
                                        'time'
                                    )}~${dateConverter(classInfo?.endTime, 'time')}`}
                                </div>
                            </div>
                            {/* 등록 마감 */}
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>등록 마감</span>
                                </div>
                                <div>개발중 </div>
                            </div>
                            {/* 위치 */}
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>위치</span>
                                </div>
                                <div>{classInfo?.place}</div>
                            </div>
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>참석</span>
                                </div>
                                <div>
                                    <div>
                                        {classInfo?.attendancereservations &&
                                        classInfo?.masking &&
                                        classInfo?.attendancereservations >= classInfo?.masking ? (
                                            // 예약 수가 더 많은 경우
                                            <span>{classInfo?.attendancereservations.length}</span>
                                        ) : classInfo?.attendancereservations &&
                                          classInfo?.masking &&
                                          classInfo?.attendancereservations < classInfo?.masking ? (
                                            // 마스킹 값이 더 큰 경우
                                            <span className="text-egPurple-default">{classInfo.masking}</span>
                                        ) : (
                                            // 그 외의 경우
                                            <span> 0</span>
                                        )}
                                        /{classInfo?.amount} (대기자: {classInfo?.reserved ? classInfo?.reserved : 0}{' '}
                                        명)
                                    </div>
                                    <div>{loginState === 'admin' && ` 마스킹 (개발중)`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full ml-2">
                        {classInfo?.coaches && (
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className={highLight}>참가코치</span>
                                </div>
                                <div>
                                    {coachesInfo && coachesInfo.length > 0 ? (
                                        <div className="flex w-full ">
                                            {coachesInfo.map((el: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center px-1 mr-2 rounded-md bg-egBlack-superLight"
                                                >
                                                    <div className="mr-1">{el.name}</div>
                                                    <IoClose onClick={() => deleteSubmit(el._id, idx)} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-egGrey-default">코치 배정중</div>
                                    )}
                                </div>
                                {loginState === 'admin' && (
                                    <div>
                                        <AddCoachModal
                                            modalBtn={
                                                <button className="flex items-center px-1 py-1 border rounded-md bg-egPurple-superLight hover:bg-egPurple-semiLight text-egPurple-default">
                                                    {/* <div className="text-xs ">추가</div> */}
                                                    <FaPlus className="w-4 h-4" />
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
                                )}
                            </div>
                        )}

                        {classInfo?.note && (
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className="px-1 bg-egRed-semiLihgt">안내사항</span>
                                </div>
                                <div>{classInfo?.note}</div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <EmptyCard
                    content="수업 준비중입니다"
                    customStyle="py-10 text-egPurple-semiLight flex flex-col justify-center items-center border border-egGrey-default mb-10 shadow-md"
                />
            )}
        </div>
    );
};

export default ClassCard;
