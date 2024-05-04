// hooks
import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { requestPost } from "api/basic";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
// recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { IsMobileSelector } from "atom/isMobile";
import { LoginAtomSelector, LoginStateSelector } from "atom/auth";
// api
import { decode } from "api/decode";
import { dateConverter } from "api/dateConverter";
// Card
import EmptyCard from "components/Cards/EmptyCard";

export interface ClassInfoType {
  _id: string;
  name: string;
  place: string;
  startTime: string;
  endTime: string;
  type: string;
  amount: number;
  students: string[];
  attendance: number;
  reserved: number;
  applicationDeadline?: string;
  attendancereservations?: string[];
  coaches?: any;
  note?: string;
}

interface ClasCardType {
  title?: string;
  classInfo: ClassInfoType | undefined;
}

const CoachClassCard = ({ title, classInfo }: ClasCardType) => {
  const { classId } = useParams();
  let isMobile = useRecoilValue(IsMobileSelector);
  const [loginState, setLoginState] = useRecoilState(LoginStateSelector);
  const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
  const [userId, setUserId] = useState<any>("");
  const infoStyle =
    "mb-2 pb-1 flex border-b border-egGrey-default items-center";
  const titleStyle = isMobile ? "mr-2 w-24 flex-shrink-0" : "mr-2 w-20 ";
  const highLight = "px-1 bg-egPurple-superLight";

  // POST 수업추가 요청을 보낼 함수 정의
  const mutation = useMutation({
    mutationFn: ({ requestUrl, data, successFunc }: any) => {
      return requestPost({
        requestUrl: requestUrl,
        data: data,
        successFunc: successFunc,
      });
    },
  });
  return (
    <div>
      {classInfo ? (
        <div className="relative p-4 mb-4 border shadow-md z-100 border-egGrey-default">
          <div
            className={
              isMobile
                ? "flex flex-col items-center justify-center"
                : "flex items-center"
            }
          >
            <div
              className={
                isMobile ? "w-full h-[16rem] mb-4" : "w-[30rem] h-[10rem] mb-4"
              }
            >
              <img
                // src={classInfo.classImage}
                alt="title"
                className="object-cover w-full h-full mr-4 border-2"
              />
            </div>
            <div className="w-full ml-4">
              <div className={infoStyle}>
                <div className={titleStyle}>
                  <span className={highLight}>수업명</span>
                </div>
                <div>{classInfo?.name}</div>
              </div>
              <div className={infoStyle}>
                <div className={titleStyle}>
                  <span className={highLight}>시간</span>
                </div>
                <div>
                  <div>
                    {`${dateConverter(
                      classInfo?.startTime,
                      "month_day"
                    )} ${dateConverter(
                      classInfo?.startTime,
                      "time"
                    )}~${dateConverter(classInfo?.endTime, "time")}`}
                  </div>
                </div>
              </div>
              <div className={infoStyle}>
                <div className={titleStyle}>
                  <span className={highLight}>위치</span>
                </div>
                <div>{classInfo?.place}</div>
              </div>
              <div className={infoStyle}>
                <div className={titleStyle}>
                  <span className={highLight}>참석</span>
                </div>
                <div>
                  {classInfo?.attendance && classInfo?.students.length > 0
                    ? classInfo?.reserved
                    : 0}
                  /{classInfo?.amount} (대기자
                  {classInfo?.reserved ? classInfo?.reserved : 0} 명){" "}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ml-2">
            {classInfo?.coaches && (
              <div className={infoStyle}>
                <div className="flex w-full">
                  <span className={highLight}>참가코치</span>
                  {classInfo.coaches.map((el: any, idx: string) => (
                    <div
                      key={idx}
                      className="flex items-center px-1 mx-2 rounded-md bg-egBlack-superLight"
                    >
                      {el.name}
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
            )}

            {classInfo?.note && (
              <div className={infoStyle}>
                <div className={titleStyle}>
                  <span className="px-1 bg-egRed-semiLihgt">안내사항</span>
                </div>
                <div>{classInfo?.note}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyCard
          content="수업 준비중입니다"
          customStyle="py-10 text-egPurple-semiLight flex flex-col justify-center items-center border border-egGrey-default mb-10 shadow-md"
        />
      )}
    </div>
  );
};

export default CoachClassCard;
