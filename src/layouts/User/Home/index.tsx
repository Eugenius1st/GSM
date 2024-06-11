// hooks
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// User Components
import UserProfileCard from 'layouts/User/Home/Components/UserProfileCard';
import ClassCard from 'components/Cards/ClassCard';
// images
import user5 from 'assets/user/user5.jpeg';
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
// Common
import Divider from 'components/Common/Divider';
// Cards
import EmptyCard from 'components/Cards/EmptyCard';
// Icons
import { IoIosArrowForward } from 'react-icons/io';
// Modals
import ReadFeedbackModal from 'components/Modals/ReadFeedbackModal';
const User = () => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const userInfo = {
        thumbnail: user5,
        name: '손흥민',
        gender: 'male',
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
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
            attend: true,
        },
        {
            id: 2,
            classImage: class_adult_woman,
            title: '성인여성반',
            date: '2024-03-09',
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
            attend: true,
        },
        {
            id: 3,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
            attend: true,
        },
    ];
    return (
        <div className="eg-default-wrapper">
            <div className="eg-title">내 수업 관리</div>
            <Divider />
            <UserProfileCard
                isMobile={isMobile}
                thumbnail={userInfo.thumbnail}
                name={userInfo.name}
                birth={userInfo.birth}
                classInfo={userInfo.classInfo}
            />
            <Divider />
            <div className="flex items-center justify-end mb-4 text-egPurple-default">
                <Link
                    to="/user/class"
                    className="flex items-center"
                >
                    <div>전체수업</div> <IoIosArrowForward />
                </Link>
            </div>
            {classInfo.map((el, idx) => (
                <Link
                    key={idx}
                    to={`/user/class/${el.id}`}
                >
                    {/* <ClassCard classInfo={el} /> */}
                </Link>
            ))}
            <EmptyCard content="수강중인 수업이 없습니다" />
        </div>
    );
};

export default User;
