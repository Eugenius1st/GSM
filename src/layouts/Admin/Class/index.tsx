// hooks
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';

// api
import { requestGet } from 'api/basic';
// Modals
import ClassAddModal from 'components/Modals/ClassAddModal';
// Material UI
import Pagenation from 'components/EgMaterials/Pagenation';
import ClassGroupDropdown from 'components/EgMaterials/ClassGroupDropDown';
// Cards
import ClassCard from 'components/Cards/ClassCard';
import { ClassInfoType } from 'components/Cards/ClassCard';
import EmptyCard from 'components/Cards/EmptyCard';

const Class = () => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const location = useLocation().pathname;
    const [curPage, setCurPage] = useState(1);
    const [classGroupName, setClassGroupName] = useState('전체');

    const [allClass, setAllClass] = useState<ClassInfoType[]>([]);
    const [allCount, setAllCount] = useState(1);
    const [isAddSuccess, setIsAddSuccess] = useState(false);

    //ALL CLASS GET 요청을 보낼 함수 정의
    const getAllClass = useQuery({
        queryKey: ['adminAllClassData'],
        queryFn: () =>
            requestGet(
                {
                    requestUrl:
                        classGroupName === '전체'
                            ? `/class?page=${curPage}&take=${4}`
                            : `/class?classGroup=${classGroupName}&page=${1}&take=${10}`,
                }
                // successFunc: () => console.log(data),
                // }),
            ),
        staleTime: 5 * 1000,
    });
    useEffect(() => {
        if (getAllClass.data) {
            setAllClass(getAllClass.data.result);
            setAllCount(getAllClass.data.count);
        }
    }, [getAllClass.data]);
    useEffect(() => {
        getAllClass.refetch();
    }, [curPage, classGroupName]);
    useEffect(() => {
        if (isAddSuccess) getAllClass.refetch();
    }, [isAddSuccess]);

    // CLASS GROUP GET 요청을 보낼 함수 정의
    const getClassGroup = useQuery({
        queryKey: ['allClassGroup'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/classGroup`,
            });
        },
        staleTime: 5 * 1000,
    });
    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {!isMobile && <div className="mr-3 eg-title">수업관리</div>}
                    <ClassGroupDropdown
                        placehorder="교육 과정"
                        formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col w-56"
                        itemList={
                            getClassGroup.data
                                ? [{ _id: '0', name: '전체', description: 'all' }, ...getClassGroup.data.result]
                                : []
                        }
                        inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                        itemStyle=""
                        func={setClassGroupName}
                        value={classGroupName}
                    />
                </div>

                <ClassAddModal
                    isSuccess={isAddSuccess}
                    setIsSuccess={setIsAddSuccess}
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
            <div className="flex justify-center">
                <Pagenation
                    totalItems={allCount ? allCount : 1}
                    curPage={curPage}
                    itemsPerPage={4}
                    setCurPage={(page) => setCurPage(page)}
                />
            </div>
        </div>
    );
};
export default Class;
