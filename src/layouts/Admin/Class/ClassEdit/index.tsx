// hooks
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestDelete, RegistDeleteType } from 'api/basic';
// Class Components
import ViewUserCard from 'layouts/Admin/Class/Components/ViewUserCard';
// Icons
import { MdOutlineArrowForwardIos } from 'react-icons/md';
// Cards
import ClassCard from 'components/Cards/ClassCard';
import { ClassInfoType } from 'components/Cards/ClassCard';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// images
import user1 from 'assets/user/user1.jpg';
import user2 from 'assets/user/user2.png';
import user3 from 'assets/user/user3.jpeg';
import user4 from 'assets/user/user4.png';
// Common
import Divider from 'components/Common/Divider';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Modals
import DeleteModal from 'components/Modals/DeleteModal';
import EditModal from 'components/Modals/EditModal';

const ClassEdit = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [curClass, setCurClass] = useState<ClassInfoType | undefined>();
    const [deleteState, setDeleteState] = useState(false);
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading } = useQuery({
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
        staleTime: 5 * 1000,
    });

    // DELETE 요청을 보낼 함수 정의
    // const deleteSubmit = async () => {
    //     requestDelete({
    //         requestUrl: `/class/${classId}`,
    //         flagCheckFunc: setDeleteState,
    //     });
    // };

    useEffect(() => {
        setCurClass(data);
    }, [data]);
    useEffect(() => {
        if (deleteState) navigate(-1);
    }, [deleteState]);

    const attendInfo = [
        { profile: user1, name: '홍길동', age: 13, attend: '출석' },
        { profile: user2, name: '홍이동', age: 13, attend: '불참' },
        { profile: user3, name: '홍삼동', age: 13, attend: '지각' },
        { profile: user4, name: '홍사동', age: 13, attend: '취소' },
        { profile: user1, name: '홍길동', age: 13, attend: '출석' },
        { profile: user2, name: '홍이동', age: 13, attend: '불참' },
        { profile: user3, name: '홍삼동', age: 13, attend: '지각' },
        { profile: user4, name: '홍사동', age: 13, attend: '취소' },
    ];
    const waitingInfo = [
        { profile: user1, name: '홍길동', age: 13, attend: '출석' },
        { profile: user2, name: '홍이동', age: 13, attend: '불참' },
        { profile: user3, name: '홍삼동', age: 13, attend: '지각' },
        { profile: user4, name: '홍사동', age: 13, attend: '취소' },
    ];
    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between eg-title">
                <div className="flex items-center">
                    <span>수업관리</span>
                    <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
                    <span> 수업정보</span>
                    <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
                    <span> 수업수정</span>
                </div>
            </div>
            <div>
                <ClassCard classInfo={curClass} />
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
                <PurpleBtn content="수정 완료" />
            </div>
        </div>
    );
};

export default ClassEdit;
