// hooks
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { IsMobileSelector } from "atom/isMobile";
// Eg Components
import EgCheckBox from "components/EgMaterials/CheckBox";

// Common
import Divider from "components/Common/Divider";
import BasicModal from "components/Modals/BasicModal";
// utility
import { positionMatcherByEng } from "utility/standardConst";
// icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
// images
import userImg from "assets/user/user.png";
// Admin User Components
import UserRoundTest from "layouts/Admin/User/Components/UserRoundProduct";

interface reasonList {
  count?: string;
  date?: string;
  reson?: string;
}
interface ClassInfo {
  lessonName?: string;
  deposit?: boolean;
  remainingRounds?: number;
  paymentRound?: number;
  reasonList: reasonList[];
}

interface prosImproType {
  category: string;
  name: string;
}

interface UserInfoType {
  classGroupId?: any;
  classGroupName?: string;
  _id?: string;
  isDeleted?: boolean;
  deletedAt?: any;
  authId?: string;
  photo?: string;
  currentRoundId?: string;
  classId?: any;
  className?: string;
  name?: string;
  name_token?: string;
  name_token_heads?: string;
  phone?: string;
  phoneFather?: string;
  phoneMother?: string;
  residence?: string;
  residenceSpecific?: string;
  birth?: string;
  gender?: string;
  height?: number;
  weight?: number;
  pros?: prosImproType[];
  improvements?: prosImproType[];
  team?: string;
  grade?: string;
  position?: string[];
  lessonExpire?: any;
  soccerHistory?: string;
  lessonHistory?: string;
  majorFoot?: string;
  marketingAgree?: boolean;
  serviceAgree?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  name_spaced?: string;
  name_token_heads_spaced?: string;
  name_token_spaced?: string;
}

interface InfoType {
  userInfo: UserInfoType;
}

