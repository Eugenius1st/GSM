// hooks
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { requestGet } from 'api/basic';
import dayjs from 'dayjs';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
import { LoginAtomSelector } from 'atom/auth';
// api
import { decode } from 'api/decode';
import { dateConverter } from 'api/dateConverter';
// Card
import EmptyCard from 'components/Cards/EmptyCard';

export interface ClassInfoType {
    _id: string;
    name: string;
    place: string;
    startTime: string;
    endTime: string;
    applicationDeadline?: string;
    type: string;
    amount: number;
    students: string[];
    attendance: number;
    reserved: number;
    coaches?: string[];
    notice?: string;
    attendanceReservation?: any;
}

interface ClasCardType {
    title?: string;
    classInfo: ClassInfoType | undefined;
}

const ClassCard = ({ title, classInfo }: ClasCardType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [userId, setUserId] = useState<any>('');
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const titleStyle = isMobile ? 'mr-2 w-24 flex-shrink-0' : 'mr-2 w-20 ';
    const highLight = 'px-1 bg-egPurple-superLight';
    const [attendState, setAttendState] = useState(false);
    const [attendCoach, setAttendCoach] = useState<any>([]);
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

    // 코치 추가, 일반 axios
    const searchCoach = async () => {
        if (classInfo) {
            const coachRequests = classInfo.coaches?.map((coach) => requestGet({ requestUrl: `/admin/${coach}` }));
            if (coachRequests) {
                const coachResponses = await Promise.all(coachRequests);
                if (coachResponses) {
                    const coachNames = coachResponses.map((coachInfo) => coachInfo.name);
                    setAttendCoach(coachNames);
                }
            }
        }
    };

    useEffect(() => {
        if (classInfo) {
            searchCoach();
        }
    }, [classInfo]);

    return (
        <div>
            {classInfo ? (
                <div className="relative z-0 p-4 mb-4 border shadow-md border-egGrey-default">
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
                                    <div>
                                        {`${dateConverter(classInfo?.startTime, 'month_day')} ${dateConverter(
                                            classInfo?.startTime,
                                            'time'
                                        )}~${dateConverter(classInfo?.endTime, 'time')}`}
                                    </div>
                                </div>
                            </div>
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
                                    {classInfo?.attendanceReservation
                                        ? classInfo?.attendanceReservation.length
                                        : classInfo?.attendance}
                                    /{classInfo?.amount} (대기자{classInfo?.reserved ? classInfo?.reserved : 0} 명){' '}
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
                                <div>{attendCoach.length > 0 ? attendCoach.join(', ') + ' 코치' : '코치 배정중'} </div>
                            </div>
                        )}
                        {classInfo?.notice && (
                            <div className={infoStyle}>
                                <div className={titleStyle}>
                                    <span className="px-1 bg-egRed-semiLihgt">안내사항</span>
                                </div>
                                <div>{classInfo?.notice}</div>
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
