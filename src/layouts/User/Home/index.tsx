// hooks
import { Link } from 'react-router-dom';
// User Components
import UserProfileCard from 'layouts/User/Home/components/UserProfileCard';
import ClassCard from 'layouts/User/Home/components/ClassCard';
// images
import user1 from 'assets/user/user1.jpg';
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
// Commons
import Divider from 'components/Common/Divider';
// Modlas
import ReadFeedbackModal from 'components/Modals/ReadFeedbackModal';
const User = () => {
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
    const classInfo = [
        {
            id: 1,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 2,
            classImage: class_adult_woman,
            title: '성인여성반',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: true,
        },
        {
            id: 3,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
    ];
    return (
        <div className="eg-default-wrapper">
            <div className="eg-title">반갑습니다, 손이경님</div>
            <Divider />
            <UserProfileCard userInfo={userInfo} />
            <Divider />
            <div className="flex items-center justify-between my-4">
                <div className="text-lg font-bold">내 수업</div>
                <div className="text-egPurple-default">
                    <Link to="/user/class">전체수업 보기</Link>
                </div>
            </div>
            {classInfo.map((el, idx) => (
                <ClassCard
                    classInfo={el}
                    key={idx}
                />
            ))}
        </div>
    );
};

export default User;
