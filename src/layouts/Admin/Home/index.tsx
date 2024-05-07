// hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// Common
import Divider from 'components/Common/Divider';
// Eg Components
import EgPhotoCard from 'components/EgMaterials/PhotoCard';
import UserTable from 'layouts/Admin/User/Components/UserTable';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';
// Admin Home Components
import TitleBar from 'layouts/Admin/Home/Components/TitleBar';
// images
import coach_son from 'assets/coach/coach_son.jpeg';
import coach_kim from 'assets/coach/coach_kim.jpeg';
import coach_hong from 'assets/coach/coach_hong.jpeg';
import class_adult_man from 'assets/class/class_adult_man.jpeg';
import class_adult_woman from 'assets/class/class_adult_woman.jpeg';
import user1 from 'assets/user/user1.jpg';
import user2 from 'assets/user/user2.png';
import user3 from 'assets/user/user3.jpeg';
import user4 from 'assets/user/user4.png';
import { isElementType } from '@testing-library/user-event/dist/utils';

export interface ColumnType {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
    infoBtn?: string;
}
export interface RowDataType {
    _id: number;
    photo: string;
    name: string;
    birth: number;
    team: string;
}
const Home = () => {
    const location = useLocation().pathname;
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [curPage, setCurPage] = useState(1);
    const [allCount, setAllCount] = useState(1);
    // const [defaultAllCount, setDefaultAllCount] = useState(1);
    const [allUsers, setAllUsers] = useState([]);
    const [tableRowData, setTableRowData] = useState<RowDataType[]>([]);

    // GET User 요청을 보낼 함수 정의
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
            // setDefaultAllCount(data.count);
        }
    }, [data]);
    useEffect(() => {
        refetch();
    }, [curPage]);

    // GET Coach 요청을 보낼 함수 정의
    const coachData = useQuery({
        queryKey: ['allCoaches'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/admin?page=1&take=3`,
            });
        },
        staleTime: 5 * 1000,
    });

    // GET Class 요청을 보낼 함수 정의
    const classData = useQuery({
        queryKey: ['allClassData'],
        queryFn: () =>
            requestGet({
                requestUrl: `/class?page=1&take=${2}`,
            }),
        staleTime: 5 * 1000,
    });

    return (
        <div className="eg-default-wrapper">
            <div className="eg-title">회원관리</div>
            <UserTable
                tableRowData={tableRowData && tableRowData}
                // defaultAllCount={defaultAllCount}
                // setAllCount={setAllCount}
            />
            <div className="flex justify-center mt-4">
                <PaginationRounded
                    totalItems={allCount ? allCount : 1}
                    itemsPerPage={itemsPerPage}
                    curPage={curPage}
                    // setCurPage={setCurPage}
                    setCurPage={(page) => setCurPage(page)}
                />
            </div>
            <TitleBar
                title="코치관리"
                navigationURL="/admin/coach"
            />
            <div className="flex justify-between">
                {coachData?.data?.result &&
                    coachData.data.result.map((el: any, idx: number) => (
                        <EgPhotoCard
                            key={idx}
                            _id={el._id}
                            name={el.name}
                            birthYear={el.birth.slice(0, 4)}
                            photo={el.photo}
                            imageY={180}
                            cardType={'coach'}
                        />
                    ))}
            </div>
            <Divider />
            <TitleBar
                title="수업관리"
                navigationURL="/admin/class"
            />
            <div className="flex justify-between">
                {classData?.data?.result &&
                    classData?.data?.result.map((el: any, idx: number) => (
                        <EgPhotoCard
                            key={idx}
                            _id={el._id}
                            name={el.name}
                            photo={el.photo}
                            describe={el.describe}
                            imageY={'10rem'}
                            cardType={'class'}
                            startTime={el.startTime}
                            endTime={el.endTime}
                            amount={el.amount}
                            type={el.type}
                            place={el.place}
                            attendance={el.attendance}
                        />
                    ))}
            </div>
            <Divider />
        </div>
    );
};

export default Home;
