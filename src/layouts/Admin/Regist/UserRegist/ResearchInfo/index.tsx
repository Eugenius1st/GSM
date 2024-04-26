// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestPost } from 'api/basic';
// recoil
import { useRecoilState } from 'recoil';
import {
    TermsAgreeAtomSelector,
    BasicInfoAtomSelector,
    AdditionalInfoAtomSelector,
    ResearchInfoAtomSelector,
} from 'atom/userRegist';
// Common
import TagCard from 'components/Common/Tags/TagCard';
import Divider from 'components/Common/Divider';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';

interface skillType {
    _id: string;
    name: string;
    category: string;
}
interface handleState {
    registStage: number;
    handleNext: () => void;
    handlePreview?: () => void;
    researchInfoData: any;
    setResearchInfoData: (data: any) => void;
}
const ResearchInfo = ({
    registStage,
    handleNext,
    handlePreview,
    researchInfoData,
    setResearchInfoData,
}: handleState) => {
    const [basicInfoData, setBasicInfoData] = useRecoilState<any>(BasicInfoAtomSelector);
    const [additionalInfoData, setAdditionalInfoData] = useRecoilState<any>(AdditionalInfoAtomSelector);

    const [searchedData, setSearchedData] = useState([]);
    const [technicalSkill, setTechnicalSkill] = useState<skillType[]>([]);
    const [checkTechnicalPros, setCheckTechnicalPros] = useState<skillType[]>([]);
    const [checkTechnicalImporve, setCheckTechnicalImporve] = useState<skillType[]>([]);
    const [mentalSkill, setMentalSkill] = useState<skillType[]>([]);
    const [checkMentalPros, setCheckMentalPros] = useState<skillType[]>([]);
    const [checkMentalImporve, setCheckMentalImporve] = useState<skillType[]>([]);

    const [physicalSkill, setPhysicalSkill] = useState<skillType[]>([]);
    const [checkPhysicalPros, setCheckPhysicalPros] = useState<skillType[]>([]);
    const [checkPhysicalImporve, setCheckPhysicalImporve] = useState<skillType[]>([]);

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['getAbility'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/ability`,
                successFunc: setSearchedData,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 100,
    });
    useEffect(() => {
        if (searchedData) {
            searchedData.forEach((data: any) => {
                switch (data.category) {
                    case 'mental':
                        setTechnicalSkill(data.ability);
                        break;
                    case 'physical':
                        setMentalSkill(data.ability);

                        break;
                    case 'technical':
                        setPhysicalSkill(data.ability);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [searchedData]);

    function stageSubmit() {
        const test = {
            pros: [...checkTechnicalPros, ...checkMentalPros, ...checkPhysicalPros],
            improvements: [...checkTechnicalImporve, ...checkMentalImporve, ...checkPhysicalImporve],
        };
    }
    const [flag, setFlag] = useState(false);
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
            // return requestPost({ requestUrl: requestUrl, id: id, pw: pw, successFunc: setLoginSelector });
        },
    });
    console.log(additionalInfoData);
    const postClass = () => {
        // POST 요청에 보낼 데이터
        const {
            id,
            password,
            role,
            scope,
            photo,
            name,
            phone,
            phoneFather,
            phoneMother,
            residence,
            residenceSpecific,
            birth,
            gender,
        } = basicInfoData;
        const { height, weight, classGroupName, team, soccerHistory, lessonHistory, majorFoot, position } =
            additionalInfoData;
        mutation.mutate({
            requestUrl: '/auth/signup/student',
            data: {
                id: id,
                password: password,
                role: 'student',
                scope: ['gsm'],
                photo: photo,
                classGroupName: classGroupName,
                name: name,
                phone: phone,
                phoneFather: phoneFather,
                phoneMother: phoneMother,
                residence: residence,
                residenceSpecific: residenceSpecific,
                birth: birth,
                gender: gender,
                height: Number(height),
                weight: Number(weight),
                pros: [...checkTechnicalPros, ...checkMentalPros, ...checkPhysicalPros],
                improvements: [
                    {
                        _id: '661cc79a61f9c865cc4bbf24',
                        name: '패널티킥',
                        category: 'technical',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf25',
                        name: '코너킥',
                        category: 'technical',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf26',
                        name: '퍼스트 터치',
                        category: 'technical',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf34',
                        name: '승부욕',
                        category: 'mental',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf35',
                        name: '예측력',
                        category: 'mental',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf36',
                        name: '적극성',
                        category: 'mental',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf3f',
                        name: '민첩성',
                        category: 'physical',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf40',
                        name: '지구력',
                        category: 'physical',
                    },
                    {
                        _id: '661cc79a61f9c865cc4bbf41',
                        name: '균형감각',
                        category: 'physical',
                    },
                ],
                team: team,
                position: position,
                soccerHistory: soccerHistory,
                lessonHistory: lessonHistory,
                majorFoot: majorFoot,
            },
            successFunc: setFlag,
        });
    };
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
            <div className="px-6 py-1 m-auto border w-fit border-egGrey-default">내 장점</div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={technicalSkill}
                    func={setCheckTechnicalPros}
                />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">정신적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={mentalSkill}
                    func={setCheckMentalPros}
                />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">신체적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={physicalSkill}
                    func={setCheckPhysicalPros}
                />
            </div>
            <Divider />
            {/* 개선 희망점 */}
            <div className="px-6 py-1 m-auto border w-fit border-egGrey-default">개선 희망점</div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={technicalSkill}
                    func={setCheckTechnicalImporve}
                />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={mentalSkill}
                    func={setCheckMentalImporve}
                />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">기술적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={physicalSkill}
                    func={setCheckPhysicalImporve}
                />
            </div>
            <Divider />
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
                        // func={validConfirm}
                        func={postClass}
                    />
                )}
                {registStage === 5 && (
                    <PurpleBtn
                        content={'완료'}
                        func={postClass}
                        width="full"
                    />
                )}
            </div>
        </div>
    );
};

export default ResearchInfo;
