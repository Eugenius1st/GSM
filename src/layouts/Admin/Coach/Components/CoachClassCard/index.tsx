interface CoachClassInfoType {
    id: number;
    classImage: string;
    title: string;
    date: string;
    location: string;
    attend: string;
    waiting: number;
    coaches?: string[];
    notice?: string;
}

interface ClassInfoType {
    classInfo: CoachClassInfoType;
}

const CoachClassCard = ({ classInfo }: ClassInfoType) => {
    const titleStyle = 'mr-4 text-xl font-bold';
    const subTitleStyle = 'mr-4 text-base font-bold';
    const descriptionStyle = 'text-base font-base';
    return (
        <div className="flex items-center p-4 my-4 border rounded-lg shadow-md bg-egPurple-superLght">
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
                    <span className={descriptionStyle}>{classInfo.attend} </span>
                    <span className={descriptionStyle}>(대기자{classInfo.waiting} 명)</span>
                </div>
                <div>
                    {classInfo.coaches && (
                        <div>
                            <span className={subTitleStyle}>참석코치</span>
                            <span className={descriptionStyle}>{classInfo.coaches.join(', ')} 코치</span>
                        </div>
                    )}
                    {classInfo.notice && (
                        <div>
                            <span className={subTitleStyle}>안내사항</span>
                            <span className={descriptionStyle}>{classInfo.notice}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoachClassCard;
