// hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
// api
import { requestGet } from 'api/basic';
// Class Components
import ViewUserCard from 'layouts/User/Class/components/ViewUserCard';
// Cards
import ClassCard from 'components/Cards/ClassCard';
import { ClassInfoType } from 'components/Cards/ClassCard';
// images
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';

// Common
import Divider from 'components/Common/Divider';

const ClassDetail = () => {
    let isMobile = useRecoilValue(IsMobileSelector);
    const { classId } = useParams();
    const [curClass, setCurClass] = useState<ClassInfoType | undefined>();

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading } = useQuery({
        queryKey: ['classDetail'],
        queryFn: () => {
            if (classId) {
                return requestGet({
                    requestUrl: `/class/${classId}`,
                });
            } else {
                return Promise.resolve('');
            }
        },
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        setCurClass(data);
    }, [data]);

    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between eg-title">
                <div className="flex items-center">
                    <span> 수업정보</span>
                </div>
            </div>
            <div>
                <ClassCard classInfo={curClass && curClass} />
            </div>

            <div className="p-4 border shadow-md border-egGrey-default">
                <div className="mb-4 text-lg font-bold">참석자 명단</div>
                <ViewUserCard attendInfo={curClass && curClass.attendancereservations} />
            </div>

            <Divider />
            <div className="p-4 mb-4 text-lg font-bold">대기자 명단</div>
            <ViewUserCard attendInfo={curClass && curClass.attendancereservations} />
            <Divider />
        </div>
    );
};

export default ClassDetail;
