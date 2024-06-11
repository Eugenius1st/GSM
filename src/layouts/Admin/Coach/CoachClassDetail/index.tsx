// hooks
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// Class Components
import ViewUserCard from 'layouts/Admin/Class/components/ViewUserCard';
// Icons
import { MdOutlineArrowForwardIos } from 'react-icons/md';
// Cards
import CoachClassCard from 'components/Cards/CoachClassCard';
import { ClassInfoType } from 'components/Cards/ClassCard';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// images
import userTempPhoto from 'assets/user/userTempPhoto.png';
// Common
import Divider from 'components/Common/Divider';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Modals
import DeleteModal from 'components/Modals/DeleteModal';
import ClassEditModal from 'components/Modals/ClassEditModal';

const CoachClassDetail = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [curClass, setCurClass] = useState<ClassInfoType | undefined>();
    const [patchCheckFlag, setPatchCheckFlag] = useState(false);
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['adminClassDetail'],
        queryFn: () => {
            if (classId) {
                return requestGet({
                    requestUrl: `/class/${classId}`,
                });
            } else {
                return Promise.resolve('');
            }
        },
        staleTime: 1000,
    });

    useEffect(() => {
        setCurClass(data);
    }, [data]);
    // useEffect(() => {
    //     if (deleteState) navigate(-1);
    // }, [deleteState]);
    // useEffect(() => {
    //     if (patchCheckFlag) {
    //         refetch();
    //     }
    // }, [patchCheckFlag]);

    const attendInfo = [
        { profile: userTempPhoto, name: '홍길동', age: 13, attend: '출석' },
        { profile: userTempPhoto, name: '홍이동', age: 13, attend: '불참' },
        { profile: userTempPhoto, name: '홍삼동', age: 13, attend: '지각' },
        { profile: userTempPhoto, name: '홍사동', age: 13, attend: '취소' },
        { profile: userTempPhoto, name: '홍길동', age: 13, attend: '출석' },
        { profile: userTempPhoto, name: '홍이동', age: 13, attend: '불참' },
        { profile: userTempPhoto, name: '홍삼동', age: 13, attend: '지각' },
        { profile: userTempPhoto, name: '홍사동', age: 13, attend: '취소' },
    ];
    const waitingInfo = [
        { profile: userTempPhoto, name: '홍길동', age: 13, attend: '출석' },
        { profile: userTempPhoto, name: '홍이동', age: 13, attend: '불참' },
        { profile: userTempPhoto, name: '홍삼동', age: 13, attend: '지각' },
        { profile: userTempPhoto, name: '홍사동', age: 13, attend: '취소' },
    ];
    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between eg-title">
                <div className="flex items-center">
                    <span>수업관리</span>
                    <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
                    <span> 수업정보</span>
                </div>
                {/* {classId && curClass && (
                    <div className="flex">
                        <ClassEditModal
                            classId={classId}
                            curClass={curClass}
                            patchCheckFlag={patchCheckFlag}
                            setPatchCheckFlag={setPatchCheckFlag}
                        />
                        <DeleteModal deleteFunc={deleteSubmit} />
                    </div>
                )} */}
            </div>
            <div>
                <CoachClassCard classInfo={curClass} />
            </div>

            <Divider />
            <div className="text-lg font-bold">참석자 명단</div>

            <Divider />
            <ViewUserCard attendInfo={attendInfo} />

            <Divider />
            <div className="text-lg font-bold">대기자 명단</div>

            <Divider />
            <ViewUserCard attendInfo={waitingInfo} />

            <Divider />
            <div className="flex justify-end">
                <WhiteBtn content="대기자 추가" />
                <PurpleBtn content="참석자 추가" />
            </div>
        </div>
    );
};

export default CoachClassDetail;
