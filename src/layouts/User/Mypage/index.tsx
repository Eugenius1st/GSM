// User Components
import UserProfileCard from 'layouts/User/Mypage/components/UserInfoCard';
import user1 from 'assets/user/user1.jpg';
// Commons
import Divider from 'components/Common/Divider';
const MyPage = () => {
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
    return (
        <div className="eg-default-wrapper">
            <div className="eg-title">반가워요, 손이경님</div>
            <Divider />
            <UserProfileCard userInfo={userInfo} />
        </div>
    );
};

export default MyPage;
