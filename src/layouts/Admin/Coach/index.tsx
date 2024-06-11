// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';

// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';
// Eg Components

// import CoachTable from 'layouts/Admin/Coach/Components/CoachTable';
// Common
import SearchBar from 'components/Common/SearchBar';
import SelectMenu from 'components/Common/SelectMenu';
import axios from 'axios';

export interface RowDataType {
    _id: number;
    photo: string;
    name: string;
    birth: number;
    lv: number;
}
const Coach = () => {
    const [curPage, setCurPage] = useState(1);
    const [curAllCoaches, setCurAllCoaches] = useState([]);
    const [defaultAllCoaches, setDefaultllCoaches] = useState([]);
    const [allCount, setAllCount] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [tableRowData, setTableRowData] = useState<RowDataType[]>([]);
    // 코치 검색 state
    const [coachSearchState, setCoachSearchState] = useState(false);

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['homeAllCoaches'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/admin?page=${curPage}&take=${itemsPerPage}`,
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
        curAllCoaches.forEach((coach: RowDataType, index: number) => {
            const { _id, photo, name, birth, lv } = coach; // 원하는 속성들을 추출
            rows.push({
                _id: _id, // 배열 인덱스를 이용하여 id 부여
                photo: photo, // 사진 속성 그대로 사용
                name: name, // 이름 속성 그대로 사용
                birth: new Date(birth).getFullYear(), // 출생일에서 연도만 추출
                lv: lv, // 레벨 속성 그대로 사용
            });
        });
        // 변환된 배열 반환
        setTableRowData(rows);
    }
    // 전체 GET 요청시 렌더링
    useEffect(() => {
        if (data) {
            setCurAllCoaches(data.result);
            setDefaultllCoaches(data.result);
            setAllCount(data.count);
        }
    }, [data]);

    // 페이지 변경시 함수 호출
    useEffect(() => {
        refetch();
    }, [curPage]);

    useEffect(() => {
        if (curAllCoaches.length > 0) {
            convertTableRowData();
        }
    }, [curAllCoaches]);

    // 코치 검색 input 값이 없을 시
    useEffect(() => {
        if (!coachSearchState) {
            convertTableRowData();
        }
    }, [coachSearchState]);

    return (
        <div className="mb-2 eg-default-wrapper">
            <div className="eg-title">코치관리</div>

            {/* <CoachTable
                tableRowData={tableRowData && tableRowData}
                coachSearchState={coachSearchState}
                setCoachSearchState={setCoachSearchState}
            /> */}
            <div className="flex justify-center mt-4">
                {!coachSearchState && (
                    <PaginationRounded
                        totalItems={allCount ? allCount : 1}
                        itemsPerPage={itemsPerPage}
                        curPage={curPage}
                        setCurPage={(page) => setCurPage(page)}
                    />
                )}
            </div>
        </div>
    );
};

export default Coach;
