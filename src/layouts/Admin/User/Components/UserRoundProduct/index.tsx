// hooks
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
// api
import { requestGet, requestPost } from "api/basic";
// Common
import Divider from "components/Common/Divider";
import { useEffect, useState } from "react";
// Admin User Components
import RoundProductAddModal from "layouts/Admin/User/Components/RoundProductAddModal";
import RoundProductEditModal from "layouts/Admin/User/Components/RoundProductEditModal";
// icons
import { CgClose } from "react-icons/cg";
import WhiteBtn from "components/Buttons/WhiteBtn";
// Pagination
import PaginationRounded from "components/EgMaterials/Pagenation";

const UserRoundProduct = () => {
  const { userId } = useParams();
  const [isShow, setIsShow] = useState(false);

  const [roundProductPage, setRoundProductPage] = useState(1);
  const [curRP, setCurRP] = useState([]);

  const [newRPAddFlag, setNewRPAddFlag] = useState(false);
  const [newRPEditFlag, setNewRPEditFlag] = useState(false);
  const [newRoundFlag, setNewRoundFlag] = useState(false);

  const handleShowModal = () => {
    setIsShow(true);
    document.body.style.overflow = "hidden";
  };
  const handleCloseModal = () => {
    setIsShow(false);
    document.body.style.overflow = "unset";
  };
  // GET 요청을 보낼 함수 정의
  const { data, isError, refetch } = useQuery({
    queryKey: ["roundProducts"],
    queryFn: () => {
      return requestGet({
        requestUrl: `/roundproduct?page=${roundProductPage}&take=10' `,
      });
    },
    // staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (newRPAddFlag || newRPEditFlag) {
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
      requestUrl: "/round",
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
    }
  }, [newRoundFlag]);
  return (
    <div>
      <div onClick={handleShowModal}>
        <button className="border rounded-md border-egPurple-default text-egPurple-default mx-1 p-1">
          + 회차 추가
        </button>
      </div>
      {isShow ? (
        <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
          <div className="fixed bg-egWhite-default z-[70] p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">회차 추가</div>
              <CgClose onClick={handleCloseModal} />
            </div>
            <div className="flex justify-end m-2">
              <RoundProductAddModal
                flag={newRPAddFlag}
                setFlag={setNewRPAddFlag}
              />
            </div>
            <div className="max-h-[14rem] overflow-y-scroll">
              <table>
                <thead className="bg-egGrey-semiLight text-center border">
                  <th className="px-2 border">상품명</th>
                  <th className="px-2 border">가격</th>
                  <th className="px-2 border">총회차</th>
                  <th className="px-2 border">시작</th>
                  <th className="px-2 border">종료</th>
                  <th className="px-2 "></th>
                  <th className="px-2"></th>
                </thead>
                {data.result &&
                  data.result.map((el: any, idx: number) => (
                    <tbody key={idx} className="text-center border">
                      <td className="px-2 border">{el?.name}</td>
                      <td className="px-2 border">{el?.price}</td>
                      <td className="px-2 border">{el?.roundCount}</td>
                      <td className="px-2 border">{`${el?.startOfSales.slice(
                        0,
                        10
                      )} (${el?.startOfSales.slice(11, 16)})`}</td>
                      <td className="px-2 border">
                        {el.endOfSales
                          ? `${el?.endOfSales.slice(
                              0,
                              10
                            )} (${el?.endOfSales.slice(11, 16)})`
                          : "기한 없음"}
                      </td>
                      <td className="z-10 ">
                        <RoundProductEditModal
                          flag={newRPEditFlag}
                          setFlag={setNewRPEditFlag}
                          defaultInfo={el}
                        />
                      </td>
                      <td onClick={() => handleAddRoundProduct(el._id)}>
                        <button className="border border-egPurple-default text-egPurple-default hover:bg-egPurple-superLight z-0 px-1">
                          회차 추가
                        </button>
                      </td>
                    </tbody>
                  ))}
              </table>
            </div>
            {data && data.count > 0 && (
              <div className="flex justify-center mt-4">
                <PaginationRounded
                  totalItems={data.result.count ? data.result.count : 1}
                  itemsPerPage={10}
                  curPage={1}
                  setCurPage={setRoundProductPage}
                />
              </div>
            )}

            <div className="flex justify-end">
              <WhiteBtn content="닫기" func={handleCloseModal} />
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
