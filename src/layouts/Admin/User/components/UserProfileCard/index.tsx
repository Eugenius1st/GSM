// hooks
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// Eg Components
import EgCheckBox from 'components/EgMaterials/CheckBox';
// utility
import { classGroupMatcherByEng } from 'utility/standardConst';
// Common
import Divider from 'components/Common/Divider';
import BasicModal from 'components/Modals/BasicModal';
// utility
import { positionMatcherByEng } from 'utility/standardConst';

// images
import userImg from 'assets/user/user.png';

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

interface prosImproType {
    category: string;
    name: string;
}

interface UserInfoType {
    classGroupId?: any;
    classGroupName?: string;
    _id?: string;
    isDeleted?: boolean;
    deletedAt?: any;
    authId?: string;
    photo?: string;
    currentRoundId?: string;
    classId?: any;
    className?: string;
    name?: string;
    name_token?: string;
    name_token_heads?: string;
    phone?: string;
    phoneFather?: string;
    phoneMother?: string;
    residence?: string;
    residenceSpecific?: string;
    birth?: string;
    gender?: string;
    height?: number;
    weight?: number;
    pros?: prosImproType[];
    improvements?: prosImproType[];
    team?: string;
    grade?: string;
    position?: string[];
    lessonExpire?: any;
    soccerHistory?: string;
    lessonHistory?: string;
    majorFoot?: string;
    marketingAgree?: boolean;
    serviceAgree?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    name_spaced?: string;
    name_token_heads_spaced?: string;
    name_token_spaced?: string;
    nTheoryAR?: string;
}

interface InfoType {
    userInfo: UserInfoType;
}

const UserProfileCard = ({ userInfo }: InfoType) => {
    const {
        classGroupId,
        classGroupName,
        _id,
        isDeleted,
        deletedAt,
        authId,
        photo,
        currentRoundId,
        classId,
        className,
        name,
        name_token,
        name_token_heads,
        phone,
        phoneFather,
        phoneMother,
        residence,
        residenceSpecific,
        birth,
        gender,
        height,
        weight,
        pros,
        improvements,
        team,
        grade,
        position,
        lessonExpire,
        soccerHistory,
        lessonHistory,
        majorFoot,
        marketingAgree,
        serviceAgree,
        createdAt,
        updatedAt,
        __v,
        name_spaced,
        name_token_heads_spaced,
        name_token_spaced,
        nTheoryAR,
    } = userInfo;
    let isMobile = useRecoilValue(IsMobileSelector);
    const listStyle = 'flex items-center border-b border-egGrey-default mt-1';
    const titleStyle = 'mr-2 font-bold px-1 my-1 w-28';
    const highLight = 'px-1 bg-egPurple-superLight';
    const contentStyle = 'px-1';

    const [marketingPrivacy, setMarketingPrivacy] = useState(marketingAgree);
    const [marketingEvent, setMarketingEvent] = useState(serviceAgree);

    return (
        <div>
            <div className={'w-full m-auto border border-egGrey-default p-4'}>
                <div className="flex justify-center mb-5">
                    <img
                        src={photo === 'any-photo-url' ? userImg : ''}
                        alt="coach_son"
                        className={'object-cover h-32 p-1 mr-4 border rounded-full border-egPurple-default min-w-32'}
                    />
                </div>
                <div className={'w-full grid grid-cols-2 gap-x-4'}>
                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>이름</span>
                        </div>
                        <div className={contentStyle}>{name}</div>
                    </div>

                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>성별</span>
                        </div>
                        <div className={contentStyle}>{gender === 'male' ? '남자' : '여자'}</div>
                    </div>

                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>생년월일</span>
                        </div>
                        <div className={contentStyle}>{birth?.slice(0, 10)}</div>
                    </div>

                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>연락처</span>
                        </div>
                        <div className={contentStyle}>{phone}</div>
                    </div>

                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>잔여회차</span>
                        </div>
                        <div>
                            <div className={contentStyle}>이론: {nTheoryAR ? nTheoryAR : 0}회</div>
                            <div className={contentStyle}>실기: {'개발중'}</div>
                        </div>
                    </div>

                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>부모 연락처</span>
                        </div>
                        <div>
                            {phoneFather && <div className={contentStyle}>부: {phoneFather}</div>}
                            {phoneMother && <div className={contentStyle}>모: {phoneMother}</div>}
                        </div>
                    </div>
                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>주소</span>
                        </div>
                        <div>
                            <div className={contentStyle}>{residence}</div>
                            <div className={contentStyle}>{residenceSpecific}</div>
                        </div>
                    </div>
                    <div className={listStyle}>
                        <div className={titleStyle}>
                            <span className={highLight}>대표 연락처</span>
                        </div>
                        <div className={contentStyle}>개발중</div>
                    </div>
                </div>
            </div>

            <Divider />
            <div className={'w-full m-auto border border-egGrey-default p-4'}>
                <div className="mb-4 text-lg font-bold">추가 정보</div>
                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>키 / 무게</span>
                    </div>
                    <div className={contentStyle}>
                        {height}cm / {weight}kg
                    </div>
                </div>
                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>포지션</span>
                    </div>
                    <div className={contentStyle}>
                        {position?.map((el, idx) => (
                            <span
                                key={idx}
                                className="border border-egPurple-light rounded-sm px-[2px] py-[1px] m-[2px] inline-block"
                            >
                                {positionMatcherByEng(el)}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={listStyle}>
                    <div className={titleStyle}>
                        {' '}
                        <span className={highLight}>장점</span>
                    </div>
                    <div className={contentStyle}>
                        {pros?.map((el, idx) => (
                            <span
                                key={idx}
                                className="border border-egPurple-light  bg-egGrey-light rounded-sm px-[2px] py-[1px] m-[2px] inline-block"
                            >
                                {el.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={listStyle}>
                    <div className={titleStyle}>
                        {' '}
                        <span className={highLight}>개선점</span>
                    </div>
                    <div className={contentStyle}>
                        {improvements?.map((el, idx) => (
                            <span
                                key={idx}
                                className="border border-egPurple-light bg-egGrey-light rounded-sm px-[2px] py-[1px] m-[2px] inline-block"
                            >
                                {el.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>축구 구력</span>
                    </div>
                    <div className={contentStyle}>{soccerHistory}</div>
                </div>
                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>레슨 경험</span>
                    </div>
                    <div className={contentStyle}>{lessonHistory ? lessonHistory : '없음'}</div>
                </div>

                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>소속</span>
                    </div>
                    <div className={contentStyle}>{team}</div>
                </div>

                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>주 발 (사용발)</span>
                    </div>
                    <div className={contentStyle}>{majorFoot}</div>
                </div>

                {/* 마케팅 */}
                <div className={listStyle}>
                    <div className={titleStyle}>
                        <span className={highLight}>마케팅 동의</span>
                    </div>
                    <div className={contentStyle}>
                        <div className="grid w-full grid-cols-2">
                            <div
                                onClick={() => setMarketingPrivacy(!marketingPrivacy)}
                                className="inline-block full"
                            >
                                {marketingPrivacy && <EgCheckBox checked={marketingPrivacy} />}

                                <span>개인정보 수집 및 이용 동의</span>
                            </div>
                            <div
                                onClick={() => setMarketingEvent(!marketingEvent)}
                                className="inline-block w-full"
                            >
                                {marketingEvent && <EgCheckBox checked={marketingEvent} />}

                                <span>소식 수신 및 이벤트 참여</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
