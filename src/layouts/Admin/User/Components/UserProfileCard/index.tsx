// hooks
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// Eg Components
import EgCheckBox from 'components/EgMaterials/CheckBox';

// Common
import Divider from 'components/Common/Divider';
import BasicModal from 'components/Modals/BasicModal';

// icons
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

interface reasonList {
    count?: string;
    date?: string;
    reson?: string;
}
interface ClassInfo {
    lessonName?: string;
    deposit?: boolean;
    remainingRounds?: number;
    paymentRound?: number;
    reasonList: reasonList[];
}

interface MarketingConsent {
    privacy: boolean | true;
    event: boolean | true;
}

interface UserInfoType {
    thumbnail: string;
    name: string;
    gender: string;
    birth: string;
    height: number;
    weight: number;
    phone?: string;
    parentsPhone?: string;
    soccerSkills?: string;
    advantages?: string;
    team?: string;
    position?: string;
    lessonExperience?: string;
    mainFoot?: string;
    classInfo: ClassInfo;
    marketingConsent: MarketingConsent;
}

interface InfoType {
    userInfo: UserInfoType;
}

const UserProfileCard = ({ userInfo }: InfoType) => {
    const {
        thumbnail,
        name,
        gender,
        birth,
        height,
        weight,
        phone,
        parentsPhone,
        soccerSkills,
        advantages,
        team,
        position,
        lessonExperience,
        mainFoot,
        classInfo,
        marketingConsent,
    } = userInfo;
    let isMobile = useRecoilValue(IsMobileSelector);
    const titleStyle = 'mr-2 font-bold my-1';
    const listStyle = 'inline-block w-56';
    const [seeMore, setSeeMore] = useState(false);
    const [marketingPrivacy, setMarketingPrivacy] = useState(marketingConsent.privacy);
    const [marketingEvent, setMarketingEvent] = useState(marketingConsent.event);

    return (
        <div>
            <div className="flex items-center">
                <img
                    src={thumbnail}
                    alt="coach_son"
                    className="object-cover h-40 mr-4 rounded-full min-w-40"
                />
                <ul>
                    <li className={listStyle}>
                        <span className={titleStyle}>코치이름:</span>
                        <span>{name}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>생년월일:</span>
                        <span>{birth}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>성별:</span>
                        <span>{gender === 'man' ? '남자' : '여자'}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>키/무게:</span>
                        <span>{height}</span>
                        <span>{weight}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>휴대폰:</span>
                        <span>{phone}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>부모님 휴대폰:</span>
                        <span>{parentsPhone}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>축구 구력:</span>
                        <span>{soccerSkills}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>장점:</span>
                        <span>{advantages}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>소속:</span>
                        <span>{team}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>포지션:</span>
                        <span>{position}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>레슨 경험:</span>
                        <span>{lessonExperience}</span>
                    </li>
                    <li className={listStyle}>
                        <span className={titleStyle}>주 발(사용발):</span>
                        <span>{mainFoot}</span>
                    </li>
                </ul>
            </div>
            <Divider />
            <div>
                <ul>
                    <li className="flex mb-1">
                        <div className="font-bold w-28">레슨명</div>
                        <div className="">{classInfo.lessonName}</div>
                    </li>
                    <li className="flex mb-1">
                        <div className="font-bold w-28">입금여부</div>
                        <div className="">{classInfo.deposit ? 'O' : 'X'}</div>
                    </li>
                    <li className="flex justify-between mb-4">
                        <div className="flex">
                            <div className="font-bold w-28">회차추가</div>
                            {classInfo.remainingRounds}/{classInfo.paymentRound}
                        </div>
                        <div className="flex">
                            <button
                                onClick={() => setSeeMore(!seeMore)}
                                className="px-2 py-1 border rounded-md text-egPurple-default border-egPurple-default"
                            >
                                내역보기
                                {seeMore ? (
                                    <IoIosArrowUp className="inline ml-1" />
                                ) : (
                                    <IoIosArrowDown className="inline ml-1" />
                                )}
                            </button>
                            <BasicModal
                                modalBtn={
                                    <button className="px-[10px] py-1 ml-2 border rounded-md text-egPurple-default border-egPurple-default">
                                        +
                                    </button>
                                }
                                modalTitle={'회차추가'}
                                modalContents={
                                    <div className="p-4">
                                        <div className="flex mb-2">
                                            <span className="mr-4 text-lg font-semibold">날짜</span>
                                            <input
                                                type="date"
                                                className="w-40 p-1 border rounded-md border-egPurple-semiLight"
                                            />
                                        </div>

                                        <div className="flex mb-2">
                                            <span className="mr-4 text-lg font-semibold">횟수</span>
                                            <input
                                                placeholder="숫자 입력"
                                                type="number"
                                                min="0"
                                                max="99"
                                                className="w-40 p-1 border rounded-md border-egPurple-semiLight"
                                            />
                                        </div>
                                        <div className="flex mb-2">
                                            <span className="mr-4 text-lg font-semibold">사유</span>
                                            <textarea
                                                name="opinion"
                                                cols={30}
                                                rows={3}
                                                maxLength={30}
                                                placeholder="사유는 30글자 내로 작성하세요"
                                                className="p-1 border rounded-md border-egPurple-semiLight"
                                            ></textarea>
                                        </div>
                                    </div>
                                }
                                modalFooterExitBtn={'취소'}
                                modalFooterActiveBtn={'제출'}
                            />

                            <BasicModal
                                modalBtn={
                                    <button className="px-[10px] py-1 ml-1 border rounded-md text-egPurple-default border-egPurple-default">
                                        -
                                    </button>
                                }
                                modalTitle={'회차차감'}
                                modalContents={
                                    <div className="p-4">
                                        <div className="flex mb-2">
                                            <span className="mr-4 text-lg font-semibold">날짜</span>
                                            <input
                                                type="date"
                                                className="w-40 p-1 border rounded-md border-egPurple-semiLight"
                                            />
                                        </div>

                                        <div className="flex mb-2">
                                            <span className="mr-4 text-lg font-semibold">횟수</span>
                                            <input
                                                placeholder="숫자 입력"
                                                type="number"
                                                min="-99"
                                                max="0"
                                                className="w-40 p-1 border rounded-md border-egPurple-semiLight"
                                            />
                                        </div>
                                        <div className="flex mb-2">
                                            <span className="mr-4 text-lg font-semibold">사유</span>
                                            <textarea
                                                name="opinion"
                                                cols={30}
                                                rows={3}
                                                maxLength={30}
                                                placeholder="사유는 30글자 내로 작성하세요"
                                                className="p-1 border rounded-md border-egPurple-semiLight"
                                            ></textarea>
                                        </div>
                                    </div>
                                }
                                modalFooterExitBtn={'취소'}
                                modalFooterActiveBtn={'제출'}
                            />
                        </div>
                    </li>
                    {seeMore &&
                        classInfo.reasonList.map((el, idx) => (
                            <li
                                key={idx}
                                className="flex mb-2 border-b border-egPurple-light"
                            >
                                <div className="w-36"></div>
                                <div className="flex w-full">
                                    <div className="w-1/3">{el.count}</div>
                                    <div className="w-1/3">{el.reson}</div>
                                    <div className="w-1/3">{el.date}</div>
                                </div>
                            </li>
                        ))}
                    <li className="flex mb-1">
                        <div className="mt-[9px] w-28 font-bold flex-shrink-0">마케팅 동의</div>
                        <div>
                            <div
                                onClick={() => setMarketingPrivacy(!marketingPrivacy)}
                                className="inline-block w-56"
                            >
                                <span>개인정보 수집 및 이용 동의</span>
                                <EgCheckBox checked={marketingPrivacy} />
                            </div>
                            <div
                                onClick={() => setMarketingEvent(!marketingEvent)}
                                className="inline-block w-56"
                            >
                                <span>소식 수신 및 이벤트 참여</span>
                                <EgCheckBox checked={marketingEvent} />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserProfileCard;
