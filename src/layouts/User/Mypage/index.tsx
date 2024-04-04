// hooks
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// User Components
import UserProfileCard from 'layouts/User/Mypage/components/UserProfileCard';
import UserBasicCard from 'layouts/User/Mypage/components/UserBasicCard';
import UserAdditionalCard from 'layouts/User/Mypage/components/UserAdditionalCard';
import UserSkillCard from 'layouts/User/Mypage/components/UserSkillCard';
//images
import user5 from 'assets/user/user5.jpeg';
// Commons
import Divider from 'components/Common/Divider';
const MyPage = () => {
    const isMobile = useRecoilValue(IsMobileSelector);
    const userInfo = {
        thumbnail: user5,
        name: '손흥민',
        gender: 'man',
        birth: '1995.04.11',
        height: 170,
        weight: 60,
        phone: '010-1234-1234',
        parentsPhone: '010-9876-9876',
        address: '대왕판교로 815',
        detailAddress: '766호',
        soccerSkills: '1년 미만',
        team: '갤로핑FC',
        position: '미드필더',
        lessonExperience: '없음',
        mainFoot: '왼발',
        classInfo: {
            lessonName: '엘리트반',
            deposit: true,
            remainingRounds: 8,
            paymentRound: 10,
            reasonList: [
                { count: '+1', date: '2024-03-11', reson: '컴플레인' },
                { count: '-1', date: '2024-03-18', reson: '당일불참 처리' },
            ],
        },
        marketingConsent: {
            privacy: true,
            event: false,
        },
        advantages: {
            technicalSkill: ['패스', '드리블', '볼 트래핑'],
            mentalSkill: ['적극성', '집중력', '승부욕'],
            physicalSkill: ['체력', '민첩성'],
        },
        improvement: {
            technicalSkill: ['패널티킥', '장거리 스로인', '골 결정력'],
            mentalSkill: ['대담함', '판단력', '예측력'],
            physicalSkill: ['균형감각', '스피드'],
        },
    };

    return (
        <div className="eg-default-wrapper">
            <div className="pt-5 text-2xl font-bold text-center">마이페이지</div>
            <Divider />
            <div className={isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-3 gap-3'}>
                <div className={isMobile ? '' : 'relative col-span-1'}>
                    <UserProfileCard
                        isMobile={isMobile}
                        thumbnail={userInfo.thumbnail}
                        name={userInfo.name}
                        birth={userInfo.birth}
                        classInfo={userInfo.classInfo}
                    />
                </div>
                <div className={isMobile ? 'grid gap-3' : 'grid grid-cols-1 col-span-2 gap-3'}>
                    <UserBasicCard
                        isMobile={isMobile}
                        gender={userInfo.gender}
                        phone={userInfo.phone}
                        parentsPhone={userInfo.parentsPhone}
                        address={userInfo.address}
                        detailAddress={userInfo.detailAddress}
                    />
                    <UserAdditionalCard
                        isMobile={isMobile}
                        height={userInfo.height}
                        weight={userInfo.weight}
                        team={userInfo.team}
                        soccerSkills={userInfo.soccerSkills}
                        lessonExperience={userInfo.lessonExperience}
                        position={userInfo.position}
                        mainFoot={userInfo.mainFoot}
                    />
                    <UserSkillCard
                        advantages={userInfo.advantages}
                        improvement={userInfo.improvement}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyPage;
