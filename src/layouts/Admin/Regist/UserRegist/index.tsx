// hooks
import { useState, useEffect } from 'react';
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
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
const UserRegist = () => {
    const [registStage, setRegistStage] = useState(1);
    function handleNext() {
        if (registStage < 5) setRegistStage(registStage + 1);
    }
    function handlePreview() {
        if (registStage > 1) setRegistStage(registStage - 1);
    }
    const [stageBarStyle, setStageBarStyle] = useState(`h-2 rounded-lg bg-egPurple-default absolue w-1/5`);
    useEffect(() => {
        setStageBarStyle(`h-2 rounded-lg bg-egPurple-default absolue w-${registStage}/5`);
    }, [registStage]);
    return (
        <div className="eg-regist-wrapper">
            <div className="mt-10">
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
            {registStage < 4 && (
                <div className="flex items-center justify-start py-5 eg-title">
                    <span>회원 등록</span>
                    <MdOutlineArrowForwardIos className="w-4 h-4 mx-1" />
                    <span>{registStage === 1 ? '약관 동의' : registStage === 5 ? '가입 완료' : '정보 입력'}</span>
                </div>
            )}
            {registStage === 1 ? (
                <TermsAgree />
            ) : registStage === 2 ? (
                <BasicInfo />
            ) : registStage === 3 ? (
                <AdditionalInfo />
            ) : registStage === 4 ? (
                <ResearchInfo />
            ) : (
                <RegistComplete />
            )}
            <div className="flex justify-end my-8">
                {registStage > 1 && registStage < 5 && (
                    <WhiteBtn
                        content="이전"
                        func={handlePreview}
                    />
                )}
                {registStage < 5 && (
                    <PurpleBtn
                        content={registStage < 4 ? '다음' : '가입하기'}
                        func={handleNext}
                    />
                )}
                {registStage === 5 && (
                    <PurpleBtn
                        content={'완료'}
                        func={handleNext}
                        width="full"
                    />
                )}
            </div>
        </div>
    );
};

export default UserRegist;
