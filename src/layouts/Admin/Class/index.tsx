// hooks
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// api
import { requestGet } from "api/basic";
// images
import class_adult_man from "assets/class/class_adult_man.jpeg";
import class_adult_woman from "assets/class/class_adult_woman.jpeg";
// Modals
import ClassAddModal from "components/Modals/ClassAddModal";
// Material UI
import Pagenation from "components/EgMaterials/Pagenation";
// Cards
import ClassCard from "components/Cards/ClassCard";
import { ClassInfoType } from "components/Cards/ClassCard";
import EmptyCard from "components/Cards/EmptyCard";
const Class = () => {
  const location = useLocation().pathname;
  const [curPage, setCurPage] = useState(1);
  const [allClass, setAllClass] = useState<ClassInfoType[]>([]);
  const [allCount, setAllCount] = useState(1);
  const [isAddSuccess, setIsAddSuccess] = useState(false);

  // GET 요청을 보낼 함수 정의
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["adminAllClassData"],
    queryFn: () =>
      requestGet({
        requestUrl: `/class?page=${curPage}&take=${4}`,
        // successFunc: () => console.log(data),
      }),
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (data) {
      setAllClass(data.result);
      setAllCount(data.count);
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [curPage]);
  useEffect(() => {
    if (isAddSuccess) refetch();
  }, [isAddSuccess]);
  return (
    <div className="eg-default-wrapper">
      <div className="flex items-center justify-between">
        <div className="eg-title">수업관리</div>
        <ClassAddModal
          isSuccess={isAddSuccess}
          setIsSuccess={setIsAddSuccess}
        />
      </div>
      {allClass && allClass.length > 0 ? (
        <>
          {allClass.map((el, idx) => (
            <Link key={idx} to={`${location}/${el._id}`}>
              <ClassCard classInfo={el} />
            </Link>
          ))}
        </>
      ) : (
        <EmptyCard content="수업 준비중 입니다" />
      )}
      <div className="flex justify-center">
        <Pagenation
          totalItems={allCount ? allCount : 1}
          curPage={curPage}
          itemsPerPage={4}
          setCurPage={(page) => setCurPage(page)}
        />
      </div>
    </div>
  );
};
export default Class;
