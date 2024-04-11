// hooks
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// Admin Class Component
import ClassCard from 'components/Cards/ClassCard';
// images
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
// Common
import DropDown from 'components/EgMaterials/DropDown';
// Material UI
import PaginationRounded from 'components/EgMaterials/Pagenation';
import { useEffect, useState } from 'react';

const Class = () => {
    const [curPage, setCurPage] = useState(1);
    const location = useLocation().pathname;
    let isMobile = useRecoilValue(IsMobileSelector);
    const classInfo = [
        {
            id: 1,
            classImage: class_adult_man,
            title: '성인남성반1',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: true,
        },
        {
            id: 2,
            classImage: class_adult_woman,
            title: '성인여성반2',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 3,
            classImage: class_adult_man,
            title: '성인남성반3',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 4,
            classImage: class_adult_woman,
            title: '성인여성반4',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 3,
            classImage: class_adult_man,
            title: '성인남성반5',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 4,
            classImage: class_adult_woman,
            title: '성인여성반6',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 5,
            classImage: class_adult_man,
            title: '성인남성반7',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 9,
            classImage: class_adult_woman,
            title: '성인여성반8',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 6,
            classImage: class_adult_man,
            title: '성인남성반9',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
        {
            id: 7,
            classImage: class_adult_woman,
            title: '성인여성반10',
            date: '2024-03-09',
            location: '수원점',
            attendCount: '8/10',
            waiting: 4,
            attend: false,
        },
    ];
    const [curClassInfo, setCurClassInfo] = useState(classInfo.slice(0, 4));
    useEffect(() => {
        const newClassInfo = classInfo.slice((curPage - 1) * 4, (curPage - 1) * 4 + 4);
        setCurClassInfo(newClassInfo);
    }, [curPage]);

    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between mb-4">
                <div className="eg-title">전체수업</div>
                <DropDown
                    itemList={[
                        { item: '엘리트반' },
                        { item: '기본기반' },
                        { item: '어린이반' },
                        { item: '성인남성반' },
                        { item: '성인여성반' },
                    ]}
                />
            </div>
            {curClassInfo.map((el, idx) => (
                <Link
                    key={idx}
                    to={`${location}/${el.id}`}
                >
                    <ClassCard classInfo={el} />
                </Link>
            ))}
            <div className="flex justify-center">
                <PaginationRounded
                    totalItems={classInfo.length}
                    itemsPerPage={4}
                    curPage={curPage}
                    setCurPage={setCurPage}
                    // onPageChange={() => }
                />
            </div>
        </div>
    );
};
export default Class;
