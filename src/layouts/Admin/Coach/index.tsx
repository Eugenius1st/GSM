// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// Eg Components
import CoachTable from 'layouts/Admin/Coach/Components/CoachTable';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';
export interface RowDataType {
    _id: number;
    photo: string;
    name: string;
    birth: number;
    lv: number;
}
const Coach = () => {
    const [curPage, setCurPage] = useState(1);
    const [searchedData, setSearchedData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [coachesInfo, setCoachesInfo] = useState<any>([]);
    const [tableRowData, setTableRowData] = useState<RowDataType[]>([]);

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['allCoaches'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/admin?page=${curPage}&take=${itemsPerPage}`,
                successFunc: setSearchedData,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 100,
        // enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });
    const searchCoach = async () => {
        if (searchedData) {
            const coachRequests = searchedData.map((coach: any) => requestGet({ requestUrl: `/admin/${coach._id}` }));
            if (coachRequests) {
                const coachResponses = await Promise.all(coachRequests);
                if (coachResponses) {
                    setCoachesInfo(coachResponses);
                }
            }
        }
    };

    // Table 에 적합한 Row 형태로 변경하기
    function convertTableRowData() {
        // 코치 정보를 담을 빈 배열 생성
        const rows: RowDataType[] = [];
        coachesInfo.forEach((coach: RowDataType, index: number) => {
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

    // 렌더링 관련
    useEffect(() => {
        if (searchedData) {
            searchCoach();
        }
    }, [searchedData]);
    useEffect(() => {
        if (coachesInfo.length > 0) {
            convertTableRowData();
        }
    }, [coachesInfo]);

    return (
        <div className="mb-2 eg-default-wrapper">
            <div className="eg-title">코치관리</div>
            <CoachTable tableRowData={tableRowData && tableRowData} />
            <div className="flex justify-center mt-4">
                <PaginationRounded
                    totalItems={searchedData.length}
                    itemsPerPage={itemsPerPage}
                    curPage={curPage}
                    setCurPage={setCurPage}
                    // onPageChange={() => }
                />
            </div>
        </div>
    );
};

export default Coach;
