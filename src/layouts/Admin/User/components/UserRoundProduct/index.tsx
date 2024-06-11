// hooks
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestPost } from 'api/basic';
// Common
import Divider from 'components/Common/Divider';
import { useEffect, useState } from 'react';
// Admin User Components
import RoundProductAddModal from 'layouts/Admin/User/components/RoundProductAddModal';
import RoundProductEditModal from 'layouts/Admin/User/components/RoundProductEditModal';
// icons
import { CgClose } from 'react-icons/cg';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';

interface UserRoundProductType {
    getRoundrefetchFunc?: () => void;
}

const UserRoundProduct = ({ getRoundrefetchFunc }: UserRoundProductType) => {
    const { userId } = useParams();
    const [isShow, setIsShow] = useState(false);

    const [roundProductPage, setRoundProductPage] = useState(1);
    const [curRP, setCurRP] = useState([]);

    const [newRPAddFlag, setNewRPAddFlag] = useState(false);
    const [newRPEditFlag, setNewRPEditFlag] = useState(false);
    const [newRoundFlag, setNewRoundFlag] = useState(false);

    const handleShowModal = () => {
        setIsShow(true);
        document.body.style.overflow = 'hidden';
    };
    const handleCloseModal = () => {
        setIsShow(false);
        document.body.style.overflow = 'unset';
    };
    // GET 요청을 보낼 함수 정의
    const { data, isError, refetch } = useQuery({
        queryKey: ['roundProducts'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/roundproduct?page=${roundProductPage}&take=10' `,
            });
        },
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        if (newRPAddFlag || newRPEditFlag) {
            alert('회차 상품이 추가 되었습니다.');
            refetch();
            setNewRPAddFlag(false);
            setNewRPEditFlag(false);
        }
    }, [newRPAddFlag, newRPEditFlag]);

    // POST 요청
    const addUserRound = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    const handleAddRoundProduct = (roundProductId: string) => {
        addUserRound.mutate({
            requestUrl: '/round',
            data: {
                studentId: userId,
                roundProductId: roundProductId,
            },
            flagCheckFunc: setNewRoundFlag,
        });
    };
    useEffect(() => {
        if (newRoundFlag) {
            handleCloseModal();
            alert('새 회차가 추가 되었습니다.');
            if (getRoundrefetchFunc) {
                getRoundrefetchFunc();
                setNewRoundFlag(false);
            }
        }
    }, [newRoundFlag]);
    return (
        <div>
            <div onClick={handleShowModal}>
                <button className="p-1 mx-1 border rounded-sm w-14 bg-egPurple-default text-egWhite-default">
                    + 회차
                </button>
            </div>
            {isShow ? (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]  z-[60]">
                    <div className="fixed bg-egWhite-default z-[70] p-4 rounded-lg">
                        <div className="flex items-center justify-between my-2">
                            <div className="mr-2 text-xl font-bold">회차 추가</div>

                            <CgClose onClick={handleCloseModal} />
                        </div>
                        <div className="mb-4">아래 회차 상품중 원하시는 상품을 클릭하세요</div>
                        <div className="max-h-[14rem] overflow-y-scroll">
                            <table className="border border-egGrey-default">
                                <thead className="border-b bg-egGrey-semiLight border-egGrey-default">
                                    <tr>
                                        <th className="border-r border-egGrey-default">상품명</th>
                                        <th className="px-2 border-r border-egGrey-default">가격</th>
                                        <th className="px-2 border-r border-egGrey-default">총회차</th>
                                        <th className="border-r border-egGrey-default">시작날짜</th>
                                        <th className="border-r border-egGrey-default">종료날짜</th>
                                        <th className="border-r border-egGrey-default"></th>
                                    </tr>
                                </thead>
                                {data.result &&
                                    data.result.map((el: any, idx: number) => (
                                        <tbody
                                            key={idx}
                                            className="text-center hover:bg-egPurple-superLight"
                                        >
                                            <tr>
                                                <td
                                                    className="px-2 mr-2 border-r border-egGrey-default"
                                                    onClick={() => handleAddRoundProduct(el._id)}
                                                >
                                                    {el?.name}
                                                </td>
                                                <td
                                                    className="px-2 mr-2 border-r border-egGrey-default"
                                                    onClick={() => handleAddRoundProduct(el._id)}
                                                >
                                                    {el?.price}
                                                </td>
                                                <td
                                                    className="px-2 mr-2 border-r border-egGrey-default"
                                                    onClick={() => handleAddRoundProduct(el._id)}
                                                >
                                                    {el?.roundCount}
                                                </td>
                                                <td
                                                    className="px-2 mr-2 border-r border-egGrey-default"
                                                    onClick={() => handleAddRoundProduct(el._id)}
                                                >
                                                    {el?.startOfSales.slice(0, 16).replace('T', ', ')}
                                                </td>
                                                <td
                                                    className="px-2 mr-2 border-r border-egGrey-default"
                                                    onClick={() => handleAddRoundProduct(el._id)}
                                                >
                                                    {el.endOfSales
                                                        ? el.endOfSales.slice(0, 16).replace('T', ', ')
                                                        : '기한 없음'}
                                                </td>
                                                <td className="mr-2 border-r border-egGrey-default">
                                                    <RoundProductEditModal
                                                        flag={newRPEditFlag}
                                                        setFlag={setNewRPEditFlag}
                                                        defaultInfo={el}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>
                        </div>
                        <div className="flex justify-end mt-1 mr-2">
                            <RoundProductAddModal
                                flag={newRPAddFlag}
                                setFlag={setNewRPAddFlag}
                            />
                        </div>
                        {data && data.count > 0 && (
                            <div className="flex justify-center">
                                <PaginationRounded
                                    totalItems={data.result.count ? data.result.count : 1}
                                    itemsPerPage={10}
                                    curPage={1}
                                    setCurPage={setRoundProductPage}
                                />
                            </div>
                        )}

                        <div className="flex justify-end">
                            <WhiteBtn
                                content="닫기"
                                func={handleCloseModal}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default UserRoundProduct;
