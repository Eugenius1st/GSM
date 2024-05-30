// hooks
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
import { useQuery } from '@tanstack/react-query';
import { LoginAtomSelector } from 'atom/auth';
import { requestGet } from 'api/basic';

// api
import { decode } from 'api/decode';
// User Components
import UserProfileCard from 'layouts/User/Mypage/components/UserProfileCard';
import UserBasicCard from 'layouts/User/Mypage/components/UserBasicCard';
import UserAdditionalCard from 'layouts/User/Mypage/components/UserAdditionalCard';
import UserSkillCard from 'layouts/User/Mypage/components/UserSkillCard';
//images
import user5 from 'assets/user/user5.jpeg';
// Common
import Divider from 'components/Common/Divider';

const MyPage = () => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const userInfo = {
        thumbnail: user5,
        name: '손흥민',
        gender: 'male',
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
    const realVal = {
        _id: '66568f62158cf65b98d403c1',
        photo: 'any-photo-url',
        currentGroupLessonRoundId: null,
        currentPersonalLessonRoundId: null,
        classGroupName: '엘리트반',
        name: '손흥민',
        phone: '010-1234-5678',
        phoneFather: '010-1234-5676',
        phoneMother: '',
        primaryContact: 'student',
        residence: '경기 성남시 수정구 시흥동 285-2',
        birth: '2024-04-30T15:00:00.000Z',
        gender: 'male',
        height: 180,
        weight: 70,
        pros: [
            {
                _id: '661cc79a61f9c865cc4bbf21',
                name: '패스',
                category: 'technical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf22',
                name: '드리블',
                category: 'technical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf23',
                name: '위치선정',
                category: 'technical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf31',
                name: '시야',
                category: 'mental',
            },
            {
                _id: '661cc79a61f9c865cc4bbf32',
                name: '대담함',
                category: 'mental',
            },
            {
                _id: '661cc79a61f9c865cc4bbf33',
                name: '리더십',
                category: 'mental',
            },
            {
                _id: '661cc79a61f9c865cc4bbf3c',
                name: '체력',
                category: 'physical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf3d',
                name: '스피드',
                category: 'physical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf3e',
                name: '몸싸움',
                category: 'physical',
            },
        ],
        improvements: [
            {
                _id: '661cc79a61f9c865cc4bbf2e',
                name: '헤딩',
                category: 'technical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf2f',
                name: '중거리슛',
                category: 'technical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf30',
                name: '골 결정력',
                category: 'technical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf39',
                name: '팀워크',
                category: 'mental',
            },
            {
                _id: '661cc79a61f9c865cc4bbf3a',
                name: '판단력',
                category: 'mental',
            },
            {
                _id: '661cc79a61f9c865cc4bbf3b',
                name: '활동력',
                category: 'mental',
            },
            {
                _id: '661cc79a61f9c865cc4bbf3f',
                name: '민첩성',
                category: 'physical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf40',
                name: '지구력',
                category: 'physical',
            },
            {
                _id: '661cc79a61f9c865cc4bbf41',
                name: '균형감각',
                category: 'physical',
            },
        ],
        team: '토트넘',
        position: ['CDM', 'CAM', 'CM', 'ST'],
        soccerHistory: '5년 이상',
        majorFoot: '오른발',
        marketingAgree: true,
        serviceAgree: true,
        nTheoryAR: 0,
    };
    const adminAtom = useRecoilValue(LoginAtomSelector);
    const adminInfo = decode(adminAtom.accessToken);
    // GET USER INFO 요청을 보낼 함수 정의
    const getUserDetailInfo = useQuery({
        queryKey: [`userDetailInfo-${adminInfo.profileId}`],
        queryFn: () => {
            return requestGet({
                requestUrl: `/student/${adminInfo.profileId}`,
                // successFunc: setCurUser,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 5 * 1000,
    });
    console.log(getUserDetailInfo.data);
    return (
        <div className="eg-default-wrapper">
            <div className="pt-5 text-2xl font-bold text-center">마이페이지</div>
            <Divider />
            {getUserDetailInfo.data && (
                <div className={isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-3 gap-3'}>
                    <div className={isMobile ? '' : 'relative col-span-1'}>
                        <UserProfileCard
                            isMobile={isMobile}
                            thumbnail={getUserDetailInfo.data.thumbnail === 'any-photo-url' ? user5 : user5}
                            name={getUserDetailInfo.data.name}
                            birth={getUserDetailInfo.data.birth.slice(0, 10)}
                            classInfo={userInfo.classInfo} // 여기 대폭 수정 필요..
                        />
                    </div>
                    <div className={isMobile ? 'grid gap-3' : 'grid grid-cols-1 col-span-2 gap-3'}>
                        <UserBasicCard
                            isMobile={isMobile}
                            gender={getUserDetailInfo.data.gender}
                            phone={getUserDetailInfo.data.phone}
                            parentsPhone={userInfo.parentsPhone} // 엄마, 아빠 폰임 ..
                            address={getUserDetailInfo.data.residence}
                            detailAddress={getUserDetailInfo.data.residenceSpecific} // 클라이언트 쪽에서 잘 들어가는 지 확인 필요?
                        />
                        <UserAdditionalCard
                            isMobile={isMobile}
                            height={getUserDetailInfo.data.height}
                            weight={getUserDetailInfo.data.weight}
                            team={getUserDetailInfo.data.team}
                            soccerSkills={getUserDetailInfo.data.soccerHistory}
                            lessonExperience={getUserDetailInfo.data.lessonExperience} // 잘들어가는지 확인 필요
                            position={getUserDetailInfo.data.position.join(', ')} // 배열마다
                            mainFoot={getUserDetailInfo.data.majorFoot}
                        />
                        <UserSkillCard
                            advantages={userInfo.advantages} // 객체로 변환 필요
                            improvement={userInfo.improvement} // 객체로 변환 필요
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPage;
