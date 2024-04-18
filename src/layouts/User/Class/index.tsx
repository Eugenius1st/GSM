// hooks
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { IsMobileSelector } from 'atom/isMobile';
// api
import { registGet } from 'api/basic';

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
    const [allClass, setAllClass] = useState('');
    const classInfo = [
        {
            _id: '6618990be356eb8c32bafaea',
            name: '성인반',
            place: '판교 1호점',
            startTime: '2024-04-12T01:41:56.439Z',
            endTime: '2024-04-12T03:41:56.439Z',
            type: '실기',
            amount: 10,
            students: ['660d0d5b5ebeba8327d41bef', '660e0235153f4436a008be02', '6618bf50eeef910e01e80245'],
            attendance: 3,
            reserved: 0,
        },
    ];
    const [curClassInfo, setCurClassInfo] = useState(classInfo.slice(0, 4));
    useEffect(() => {
        const newClassInfo = classInfo.slice((curPage - 1) * 4, (curPage - 1) * 4 + 4);
        setCurClassInfo(newClassInfo);
    }, [curPage]);

    // GET 요청을 보낼 함수 정의
    // const { data, error, isLoading } = useQuery(['classData'], registGet({ requestUrl: '/class?page=1&take=10' }), {
    //     onSuccess: (data) => {
    //         console.log(data);
    //     },
    //     // staleTime: 10000,
    // });
    // const queryfetch = useQuery(['allClassData'], ()=>registGet({ requestUrl: '/class?page=1&take=10' }), {
    //     onSuccess: (data: any)=> {
    //       console.log(data)
    //     },
    //     staleTime:10000
    //   })

    const { data, error, isLoading } = useQuery({
        queryKey: ['allClassData'],
        queryFn: () => registGet({ requestUrl: `/class?page=${curPage}&take=${curPage + 4}` }),
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        setAllClass(data);
    }, []);

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
                    to={`${location}/${el._id}`}
                >
                    {/* <ClassCard classInfo={el} /> */}
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
