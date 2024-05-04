// hooks
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
// api
import { requestPatch } from "api/basic";
// Buttons
import WhiteBtn from "components/Buttons/WhiteBtn";
import PurpleBtn from "components/Buttons/PurpleBtn";
// icons
import { CgClose } from "react-icons/cg";
import { MdEdit } from "react-icons/md";

interface RoundProductType {
  name: string;
  price: number;
  roundCount: number;
  startOfSales: string;
  endOfSales: string | null;
  _id: string;
}

interface RoundProductEditModalType {
  flag: boolean;
  setFlag: (flag: boolean) => void;
  defaultInfo: RoundProductType;
}

const RoundProductEditModal = ({
  flag,
  setFlag,
  defaultInfo,
}: RoundProductEditModalType) => {
  const [isShow, setIsShow] = useState(false);

  const [newRPName, setNewRPName] = useState(defaultInfo.name);
  const [newRPPrice, setNewRPPrice] = useState<number>(defaultInfo.roundCount);
  const [newRPCount, setNewRPCount] = useState<number>(defaultInfo.price);
  const [newRPStartDate, setNewRPStartDate] = useState(
    defaultInfo.startOfSales
  );
  const [newRPEndDate, setNewRPEndDate] = useState("");
  const [newRPId, setNewRPId] = useState<string>(defaultInfo._id);

  // PATCH 요청
  const editRoundProduct = useMutation({
    mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
      return requestPatch({
        requestUrl: requestUrl,
        data: data,
        flagCheckFunc: flagCheckFunc,
      });
    },
  });
  const handleEditRoundProduct = () => {
    if (!newRPName && !newRPCount && !newRPCount && !newRPStartDate) {
      alert("필수항목을 입력하세요");
    } else {
      editRoundProduct.mutate({
        requestUrl: "/roundproduct",
        data: {
          name: newRPName,
          price: newRPCount,
          roundCount: newRPCount,
          startOfSales: newRPStartDate,
          endOfSales: newRPEndDate ? newRPEndDate : null,
          id: newRPId,
        },
        flagCheckFunc: setFlag,
      });
    }
  };

  useEffect(() => {
    if (defaultInfo.endOfSales) setNewRPEndDate(defaultInfo.endOfSales);
  }, [defaultInfo]);
  useEffect(() => {
    if (flag) {
      // setNewRPName("");
      // setNewRPCount(0);
      // setNewRPPrice(0);
      // setNewRPStartDate("");
      // setNewRPEndDate("");
      handleCloseModal();
    }
  }, [flag]);

  const handleShowModal = () => {
    setIsShow(true);
    document.body.style.overflow = "hidden";
  };
  const handleCloseModal = () => {
    setIsShow(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div>
      <div onClick={handleShowModal}>
        <button className="p-1 font-bold flex items-center text-egPurple-default">
          <div>수정</div>
          <MdEdit />
        </button>
      </div>
      {isShow ? (
        <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] border border-red-100 z-[60]">
          <div className="fixed bg-egWhite-default z-[70] w-[30rem] p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="mb-2 text-xl font-bold">회차상품 추가</div>
              <CgClose onClick={handleCloseModal} />
            </div>
            <div className="p-2">
              <div className="my-2 flex items-center">
                <div className="w-28 font-semibold">상품명 *</div>
                <input
                  placeholder="상품명"
                  type="text"
                  value={newRPName}
                  onChange={(e) => setNewRPName(e.target.value)}
                  className="p-1 border border-egGrey-default w-full rounded-sm"
                />
              </div>

              <div className="my-2 flex items-center">
                <div className="w-28 font-semibold">가격 *</div>
                <input
                  type="number"
                  value={newRPPrice}
                  onChange={(e) => setNewRPPrice(Number(e.target.value))}
                  className="p-1 border border-egGrey-default w-full rounded-sm"
                />
              </div>

              <div className="my-2 flex items-center">
                <div className="w-28 font-semibold">총회차 *</div>
                <input
                  type="text"
                  value={newRPCount}
                  onChange={(e) => setNewRPCount(Number(e.target.value))}
                  className="p-1 border border-egGrey-default w-full rounded-sm"
                />
              </div>
              <div className="my-2 flex items-center">
                <div className="w-28 font-semibold">시작 날짜 *</div>
                <input
                  type="datetime-local"
                  value={newRPStartDate}
                  onChange={(e) => setNewRPStartDate(e.target.value)}
                  className="p-1 border border-egGrey-default w-full rounded-sm"
                />
              </div>
              <div className="my-2 flex items-center">
                <div className="w-28 font-semibold">종료 날짜</div>
                <input
                  type="datetime-local"
                  value={newRPEndDate}
                  onChange={(e) => setNewRPEndDate(e.target.value)}
                  className="p-1 border border-egGrey-default w-full rounded-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <WhiteBtn content={"취소"} func={handleCloseModal} />
              <div>
                <PurpleBtn content={"추가"} func={handleEditRoundProduct} />
              </div>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="absolute top-0 z-0 w-screen h-screen"
          ></button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoundProductEditModal;
