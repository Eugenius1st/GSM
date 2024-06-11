// hooks
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestPatch } from 'api/basic';
// Cards
import MemoCard from 'components/Cards/MemoCard';
import EmptyCard from 'components/Cards/EmptyCard';
// Common
import Divider from 'components/Common/Divider';
// Admin Coach Components
import CoachProfileCard from 'layouts/Admin/Coach/Components/CoachProfileCard';
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

const CoachDetail = () => {
    const navigate = useNavigate();
    const [patchUnblockFlag, setPatchUnblockFlag] = useState(false); // 비활성화 성공 여부
    const [patchBlockFlag, setPatchBlockFlag] = useState(false); // 비활성화 성공 여부

    const coachMemo = {
        salary: '3000 만원',
        significant: [
            {
                date: '2024-03-07',
                content:
                    '태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음',
            },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-07', content: '태도가 아주 좋음' },
            { date: '2024-03-05', content: '인사성 밝음' },
            { date: '2024-03-04', content: '아이들 이름 외울 필요 있음' },
        ],
    };
    const { coachId } = useParams();
    const [curCoach, setCurCoach] = useState<any>();
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [`coachDetail-${coachId}`],
        queryFn: () => {
            return requestGet({
                requestUrl: `/admin/${coachId}`,
                successFunc: setCurCoach,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 5 * 1000,
        // enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });

    const editActive = () => {
        navigate(`/admin/coach/edit/${coachId}`);
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
            requestUrl: `/auth/block/${coachId}`,
            // data: data,
            flagCheckFunc: setPatchBlockFlag,
        });
    }
    function handleUnblock() {
        mutation.mutate({
            requestUrl: `/auth/unblock/${coachId}`,
            // data: data,
            flagCheckFunc: setPatchUnblockFlag,
        });
    }
    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between w-full mb-3 text-sm">
                <div className="eg-title">코치관리</div>
                <div className="flex">
                    <EditModal activeFunc={editActive} />
                    <PasswordEditModal />
                </div>
            </div>

            {curCoach ? (
                <div>
                    <CoachProfileCard coachInfo={curCoach && curCoach} />
                    <Divider />
                    {/* <MemoCard
                        tab={['임금', '특이사항']}
                        memo={coachMemo}
                    /> */}
                </div>
            ) : (
                <EmptyCard customStyle="flex flex-col items-center justify-center py-40 my-5  text-egPurple-semiLight" />
            )}

            <div className="flex justify-end my-8">
                {/* 유저 차단, 활성화 구분 정보 있다면 버튼 1개만 보이게 하는 것이 좋을 듯 */}
                {curCoach?.isBlocked ? (
                    <WhiteBtn
                        content="유저 차단"
                        func={handleBlock}
                    />
                ) : (
                    <LightPurpleBtn
                        content="차단 해제"
                        func={handleUnblock}
                    />
                )}
            </div>
        </div>
    );
};

export default CoachDetail;
