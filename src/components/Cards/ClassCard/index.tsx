// hooks
import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';

interface ClassInfoType {
    id: number;
    classImage: string;
    title: string;
    date: string;
    location: string;
    attendCount: string;
    waiting: number;
    coaches?: string[];
    notice?: string;
    attend?: boolean;
}

interface ClasCardType {
    title?: string;
    classInfo: ClassInfoType;
}

const ClassCard = ({ title, classInfo }: ClasCardType) => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const infoStyle = 'mb-2 pb-1 flex border-b border-egGrey-default';
    const titleStyle = isMobile ? 'mr-2 w-24 flex-shrink-0' : 'mr-2 w-20 ';
    const highLight = 'px-1 bg-egPurple-superLight';
    const [attendState, setAttendState] = useState(classInfo.attend);
    const attendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setAttendState(!attendState);
    };
    return (
        <div>
            <div className="relative z-0 p-4 mb-4 border shadow-md border-egGrey-default">
                {classInfo.attend && <div className="mb-2 text-lg font-bold">내 수업</div>}

                {classInfo.attend && (
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
                            src={classInfo.classImage}
                            alt="title"
                            className="object-cover w-full h-full mr-4 border-2"
                        />
                    </div>
                    <div className="w-full ml-4">
                        <div className={infoStyle}>
                            <div className={titleStyle}>
                                <span className={highLight}>수업명</span>
                            </div>
                            <div>{classInfo.title}</div>
                        </div>
                        <div className={infoStyle}>
                            <div className={titleStyle}>
                                <span className={highLight}>시간</span>
                            </div>
                            <div>{classInfo.date}</div>
                        </div>
                        <div className={infoStyle}>
                            <div className={titleStyle}>
                                <span className={highLight}>위치</span>
                            </div>
                            <div>{classInfo.location}</div>
                        </div>
                        <div className={infoStyle}>
                            <div className={titleStyle}>
                                <span className={highLight}>참석</span>
                            </div>
                            <div>
                                {classInfo.attendCount} (대기자{classInfo.waiting} 명){' '}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full ml-2">
                    {classInfo.coaches && (
                        <div className={infoStyle}>
                            <div className={titleStyle}>
                                <span className={highLight}>참가코치</span>
                            </div>
                            <div>{classInfo.coaches.join(', ')} 코치</div>
                        </div>
                    )}
                    {classInfo.notice && (
                        <div className={infoStyle}>
                            <div className={titleStyle}>
                                <span className="px-1 bg-egRed-semiLihgt">안내사항</span>
                            </div>
                            <div>{classInfo.notice}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
