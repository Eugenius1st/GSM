// hooks
import { useState, useEffect } from 'react';
// recoil
import { useRecoilState } from 'recoil';
import {
    TermsAgreeAtomSelector,
    BasicInfoAtomSelector,
    AdditionalInfoAtomSelector,
    ResearchInfoAtomSelector,
} from 'atom/userRegist';
// User Regist Components
import TermsAgree from 'layouts/Admin/Regist/UserRegist//TermsAgree';
import BasicInfo from 'layouts/Admin/Regist/UserRegist/BasicInfo';
import AdditionalInfo from 'layouts/Admin/Regist/UserRegist/AdditionalInfo';
import ResearchInfo from 'layouts/Admin/Regist/UserRegist/ResearchInfo';
import RegistComplete from 'layouts/Admin/Regist/UserRegist/RegistComplete';
// icons
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { FiCheckSquare } from 'react-icons/fi';
import { LuPencilLine } from 'react-icons/lu';
import { FiUserCheck } from 'react-icons/fi';

const UserRegist = () => {
    const [registStage, setRegistStage] = useState(1);
    const [termsAgreeData, setTermsAgreeData] = useRecoilState(TermsAgreeAtomSelector);
    const [basicInfoData, setBasicInfoData] = useRecoilState(BasicInfoAtomSelector);
    const [additionalInfoData, setAdditionalInfoData] = useRecoilState(AdditionalInfoAtomSelector);
    // const [researchInfoData, setResearchInfoData] = useRecoilState(ResearchInfoAtomSelector);
    function handleNext() {
        if (registStage < 5) setRegistStage(registStage + 1);
    }
    function handlePreview() {
        if (registStage > 1) setRegistStage(registStage - 1);
    }
    const [stageBarStyle, setStageBarStyle] = useState(`h-2 rounded-lg bg-egPurple-default absolue w-1/5`);
    useEffect(() => {
        if (registStage === 2) setStageBarStyle(`h-2 rounded-lg bg-egPurple-default absolue w-2/5`);
        else if (registStage === 3) setStageBarStyle(`h-2 rounded-lg bg-egPurple-default absolue w-3/5`);
        else if (registStage === 4) setStageBarStyle(`h-2 rounded-lg bg-egPurple-default absolue w-4/5`);
        else setStageBarStyle(`h-2 rounded-lg bg-egPurple-default absolue w-${registStage}/5`);

        window.scrollTo(0, 0);
        if (registStage === 5) {
            setTermsAgreeData('');
            setBasicInfoData('');
            setAdditionalInfoData('');
        }
    }, [registStage]);

    return (
        <div className="eg-regist-wrapper">
            {registStage < 4 && (
                <div className="flex items-center justify-start pb-5 eg-title">
                    <span>회원 등록</span>
                    <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
                    <span>{registStage === 1 ? '약관 동의' : registStage === 5 ? '가입 완료' : '정보 입력'}</span>
                </div>
            )}
            <div className="my-10">
                <div className="flex justify-between m-auto mx-10 text-center">
                    <div>
                        <FiCheckSquare className="w-12 h-12 p-2 rounded-full bg-egPurple-light" />
                        <div className="mt-1 text-sm">약관동의</div>
                    </div>
                    <div>
                        <LuPencilLine className="w-12 h-12 p-2 rounded-full bg-egPurple-light" />
                        <div className="mt-1 text-sm">정보입력</div>
                    </div>
                    <div>
                        <FiUserCheck className="w-12 h-12 p-2 rounded-full bg-egPurple-light" />
                        <div className="mt-1 text-sm">가입완료</div>
                    </div>
                </div>
                <div className="relative h-2 mt-5 rounded-lg bg-egGrey-semiLight">
                    <div className={stageBarStyle}></div>
                </div>
            </div>

            {registStage === 1 ? (
                <TermsAgree
                    registStage={registStage}
                    handleNext={handleNext}
                    termsAgreeData={termsAgreeData}
                    setTermsAgreeData={setTermsAgreeData}
                />
            ) : registStage === 2 ? (
                <BasicInfo
                    registStage={registStage}
                    handleNext={handleNext}
                    handlePreview={handlePreview}
                    basicInfoData={basicInfoData}
                    setBasicInfoData={setBasicInfoData}
                />
            ) : registStage === 3 ? (
                <AdditionalInfo
                    registStage={registStage}
                    handleNext={handleNext}
                    handlePreview={handlePreview}
                    additionalInfoData={additionalInfoData}
                    setAdditionalInfoData={setAdditionalInfoData}
                />
            ) : registStage === 4 ? (
                <ResearchInfo
                    registStage={registStage}
                    handleNext={handleNext}
                    handlePreview={handlePreview}
                    // researchInfoData={researchInfoData}
                    // setResearchInfoData={setResearchInfoData}
                />
            ) : (
                <RegistComplete />
            )}
        </div>
    );
};

export default UserRegist;
