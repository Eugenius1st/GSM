//hooks
import { Link, useLocation } from 'react-router-dom';
// Icons
import { MdOutlineArrowForwardIos } from 'react-icons/md';
// Cards
import CoachClassCard from '../Components/CoachClassCard';
// images
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';

const CoachClass = () => {
    const location = useLocation().pathname;
    const coachClassInfo = [
        {
            id: 1,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원점',
            attend: '8/10',
            waiting: 4,
        },
        {
            id: 2,
            classImage: class_adult_woman,
            title: '성인여성반',
            date: '2024-03-09',
            location: '수원점',
            attend: '8/10',
            waiting: 4,
        },
        {
            id: 3,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원점',
            attend: '8/10',
            waiting: 4,
        },
        {
            id: 4,
            classImage: class_adult_woman,
            title: '성인여성반',
            date: '2024-03-09',
            location: '수원점',
            attend: '8/10',
            waiting: 4,
        },
    ];
    return (
        <div className="eg-admin-wrapper">
            <div className="flex items-center justify-start eg-title">
                <span>코치관리</span>
                <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
                <span> 수업정보</span>
            </div>
            <div>
                {coachClassInfo.map((el, idx) => (
                    <Link
                        key={idx}
                        to={`${location}/${el.id}`}
                    >
                        <CoachClassCard classInfo={el} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CoachClass;
