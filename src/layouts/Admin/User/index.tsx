// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// User Component
import UserTable from 'layouts/Admin/User/components/UserTable';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';

export interface RowDataType {
    _id: number;
    photo: string;
    name: string;
    birth: number;
    team: string;
}

const User = () => {
    const [curPage, setCurPage] = useState(1);
    const [allUsers, setAllUsers] = useState([]);
    const [allCount, setAllCount] = useState(1);
    const [defaultAllCount, setDefaultAllCount] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState<RowDataType[]>([]);
    // 유저 검색 state
    const [userSearchState, setUserSearchState] = useState(false);

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/student?page=${curPage}&take=${itemsPerPage}`,
                // successFunc: setAllCoaches,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 5 * 1000,
        // enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });

    // Table 에 적합한 Row 형태로 변경하기
    function convertTableRowData() {
        // 코치 정보를 담을 빈 배열 생성
        const rows: RowDataType[] = [];
        allUsers.forEach((user: RowDataType, index: number) => {
            const { _id, photo, name, birth, team } = user; // 원하는 속성들을 추출
            rows.push({
                _id: _id, // 배열 인덱스를 이용하여 id 부여
                photo: photo, // 사진 속성 그대로 사용
                name: name, // 이름 속성 그대로 사용
                birth: new Date(birth).getFullYear(), // 출생일에서 연도만 추출
                team: team, // 레벨 속성 그대로 사용
            });
        });
        // 변환된 배열 반환
        setTableRowData(rows);
    }
    // 렌더링 관련
    useEffect(() => {
        if (allUsers && allUsers.length > 0) {
            convertTableRowData();
        }
    }, [allUsers]);
    useEffect(() => {
        if (data) {
            setAllUsers(data.result);
            setAllCount(data.count);
            setDefaultAllCount(data.count);
        }
    }, [data]);
    useEffect(() => {
        refetch();
    }, [curPage]);

    // 유저 검색 input 값이 없을 시
    useEffect(() => {
        if (!userSearchState) {
            convertTableRowData();
        }
    }, [userSearchState]);

    return (
        <div className="mb-2 eg-default-wrapper">
            <div className="eg-title">회원관리</div>
            <UserTable
                tableRowData={tableRowData && tableRowData}
                userSearchState={userSearchState}
                setUserSearchState={setUserSearchState}
            />
            {!userSearchState && (
                <div className="flex justify-center mt-4">
                    <PaginationRounded
                        totalItems={allCount ? allCount : 1}
                        itemsPerPage={itemsPerPage}
                        curPage={curPage}
                        // setCurPage={setCurPage}
                        setCurPage={(page) => setCurPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default User;
