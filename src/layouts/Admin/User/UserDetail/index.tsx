// hooks
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
// api
import { requestPatch, requestGet } from 'api/basic';
// Cards
import MemoCard from 'components/Cards/MemoCard';
// Common
import Divider from 'components/Common/Divider';
// Admin User Components
import UserProfileCard from 'layouts/Admin/User/Components/UserProfileCard';
import UserRoundCard from 'layouts/Admin/User/Components/UserRoundCard';
// Modals
import EditModal from 'components/Modals/EditModal';
import PasswordEditModal from 'components/Modals/PasswordEditModal';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import LightPurpleBtn from 'components/Buttons/LightPurpleBtn';

interface PatchDataType {
    requestUrl: string;
    data?: any;
    flagCheckFunc?: (data: boolean) => void;
}

const UserDetail = () => {
    const { userId } = useParams();
    const [userPhoto, setUserPhoto] = useState('');
    const [patchUnblockFlag, setPatchUnblockFlag] = useState(false); // 비활성화 성공 여부
    const [patchBlockFlag, setPatchBlockFlag] = useState(false); // 비활성화 성공 여부
    const [annotation, setAnnotation] = useState<any>({ feedback: {}, significant: {} });
    const navigate = useNavigate();

    // GET USER INFO 요청을 보낼 함수 정의
    const getUserDetailInfo = useQuery({
        queryKey: [`userDetailInfo-${userId}`],
        queryFn: () => {
            return requestGet({
                requestUrl: `/student/${userId}`,
                // successFunc: setCurUser,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 5 * 1000,
    });
    // GET USER PHOTO
    useEffect(() => {
        if (userId) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/photo/student/${userId}?isThumbnail=true`, {
                    responseType: 'blob',
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data], { type: response.headers['content-type'] })
                    );
                    setUserPhoto(url);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userId]);

    //GET USER FEEDBACK 요청을 보낼 함수
    const getUserFeedback = useQuery({
        queryKey: [`userFeedback-${userId}`],
        queryFn: () => {
            return requestGet({
                requestUrl: `/annotation/feedback/${userId}`,
            });
        },
        staleTime: 5 * 1000,
    });
    //GET USER SIGNIFICANT 요청을 보낼 함수
    const getUserSignificant = useQuery({
        queryKey: [`userSignificant-${userId}`],
        queryFn: () => {
            return requestGet({
                requestUrl: `/annotation/significant/${userId}`,
            });
        },
        staleTime: 5 * 1000,
    });

    //GET USER ROUND 요청을 보낼 함수
    const [userRoundInfo, setUserRounInfo] = useState<any>('');
    const getUserRound = useQuery({
        queryKey: [`userRound-${userId}`],
        queryFn: () => {
            return requestGet({
                requestUrl: `/round/student/${userId}`,
                successFunc: setUserRounInfo,
            });
        },
        staleTime: 5 * 1000,
    });
    // GET USER ROUND REFETCH 함수
    const handleRoundRefetch = () => {
        getUserRound.refetch();
    };

    useEffect(() => {
        if (getUserFeedback.data && getUserSignificant.data) {
            setAnnotation({ feedback: getUserFeedback.data, significant: getUserSignificant.data });
        }
    }, [getUserFeedback.data, getUserSignificant.data]);

    const editActive = () => {
        navigate(`/admin/user/edit/${userId}`);
    };

    // Patch 요청
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: PatchDataType) => {
            return requestPatch({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });

    function handleBlock() {
        mutation.mutate({
            requestUrl: `/auth/block/${userId}`,
            // data: data,
            flagCheckFunc: setPatchBlockFlag,
        });
    }
    function handleUnblock() {
        mutation.mutate({
            requestUrl: `/auth/unblock/${userId}`,
            // data: data,
            flagCheckFunc: setPatchUnblockFlag,
        });
    }
    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between">
                <div className="eg-title">회원관리</div>
                <div className="flex items-center">
                    <EditModal activeFunc={editActive} />
                    <PasswordEditModal />
                </div>
            </div>
            {getUserDetailInfo.data && (
                <UserProfileCard
                    userInfo={getUserDetailInfo.data}
                    userPhoto={userPhoto}
                />
            )}
            <Divider />
            {userRoundInfo && getUserDetailInfo.data && (
                <UserRoundCard
                    classGroupName={getUserDetailInfo.data.classGroupName}
                    roundInfo={userRoundInfo.result}
                    count={userRoundInfo.count}
                    getRoundrefetchFunc={handleRoundRefetch}
                />
            )}

            <Divider />
            <MemoCard
                tab={['feedback', 'significant']}
                annotation={annotation}
                feedbackRefetchFunc={getUserFeedback.refetch}
                significantRefetchFunc={getUserSignificant.refetch}
            />
            <div className="flex justify-end my-8">
                {/* 유저 차단, 활성화 구분 정보 있다면 버튼 1개만 보이게 하는 것이 좋을 듯 */}
                <WhiteBtn
                    content="유저 차단"
                    func={handleBlock}
                />
                <LightPurpleBtn
                    content="차단 해제"
                    func={handleUnblock}
                />
            </div>
        </div>
    );
};

export default UserDetail;
