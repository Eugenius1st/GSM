// hooks
import { useEffect, useState } from 'react';
// icons
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
// Admin User Components
import UserRoundProduct from 'layouts/Admin/User/components/UserRoundProduct';

interface RoundInfoType {
    _id: string;
    studentId: string;
    roundProductId: string;
    available: boolean;
    use: string;
    useStartAt?: string | null;
    expires?: string | null;
    roundAR: any[];
    nRoundAr: number;
    roundProductName: string;
    lessonType: string;
    roundAmount: number;
    rest: number;
}

interface UserRoundCard {
    roundInfo: RoundInfoType[];
    count: number;
    classGroupName: string;
    getRoundrefetchFunc?: () => void;
}
const UserRoundCard = ({ roundInfo, count, classGroupName, getRoundrefetchFunc }: UserRoundCard) => {
    const listStyle = 'flex items-center border-b border-egGrey-default mt-1';
    const titleStyle = 'mr-2 font-bold px-1 my-1 w-28';
    const highLight = 'px-1 bg-egPurple-superLight';
    const lessonTypeList = ['단체', '개인'];
    const activeTab = 'text-egPurple-default border-b-4 border-egPurple-default px-4 py-1 mx-1';
    const inactiveTab = 'text-egGrey-default border-b-4 border-egGrey-default px-4 py-1 mx-1';
    const contentStyle = 'px-1';

    const [lessonType, setLessonType] = useState(lessonTypeList[0]);
    const [seeMore, setSeeMore] = useState(false);

    const [groupRounds, setGroupRounds] = useState<RoundInfoType[] | []>([]);
    const [personalRounds, setPersonalRounds] = useState<RoundInfoType[] | []>([]);

    // round sorting
    const sortRounds = (rounds: RoundInfoType[]): RoundInfoType[] => {
        return rounds.sort((a, b) => {
            const today = new Date().toISOString();
            if (a.useStartAt && b.useStartAt) {
                return new Date(a.useStartAt).getTime() - new Date(b.useStartAt).getTime();
            } else if (a.useStartAt) {
                return -1;
            } else if (b.useStartAt) {
                return 1;
            } else if (a.expires && b.expires) {
                return new Date(a.expires).getTime() - new Date(b.expires).getTime();
            } else if (a.expires) {
                return new Date(a.expires).getTime() - new Date(today).getTime();
            } else if (b.expires) {
                return new Date(today).getTime() - new Date(b.expires).getTime();
            } else {
                return 0;
            }
        });
    };
    const splitAndSortRounds = (roundInfo: RoundInfoType[]): { personal: RoundInfoType[]; group: RoundInfoType[] } => {
        const personalRounds = roundInfo.filter((round) => round.lessonType === 'personal');
        const groupRounds = roundInfo.filter((round) => round.lessonType === 'group');
        return {
            personal: sortRounds(personalRounds),
            group: sortRounds(groupRounds),
        };
    };
    useEffect(() => {
        const { personal, group } = splitAndSortRounds(roundInfo);
        if (personal || group) {
            setPersonalRounds(personal);
            setGroupRounds(group);
        } else {
            setPersonalRounds([]);
            setGroupRounds([]);
        }
    }, [roundInfo]);
    // 각 라운드의 펼침 상태를 저장하는 상태 변수
    const [expandedRounds, setExpandedRounds] = useState<any>({});
    const toggleRound = (roundId: string) => {
        setExpandedRounds((prev: any) => ({
            ...prev,
            [roundId]: !prev[roundId],
        }));
    };

    return (
        <div>
            <div className={'w-full m-auto border border-egGrey-default p-4'}>
                <div className="flex justify-between">
                    <div className="mb-2 text-lg font-bold">수업 정보</div>
                    <div>
                        {lessonTypeList.map((el, idx) => (
                            <button
                                type="button"
                                key={idx}
                                onClick={() => setLessonType(el)}
                                className={`${lessonType === el ? activeTab : inactiveTab}`}
                            >
                                {el}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>클래스그룹</span>
                        </div>
                        <div className={contentStyle}>{classGroupName}</div>
                    </div>

                    <div className="flex items-start mt-1 border-b border-egGrey-default">
                        <div className={titleStyle}>
                            <span className={highLight}>회차정보</span>
                        </div>
                        <div className="flex items-center justify-between w-full px-1 mb-1">
                            {/* <button
                                onClick={() => setSeeMore(!seeMore)}
                                className="px-2 py-1 border rounded-md text-egPurple-default border-egPurple-default"
                            >
                                내역보기
                                {seeMore ? (
                                    <IoIosArrowUp className="inline ml-1" />
                                ) : (
                                    <IoIosArrowDown className="inline ml-1" />
                                )}
                            </button> */}
                            {lessonType === '단체' ? (
                                <div className="w-full">
                                    {groupRounds.map((round) => (
                                        <div key={round._id}>
                                            <div
                                                className={
                                                    round.available && round.use
                                                        ? 'my-1 flex justify-between items-center text-egPurple-default border p-1 rounded-md hover:bg-egPurple-superLight border-egPurple-default'
                                                        : 'flex items-center my-1 justify-between rounded-md text-egGrey-default border p-1  border-egGrey-default'
                                                }
                                            >
                                                <div className="ml-1 mr-4 font-bold">
                                                    {round.roundProductName} ({round.nRoundAr} / {round.roundAmount})
                                                </div>
                                                <div>
                                                    <span className="mr-4">
                                                        <span className="mr-4">
                                                            {`${
                                                                round.useStartAt
                                                                    ? round.useStartAt.slice(0, 10)
                                                                    : '사용전'
                                                            } ~
                                                        ${
                                                            round.expires
                                                                ? round.expires.slice(0, 10)
                                                                : '만료 기한 없음'
                                                        }`}
                                                        </span>
                                                    </span>
                                                    {round.roundAR.length > 0 ? (
                                                        <button
                                                            onClick={() => toggleRound(round._id)}
                                                            className="inline mr-2 "
                                                        >
                                                            {expandedRounds[round._id] ? (
                                                                <IoIosArrowUp />
                                                            ) : (
                                                                <IoIosArrowDown />
                                                            )}
                                                        </button>
                                                    ) : (
                                                        <span className="inline-block w-6"></span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* round 펼쳐짐 */}
                                            {expandedRounds[round._id] && round.roundAR.length > 0 && (
                                                <div className="">
                                                    {round.roundAR.map((ar) => (
                                                        <div
                                                            key={ar._id}
                                                            className="p-2 my-1 border rounded-md"
                                                        >
                                                            <div>
                                                                <span className="w-16 font-semibold">수업명:</span>
                                                                {ar.className}
                                                            </div>
                                                            <div>
                                                                <span className="w-16 font-semibold">시작시간:</span>
                                                                {new Date(ar.startTime).toLocaleString()}
                                                            </div>
                                                            <div>
                                                                <span className="w-16 font-semibold">종료시간:</span>
                                                                {new Date(ar.endTime).toLocaleString()}
                                                            </div>
                                                            <div>
                                                                <span className="w-16 font-semibold">Status:</span>
                                                                {ar.status}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : lessonType === '개인' ? (
                                <div className="w-full">
                                    {personalRounds.map((round) => (
                                        <div key={round._id}>
                                            <div
                                                className={
                                                    round.available && round.use
                                                        ? 'my-1 flex justify-between items-center text-egPurple-default border p-1 rounded-md hover:bg-egPurple-superLight border-egPurple-default'
                                                        : 'my-1 flex justify-between items-center text-egGrey-default border p-1 rounded-md border-egGrey-default'
                                                }
                                            >
                                                <div className="ml-1 mr-4 font-bold">
                                                    {round.roundProductName}({round.nRoundAr} / {round.roundAmount})
                                                </div>
                                                <div>
                                                    <span className="mr-4">
                                                        {`${
                                                            round.useStartAt ? round.useStartAt.slice(0, 10) : '사용전'
                                                        } ~
                                                        ${
                                                            round.expires
                                                                ? round.expires.slice(0, 10)
                                                                : '만료 기한 없음'
                                                        }`}
                                                    </span>
                                                    {round.roundAR.length > 0 ? (
                                                        <button
                                                            onClick={() => toggleRound(round._id)}
                                                            className="inline mr-2 "
                                                        >
                                                            {expandedRounds[round._id] ? (
                                                                <IoIosArrowUp />
                                                            ) : (
                                                                <IoIosArrowDown />
                                                            )}
                                                        </button>
                                                    ) : (
                                                        <span className="inline-block w-6"></span>
                                                    )}
                                                </div>
                                            </div>
                                            {expandedRounds[round._id] && round.roundAR.length > 0 && (
                                                <div className="">
                                                    {round.roundAR.map((ar) => (
                                                        <div
                                                            key={ar._id}
                                                            className="p-2 my-1 border rounded-md"
                                                        >
                                                            <div>
                                                                <span className="w-16 font-semibold">수업명:</span>
                                                                {ar.className}
                                                            </div>
                                                            <div>
                                                                <span className="w-16 font-semibold">시작시간:</span>
                                                                {new Date(ar.startTime).toLocaleString()}
                                                            </div>
                                                            <div>
                                                                <span className="w-16 font-semibold">종료시간:</span>
                                                                {new Date(ar.endTime).toLocaleString()}
                                                            </div>
                                                            <div>
                                                                <span className="w-16 font-semibold">Status:</span>
                                                                {ar.status}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <UserRoundProduct getRoundrefetchFunc={getRoundrefetchFunc} />
                    </div>

                    {seeMore && (
                        <div className={listStyle}>
                            <div className={titleStyle}></div>
                            <div className="w-full">
                                <div className="mb-2 bg-egPurple-superLight">개발중 등록내역 yyyy-mm-dd</div>
                                <div className="mb-2 bg-egPurple-superLight">개발중 등록내역 yyyy-mm-dd</div>
                                <div className="mb-2 bg-egPurple-superLight">개발중 등록내역 yyyy-mm-dd</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserRoundCard;
