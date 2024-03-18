// Cards
import MemoCard from 'components/Cards/MemoCard';
// Common
import Divider from 'components/Common/Divider';
// images
import user1 from 'assets/user/user1.jpg';
// Admin User Components
import UserProfileCard from 'layouts/Admin/User/Components/UserProfileCard';

const UserDetail = () => {
    const userInfo = {
        thumbnail: user1,
        name: '손흥민',
        gender: 'man',
        birth: '990101-1******',
        height: 60,
        weight: 170,
        phone: '010-1234-1234',
        parentsPhone: '010-9876-9876',
        soccerSkills: '1년 미만',
        advantages: '장점',
        team: '갤로핑FC',
        position: '미드필더',
        lessonExperience: '',
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
    };
    const userMemo = {
        feedback: [
            {
                date: '2024-03-07',
                content: '왼발 자세 보완 필요',
            },
            { date: '2024-03-07', content: '왼발 자세 보완 필요' },
            { date: '2024-03-07', content: '왼발 자세 보완 필요' },
            { date: '2024-03-07', content: '왼발 자세 보완 필요' },
            { date: '2024-03-05', content: '드리블 훌륭' },
            { date: '2024-03-04', content: '드리블 매우 훌륭' },
        ],
        significant: [
            {
                date: '2024-03-07',
                content:
                    '태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음',
            },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-05', content: '인사성 밝음' },
            { date: '2024-03-04', content: '아이들 이름 외울 필요 있음' },
        ],
    };
    return (
        <div className="eg-admin-wrapper">
            <div className="eg-title">회원관리</div>
            <div className="text-sm text-right">Edit</div>
            <UserProfileCard userInfo={userInfo} />
            <Divider />
            <MemoCard
                tab={['피드백', '특이사항']}
                memo={userMemo}
            />
        </div>
    );
};

export default UserDetail;
