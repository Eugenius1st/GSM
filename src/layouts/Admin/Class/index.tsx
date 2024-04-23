// hooks
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// images
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
// Modals
import ClassAddModal from 'components/Modals/ClassAddModal';
// Material UI
import Pagenation from 'components/EgMaterials/Pagenation';
// Cards
import ClassCard from 'components/Cards/ClassCard';
import { ClassInfoType } from 'components/Cards/ClassCard';
import EmptyCard from 'components/Cards/EmptyCard';
const Class = () => {
    const location = useLocation().pathname;
    const [curPage, setCurPage] = useState(1);
    const classInfo = [
        {
            id: 1,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
        },
        {
            id: 2,
            classImage: class_adult_woman,
            title: '성인여성반',
            date: '2024-03-09',
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
        },
        {
            id: 3,
            classImage: class_adult_man,
            title: '성인남성반',
            date: '2024-03-09',
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
        },
        {
            id: 4,
            classImage: class_adult_woman,
            title: '성인여성반',
            date: '2024-03-09',
            location: '수원월드컵점',
            attendCount: '8/10',
            waiting: 4,
        },
    ];
    const [allClass, setAllClass] = useState<ClassInfoType[]>([]);
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading } = useQuery({
        queryKey: ['adminAllClassData'],
        queryFn: () =>
            requestGet({
                requestUrl: `/class?page=${curPage}&take=${4}`,
                // successFunc: () => console.log(data),
            }),
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        setAllClass(data);
    }, [data]);

    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between">
                <div className="eg-title">수업관리</div>
                <ClassAddModal />
            </div>
            {allClass && allClass.length > 0 ? (
                <>
                    {allClass.map((el, idx) => (
                        <Link
                            key={idx}
                            to={`${location}/${el._id}`}
                        >
                            <ClassCard classInfo={el} />
                        </Link>
                    ))}
                </>
            ) : (
                <EmptyCard content="수업 준비중 입니다" />
            )}
            <div className="flex justify-center">
                <Pagenation
                    totalItems={allClass ? allClass.length : 1}
                    curPage={curPage}
                    itemsPerPage={4}
                    setCurPage={() => console.log()}
                />
            </div>
        </div>
    );
};
export default Class;
