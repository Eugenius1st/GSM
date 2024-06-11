// hooks
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestDelete } from 'api/basic';
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
import ClassEditModal from 'components/Modals/ClassEditModal';
import UserAddModal from 'components/Modals/UserAddModal';

const ClassDetail = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [curClass, setCurClass] = useState<ClassInfoType | undefined>();
    const [patchCheckFlag, setPatchCheckFlag] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
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

    // DELETE 요청을 보낼 함수 정의
    const deleteSubmit = async () => {
        requestDelete({
            requestUrl: `/class/${classId}`,
            flagCheckFunc: setDeleteState,
        });
    };

    useEffect(() => {
        setCurClass(data);
    }, [data]);
    useEffect(() => {
        if (deleteState) navigate(-1);
    }, [deleteState]);
    useEffect(() => {
        if (patchCheckFlag) {
            refetch();
        }
    }, [patchCheckFlag]);

    // POST 요청 및 기존 coach 배열에 이미 있는 id 인지 확인하는 함수
    const handleAddUsers = (userInfo: any) => {
        // 수업에 학생 참여 기능 구현 필요
        console.log(userInfo);
    };

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
                </div>
                {classId && curClass && (
                    <div className="flex">
                        <ClassEditModal
                            classId={classId}
                            curClass={curClass}
                            patchCheckFlag={patchCheckFlag}
                            setPatchCheckFlag={setPatchCheckFlag}
                        />
                        <DeleteModal deleteFunc={deleteSubmit} />
                    </div>
                )}
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
            <div className="flex justify-end ">
                <WhiteBtn content="대기자 추가" />
                <UserAddModal
                    modalBtn={<PurpleBtn content="참석자 추가" />}
                    modalTitle={'학생 검색'}
                    modalContents={'찾으시는 학생의 이름을 입력하세요(최대 10글자)'}
                    // modalFooterExitBtn={'취소'}
                    // modalFooterActiveBtn={'입력'}
                    modalActiveFunc={handleAddUsers}
                    modalScrollStayFlag={false}
                />
            </div>
        </div>
    );
};

export default ClassDetail;