const UserProfileCard = ({ userInfo }: InfoType) => {
  const {
    classGroupId,
    classGroupName,
    _id,
    isDeleted,
    deletedAt,
    authId,
    photo,
    currentRoundId,
    classId,
    className,
    name,
    name_token,
    name_token_heads,
    phone,
    phoneFather,
    phoneMother,
    residence,
    residenceSpecific,
    birth,
    gender,
    height,
    weight,
    pros,
    improvements,
    team,
    grade,
    position,
    lessonExpire,
    soccerHistory,
    lessonHistory,
    majorFoot,
    marketingAgree,
    serviceAgree,
    createdAt,
    updatedAt,
    __v,
    name_spaced,
    name_token_heads_spaced,
    name_token_spaced,
  } = userInfo;
  let isMobile = useRecoilValue(IsMobileSelector);
  const titleStyle = "mr-2 font-bold px-1 my-1 bg-egPurple-superLight";
  const listStyle = "w-64 min-h-14";
  const contentStyle = "px-1";
  const [seeMore, setSeeMore] = useState(false);
  const [marketingPrivacy, setMarketingPrivacy] = useState(marketingAgree);
  const [marketingEvent, setMarketingEvent] = useState(serviceAgree);

  return (
    <div>
      <div
        className={
          isMobile ? "w-fit m-auto" : "flex items-center justify-between"
        }
      >
        <div className={isMobile ? "flex justify-center mb-5 " : ""}>
          <img
            src={photo === "any-photo-url" ? userImg : ""}
            alt="coach_son"
            className={
              "object-cover h-40 p-1 mr-4 border rounded-full border-egPurple-default min-w-40"
            }
          />
        </div>
        <div className={isMobile ? "grid grid-cols-1" : "grid grid-cols-2"}>
          <div className={listStyle}>
            <div className={titleStyle}>이름</div>
            <div className={contentStyle}>{name}</div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>생년월일</div>
            <div className={contentStyle}>{birth?.slice(0, 10)}</div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>성별</div>
            <div className={contentStyle}>
              {gender === "man" ? "남자" : "여자"}
            </div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>키 / 무게</div>
            <div className={contentStyle}>
              {height}cm / {weight}kg
            </div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>휴대폰</div>
            <div className={contentStyle}>{phone}</div>
          </div>

          <div className={listStyle}>
            <div className={titleStyle}>부모님 휴대폰</div>
            {phoneFather && (
              <div className={contentStyle}>부: {phoneFather}</div>
            )}
            {phoneMother && (
              <div className={contentStyle}>모: {phoneMother}</div>
            )}
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>주소</div>
            <div className={contentStyle}>{residence}</div>
            <div className={contentStyle}>{residenceSpecific}</div>
          </div>

          <div className={listStyle}>
            <div className={titleStyle}>포지션</div>
            <div className={contentStyle}>
              {position?.map((el, idx) => (
                <span
                  key={idx}
                  className="border border-egPurple-light rounded-sm px-[2px] py-[1px] m-[2px] inline-block"
                >
                  {positionMatcherByEng(el)}
                </span>
              ))}
            </div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>장점</div>
            {pros?.map((el, idx) => (
              <span
                key={idx}
                className="border border-egPurple-light  bg-egGrey-light rounded-sm px-[2px] py-[1px] m-[2px] inline-block"
              >
                {el.name}
              </span>
            ))}
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>개선점</div>
            {improvements?.map((el, idx) => (
              <span
                key={idx}
                className="border border-egPurple-light bg-egGrey-light rounded-sm px-[2px] py-[1px] m-[2px] inline-block"
              >
                {el.name}
              </span>
            ))}
          </div>

          <div className={listStyle}>
            <div className={titleStyle}>축구 구력</div>
            <div className={contentStyle}>{soccerHistory}</div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>레슨 경험</div>
            <div className={contentStyle}>{lessonHistory}</div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>소속</div>
            <div className={contentStyle}>{team}</div>
          </div>
          <div className={listStyle}>
            <div className={titleStyle}>주 발(사용발)</div>
            <div className={contentStyle}>{majorFoot}</div>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <ul>
          <li className="flex mb-1">
            <div className="font-bold w-28">레슨명</div>
            <div>{classGroupName}</div>
          </li>

          <li className="flex justify-between mb-4">
            <div className="flex">
              <div className="font-bold w-28">회차추가</div>
              {/* {classInfo.remainingRounds}/{classInfo.paymentRound} */}
            </div>
            <div className="flex">
              <button
                onClick={() => setSeeMore(!seeMore)}
                className="px-2 py-1 border rounded-md text-egPurple-default border-egPurple-default"
              >
                내역보기
                {seeMore ? (
                  <IoIosArrowUp className="inline ml-1" />
                ) : (
                  <IoIosArrowDown className="inline ml-1" />
                )}
              </button>
              <UserRoundTest />

              <BasicModal
                modalBtn={
                  <button className="px-[10px] py-1 ml-1 border rounded-md text-egPurple-default border-egPurple-default">
                    -
                  </button>
                }
                modalTitle={"회차차감"}
                modalContents={
                  <div className="p-4">
                    <div className="flex mb-2">
                      <span className="mr-4 text-lg font-semibold">날짜</span>
                      <input
                        type="date"
                        className="w-40 p-1 border rounded-md border-egPurple-semiLight"
                      />
                    </div>

                    <div className="flex mb-2">
                      <span className="mr-4 text-lg font-semibold">횟수</span>
                      <input
                        placeholder="숫자 입력"
                        type="number"
                        min="-99"
                        max="0"
                        className="w-40 p-1 border rounded-md border-egPurple-semiLight"
                      />
                    </div>
                    <div className="flex mb-2">
                      <span className="mr-4 text-lg font-semibold">사유</span>
                      <textarea
                        name="opinion"
                        cols={30}
                        rows={3}
                        maxLength={30}
                        placeholder="사유는 30글자 내로 작성하세요"
                        className="p-1 border rounded-md border-egPurple-semiLight"
                      ></textarea>
                    </div>
                  </div>
                }
                modalFooterExitBtn={"취소"}
                modalFooterActiveBtn={"제출"}
              />
            </div>
          </li>
          {/* {seeMore &&
                        classInfo.reasonList.map((el, idx) => (
                            <li
                                key={idx}
                                className="flex mb-2 border-b border-egPurple-light"
                            >
                                <div className="w-36"></div>
                                <div className="flex w-full">
                                    <div className="w-1/3">{el.count}</div>
                                    <div className="w-1/3">{el.reson}</div>
                                    <div className="w-1/3">{el.date}</div>
                                </div>
                            </li>
                        ))} */}
          <li className="mb-1 flex">
            <div className="mt-[9px] w-28 font-bold flex-shrink-0">
              마케팅 동의
            </div>
            <div className="grid grid-cols-2 w-full">
              <div
                onClick={() => setMarketingPrivacy(!marketingPrivacy)}
                className="inline-block full"
              >
                <span>개인정보 수집 및 이용 동의</span>
                {marketingPrivacy && <EgCheckBox checked={marketingPrivacy} />}
              </div>
              <div
                onClick={() => setMarketingEvent(!marketingEvent)}
                className="inline-block w-full"
              >
                <span>소식 수신 및 이벤트 참여</span>
                {marketingEvent && <EgCheckBox checked={marketingEvent} />}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileCard;
