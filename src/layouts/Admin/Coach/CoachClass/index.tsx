// hooks
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// api
import { requestGet } from "api/basic";
// Icons
import { MdOutlineArrowForwardIos } from "react-icons/md";
// Cards
import { ClassInfoType } from "components/Cards/CoachClassCard";
import CoachClassCard from "components/Cards/CoachClassCard";
import EmptyCard from "components/Cards/EmptyCard";
// Material UI
import Pagenation from "components/EgMaterials/Pagenation";
// images
import class_adult_man from "assets/class/class_adult_man.jpeg";
import class_adult_woman from "assets/class/class_adult_woman.jpeg";

const CoachClass = () => {
  const location = useLocation().pathname;
  const [curPage, setCurPage] = useState(1);
  const [allClass, setAllClass] = useState<ClassInfoType[]>([]);
  const [allCount, setAllCount] = useState(1);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const { coachId } = useParams();
  // GET 요청을 보낼 함수 정의

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["coachClassData"],
    queryFn: () => {
      if (coachId) {
        return requestGet({
          requestUrl: `/class/coach/${coachId}?page=${curPage}&take=${4}`,
          // successFunc: () => console.log(data),
        });
      } else {
        return Promise.resolve([]); // 또는 다른 유효한 값을 반환할 수 있음
      }
    },
  });

  useEffect(() => {
    if (data) {
      setAllClass(data.result);
      setAllCount(data.count);
    }
  }, [data]);

  return (
    <div className="eg-default-wrapper">
      <div className="flex items-center justify-start eg-title">
        <span>코치관리</span>
        <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
        <span> 수업정보</span>
      </div>
      <div>
        {allClass && allClass.length > 0 ? (
          <>
            {allClass.map((el, idx) => (
              <Link key={idx} to={`/admin/coach/coach-class-detail/${el._id}`}>
                <CoachClassCard classInfo={el} />
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
    </div>
  );
};

export default CoachClass;
