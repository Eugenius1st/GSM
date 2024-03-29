// hooks
import { useState } from 'react';

// EgMetrials
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
    const infoStyle = 'mr-l mb-2';
    const titleStyle = 'mr-2 font-bold';
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
                <div className="flex flex-col justify-center w-full h-40 p-4 rounded-md bg-egPurple-superLght">
                    <div className={infoStyle}>
                        <span className={titleStyle}>이름:</span>
                        <span>{name}</span>
                    </div>
                    <div className={infoStyle}>
                        <span className={titleStyle}>생년월일:</span>
                        <span>{birth}</span>
                    </div>
                    <div className={infoStyle}>
                        <span className={titleStyle}>잔여회차:</span>
                        <span>
                            {classInfo.remainingRounds} / {classInfo.paymentRound}
                        </span>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="eg-title">기본 정보</div>
            <div className="p-4 rounded-md bg-egPurple-superLght">
                <div className={infoStyle}>
                    <span className={titleStyle}>키/무게:</span>
                    <span>{height}</span>
                    <span>{weight}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>휴대폰:</span>
                    <span>{phone}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>부모님 휴대폰:</span>
                    <span>{parentsPhone}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>축구 구력:</span>
                    <span>{soccerSkills}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>소속:</span>
                    <span>{advantages}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>포지션:</span>
                    <span>{team}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>주 사용발:</span>
                    <span>{position}</span>
                </div>
            </div>
            <Divider />
            <div className="eg-title">개인 정보</div>
            <div className="p-4 rounded-md bg-egPurple-superLght">
                <div className={infoStyle}>
                    <span className={titleStyle}>레슨명:</span>
                    <span>{classInfo.lessonName}</span>
                </div>
                <div className={infoStyle}>
                    <span className={titleStyle}>입금여부:</span>
                    <span className={titleStyle}>입금여부</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
