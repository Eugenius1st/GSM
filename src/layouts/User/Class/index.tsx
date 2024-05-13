// hooks
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { IsMobileSelector } from 'atom/isMobile';
// api
import { requestGet } from 'api/basic';
// Common
import DropDown from 'components/EgMaterials/DropDown';
// Material UI
import PaginationRounded from 'components/EgMaterials/Pagenation';
// Cards
import ClassCard from 'components/Cards/ClassCard';
import { ClassInfoType } from 'components/Cards/ClassCard';
import EmptyCard from 'components/Cards/EmptyCard';

const Class = () => {
    const [curPage, setCurPage] = useState(1);
    const location = useLocation().pathname;
    let isMobile = useRecoilValue(IsMobileSelector);
    const [allClass, setAllClass] = useState<ClassInfoType[]>([]);
    const [totalItems, setTotalItems] = useState(1);

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['allClassData'],
        queryFn: () =>
            requestGet({
                requestUrl: `/class?page=${curPage}&take=${4}`,
                // successFunc: () => console.log(data),
            }),
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        refetch();
    }, [curPage]);

    useEffect(() => {
        setAllClass(data.result);
        setTotalItems(data.count);
    }, [data]);

    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between mb-4">
                <div className="eg-title">전체수업</div>
                <DropDown
                    itemList={[
                        { item: '전체' },
                        { item: '엘리트반' },
                        { item: '기본기반' },
                        { item: '어린이반' },
                        { item: '성인남성반' },
                        { item: '성인여성반' },
                    ]}
                />
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

            {allClass && allClass.length > 0 && (
                <div className="flex justify-center">
                    <PaginationRounded
                        totalItems={totalItems}
                        itemsPerPage={4}
                        curPage={curPage}
                        setCurPage={(page) => setCurPage(page)}
                        // onPageChange={() => }
                    />
                </div>
            )}
        </div>
    );
};
export default Class;
