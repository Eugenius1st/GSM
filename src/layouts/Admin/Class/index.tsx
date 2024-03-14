// hooks
import { Link, useLocation } from 'react-router-dom';
// Admin Class Component
import ClassCard from 'layouts/Admin/Class/Components/ClassCard';
// images
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';

const Class = () => {
    const location = useLocation().pathname;
    const classInfo = [
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
                <span>수업관리</span>
            </div>
            {classInfo.map((el, idx) => (
                <Link
                    key={idx}
                    to={`${location}/${el.id}`}
                >
                    <ClassCard classInfo={el} />
                </Link>
            ))}
        </div>
    );
};
export default Class;
