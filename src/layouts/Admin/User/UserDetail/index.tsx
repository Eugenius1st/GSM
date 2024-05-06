// hooks
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
// api
import { requestPatch, requestGet } from "api/basic";
// Cards
import MemoCard from "components/Cards/MemoCard";
// Common
import Divider from "components/Common/Divider";
// Admin User Components
import UserProfileCard from "layouts/Admin/User/Components/UserProfileCard";
// Modals
import EditModal from "components/Modals/EditModal";
import PasswordEditModal from "components/Modals/PasswordEditModal";
// Buttons
import WhiteBtn from "components/Buttons/WhiteBtn";
import LightPurpleBtn from "components/Buttons/LightPurpleBtn";

interface PatchDataType {
  requestUrl: string;
  data?: any;
  flagCheckFunc?: (data: boolean) => void;
}

const UserDetail = () => {
  const { userId } = useParams();
  const [curUser, setCurUser] = useState();
  const [patchUnblockFlag, setPatchUnblockFlag] = useState(false); // 비활성화 성공 여부
  const [patchBlockFlag, setPatchBlockFlag] = useState(false); // 비활성화 성공 여부

  const navigate = useNavigate();
  // GET 요청을 보낼 함수 정의
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["userDetailInfo"],
    queryFn: () => {
      return requestGet({
        requestUrl: `/student/${userId}`,
        successFunc: setCurUser,
        // flagCheckFunc: setIsSearched,
      });
    },
  });

  const userMemo = {
    feedback: [
      {
        date: "2024-03-07",
        content: "왼발 자세 보완 필요",
      },
      { date: "2024-03-07", content: "왼발 자세 보완 필요" },
      { date: "2024-03-07", content: "왼발 자세 보완 필요" },
      { date: "2024-03-07", content: "왼발 자세 보완 필요" },
      { date: "2024-03-05", content: "드리블 훌륭" },
      { date: "2024-03-04", content: "드리블 매우 훌륭" },
    ],
    significant: [
      {
        date: "2024-03-07",
        content:
          "태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음 태도가 아주 좋음",
      },
      { date: "2024-03-07", content: "태도가 아주 좋음" },
      { date: "2024-03-07", content: "태도가 아주 좋음" },
      { date: "2024-03-07", content: "태도가 아주 좋음" },
      { date: "2024-03-05", content: "인사성 밝음" },
      { date: "2024-03-04", content: "아이들 이름 외울 필요 있음" },
    ],
  };
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
        <div className="flex">
          <EditModal activeFunc={editActive} />
          <PasswordEditModal />
        </div>
      </div>
      {curUser && <UserProfileCard userInfo={curUser} />}
      <Divider />
      <MemoCard tab={["피드백", "특이사항"]} memo={userMemo} />
      <div className="flex justify-end my-8">
        {/* 유저 차단, 활성화 구분 정보 있다면 버튼 1개만 보이게 하는 것이 좋을 듯 */}
        <WhiteBtn content="유저 차단" func={handleBlock} />
        <LightPurpleBtn content="차단 해제" func={handleUnblock} />
      </div>
    </div>
  );
};

export default UserDetail;
