// hooks
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    attend: boolean;
}

interface ClasCardType {
    classInfo: ClassInfoType;
}

const ClassCard = ({ classInfo }: ClasCardType) => {
    const titleStyle = 'mr-4 text-xl font-bold';
    const subTitleStyle = 'mr-4 text-base font-bold';
    const descriptionStyle = 'text-base font-base';
    const navigation = useNavigate();
    const [attendState, setAttendState] = useState(classInfo.attend);
    const attendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setAttendState(!attendState);
    };
    return (
        <div onClick={() => navigation(`/user/class/${classInfo.id}`)}>
            <div className="relative z-0 flex items-center p-4 border rounded-lg shadow-md bg-egPurple-superLght">
                <button
                    onClick={(e) => attendHandler(e)}
                    className={
                        attendState
                            ? 'absolute z-10 px-6 py-2 rounded-md top-2 right-2 bg-egPurple-default text-egWhite-default'
                            : 'absolute z-10 px-6 py-2 rounded-md top-2 right-2 bg-egGrey-default text-egWhite-default'
                    }
                >
                    참석
                </button>
                <div>
                    <img
                        src={classInfo.classImage}
                        alt="title"
                        className="object-cover h-48 border-2 w-72"
                    />
                </div>
                <div className="ml-4">
                    <div className="mb-4">
                        <span className={titleStyle}>수업명</span>
                        <span className={descriptionStyle}>{classInfo.title}</span>
                    </div>
                    <div>
                        <span className={subTitleStyle}>시간</span>
                        <span className={descriptionStyle}>{classInfo.date}</span>
                    </div>

                    <div>
                        <span className={subTitleStyle}>위치</span>
                        <span className={descriptionStyle}>{classInfo.location}</span>
                    </div>

                    <div>
                        <span className={subTitleStyle}>참석</span>
                        <span className={descriptionStyle}>{classInfo.attendCount} </span>
                        <span className={descriptionStyle}>(대기자{classInfo.waiting} 명)</span>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="my-4 ml-4">
                {classInfo.coaches && (
                    <div>
                        <span className={subTitleStyle}>참석코치</span>
                        <span className={descriptionStyle}>{classInfo.coaches.join(', ')} 코치</span>
                    </div>
                )}
                {classInfo.notice && (
                    <div>
                        <span className="mr-4 text-base font-bold text-egRed-default">안내사항</span>
                        <span className={descriptionStyle}>{classInfo.notice}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassCard;
