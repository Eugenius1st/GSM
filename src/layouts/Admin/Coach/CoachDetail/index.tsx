// hooks
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet, requestDelete } from 'api/basic';
// Cards
import MemoCard from 'components/Cards/MemoCard';
import EmptyCard from 'components/Cards/EmptyCard';
// Common
import Divider from 'components/Common/Divider';
// Admin Coach Components
import CoachProfileCard from 'layouts/Admin/Coach/Components/CoachProfileCard';
// Modals
import EditModal from 'components/Modals/EditModal';

const CoachDetail = () => {
    const navigate = useNavigate();
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
    const [curCoach, setCurCoach] = useState();
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['coachDetail'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/admin/${coachId}`,
                successFunc: setCurCoach,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 100,
        // enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });

    const editActive = () => {
        navigate(`/admin/coach/edit/${coachId}`);
    };
    return (
        <div className="eg-default-wrapper">
            <div className="flex items-center justify-between w-full mb-3 text-sm">
                <div className="eg-title">코치관리</div>

                <EditModal activeFunc={editActive} />
            </div>

            {curCoach ? (
                <div>
                    <CoachProfileCard coachInfo={curCoach && curCoach} />
                    <Divider />
                    <MemoCard
                        tab={['임금', '특이사항']}
                        memo={coachMemo}
                    />
                </div>
            ) : (
                <EmptyCard customStyle="flex flex-col items-center justify-center py-40 my-5  text-egPurple-semiLight" />
            )}
        </div>
    );
};

export default CoachDetail;
