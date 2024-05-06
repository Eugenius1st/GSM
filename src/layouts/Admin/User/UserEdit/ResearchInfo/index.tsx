// hooks
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
// api
import { requestGet } from "api/basic";
// recoil
import { useRecoilState } from "recoil";
import {
  TermsAgreeAtomSelector,
  BasicInfoAtomSelector,
  AdditionalInfoAtomSelector,
  ResearchInfoAtomSelector,
} from "atom/userRegist";
// Common
import TagCard from "components/Common/Tags/TagCard";
import Divider from "components/Common/Divider";

interface skillType {
  _id: string;
  name: string;
  category: string;
}
interface handleState {
  technicalSkillPros: skillType[];
  setTechnicalSkillPros: (data: skillType[]) => void;
  mentalSkillPros: skillType[];
  setMentalSkillPros: (data: skillType[]) => void;
  physicalSkillPros: skillType[];
  setPhysicalSkillPros: (data: skillType[]) => void;
  technicalSkillImpro: skillType[];
  setTechnicalSkillImpro: (data: skillType[]) => void;
  mentalSkillImpro: skillType[];
  setMentalSkillImpro: (data: skillType[]) => void;
  physicalSkillImpro: skillType[];
  setPhysicalSkillImpro: (data: skillType[]) => void;
}
const ResearchInfo = ({
  technicalSkillPros,
  setTechnicalSkillPros,
  mentalSkillPros,
  setMentalSkillPros,
  physicalSkillPros,
  setPhysicalSkillPros,
  technicalSkillImpro,
  setTechnicalSkillImpro,
  mentalSkillImpro,
  setMentalSkillImpro,
  physicalSkillImpro,
  setPhysicalSkillImpro,
}: handleState) => {
  const [basicInfoData, setBasicInfoData] = useRecoilState<any>(
    BasicInfoAtomSelector
  );
  const [additionalInfoData, setAdditionalInfoData] = useRecoilState<any>(
    AdditionalInfoAtomSelector
  );
  const [searchedData, setSearchedData] = useState([]);

  const [technicalSkill, setTechnicalSkill] = useState<skillType[]>([]);

  const [mentalSkill, setMentalSkill] = useState<skillType[]>([]);

  const [physicalSkill, setPhysicalSkill] = useState<skillType[]>([]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getAbility"],
    queryFn: () => {
      return requestGet({
        requestUrl: `/ability`,
        successFunc: setSearchedData,
        // flagCheckFunc: setIsSearched,
      });
    },
  });
  useEffect(() => {
    if (searchedData) {
      searchedData.forEach((data: any) => {
        switch (data.category) {
          case "mental":
            setMentalSkill(data.ability);
            break;
          case "physical":
            setPhysicalSkill(data.ability);

            break;
          case "technical":
            setTechnicalSkill(data.ability);
            break;
          default:
            break;
        }
      });
    }
  }, [searchedData]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full pb-10">
        <div className="eg-title">나의 축구 기술 조사</div>
        <div className="w-fit">
          <div>⦁ 선수님들의 기술 및 경기력 향상에 필요한 정보입니다.</div>
          <div>⦁ GSM을 이용하시는데 더 편리할 수 있게 도와드려요.</div>
        </div>
      </div>
      {/* 내 장점 */}
      <div className="px-6 py-1 m-auto border w-fit border-egGrey-default">
        내 장점
      </div>
      <div className="p-2 mt-6 border border-egGrey-default">
        <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
        <TagCard
          tagList={technicalSkill}
          func={setTechnicalSkillPros}
          defaultTagList={technicalSkillPros}
        />
      </div>
      <div className="p-2 mt-6 border border-egGrey-default">
        <div className="mt-1 mb-2">정신적 능력 선택(3가지 이상)</div>
        <TagCard
          tagList={mentalSkill}
          func={setMentalSkillPros}
          defaultTagList={mentalSkillPros}
        />
      </div>
      <div className="p-2 mt-6 border border-egGrey-default">
        <div className="mt-1 mb-2">신체적 능력 선택(3가지 이상)</div>
        <TagCard
          tagList={physicalSkill}
          func={setPhysicalSkillPros}
          defaultTagList={physicalSkillPros}
        />
      </div>
      <Divider />
      {/* 개선 희망점 */}
      <div className="px-6 py-1 m-auto border w-fit border-egGrey-default">
        개선 희망점
      </div>
      <div className="p-2 mt-6 border border-egGrey-default">
        <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
        <TagCard
          tagList={technicalSkill}
          func={setTechnicalSkillImpro}
          defaultTagList={technicalSkillImpro}
        />
      </div>
      <div className="p-2 mt-6 border border-egGrey-default">
        <div className="mt-1 mb-2">정신적 능력 선택(3가지 이상)</div>
        <TagCard
          tagList={mentalSkill}
          func={setMentalSkillImpro}
          defaultTagList={mentalSkillImpro}
        />
      </div>
      <div className="p-2 mt-6 border border-egGrey-default">
        <div className="mt-1 mb-2">신체적 능력 선택(3가지 이상)</div>
        <TagCard
          tagList={physicalSkill}
          func={setPhysicalSkillImpro}
          defaultTagList={physicalSkillImpro}
        />
      </div>
      <Divider />
    </div>
  );
};

export default ResearchInfo;
