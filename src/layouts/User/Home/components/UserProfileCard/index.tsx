// Modals
import ReadFeedbackModal from 'components/Modals/ReadFeedbackModal';

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
    const { thumbnail, name, birth, classInfo } = userInfo;
    const infoStyle = 'mr-l mb-2';
    const titleStyle = 'mr-2 font-bold';

    return (
        <div>
            <div className="flex">
                <img
                    src={thumbnail}
                    alt="coach_son"
                    className="object-cover h-40 mr-4 rounded-full min-w-40"
                />
                <div className="flex flex-col w-full p-4 rounded-md bg-egPurple-superLight">
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
                    <div className="flex justify-end">
                        <ReadFeedbackModal
                            modalBtn={
                                <div className="flex items-center p-2 py-1 text-white rounded-md w-fit bg-egPurple-semiLght">
                                    <div className="w-4 h-4 mr-2 rounded-full bg-egPurple-default"></div>
                                    <button> 내 피드백 보기</button>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
