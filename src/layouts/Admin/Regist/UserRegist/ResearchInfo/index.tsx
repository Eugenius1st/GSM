// hooks
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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
// Modals
import AbilityEditModal from 'components/Modals/AbilityEditModal';
interface skillType {
    _id: string;
    name: string;
    category: string;
}
interface handleState {
    registStage: number;
    handleNext: () => void;
    handlePreview?: () => void;

    // researchInfoData: any;
    // setResearchInfoData: (data: any) => void;
}
const ResearchInfo = ({
    registStage,
    handleNext,
    handlePreview,
}: // researchInfoData,
// setResearchInfoData,
handleState) => {
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
    const [tagEditState, setTagEditState] = useState(false);

    const [postSuccess, setPostSuccess] = useState<any>(false);

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
        staleTime: 5 * 1000,
    });
    useEffect(() => {
        if (searchedData) {
            searchedData.forEach((data: any) => {
                switch (data.category) {
                    case 'mental':
                        setMentalSkill(data.ability);
                        break;
                    case 'physical':
                        setPhysicalSkill(data.ability);

                        break;
                    case 'technical':
                        setTechnicalSkill(data.ability);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [searchedData]);
    useEffect(() => {
        if (tagEditState) {
            refetch();
            setCheckMentalPros([]);
            setCheckMentalImporve([]);
            setCheckPhysicalPros([]);
            setCheckTechnicalImporve([]);
            setCheckTechnicalPros([]);
            setCheckPhysicalImporve([]);
            setTagEditState(false);
        }
    }, [tagEditState]);

    function validateInputs() {
        if (checkTechnicalPros.length < 3 || checkMentalPros.length < 3 || checkPhysicalPros.length < 3) {
            alert('장점을 각각 3개 이상씩 선택하세요');
            return false;
        } else if (
            checkTechnicalImporve.length < 3 ||
            checkMentalImporve.length < 3 ||
            checkPhysicalImporve.length < 3
        ) {
            alert('개선 희망점을 각각 3개 이상씩 선택하세요');
            return false;
        }
        return true;
    }
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                successFunc: successFunc,
            });
            // return requestPost({ requestUrl: requestUrl, id: id, pw: pw, successFunc: setLoginSelector });
        },
    });
    const postClass = () => {
        if (validateInputs()) {
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
                    improvements: [...checkTechnicalImporve, ...checkMentalImporve, ...checkPhysicalImporve],
                    team: team,
                    position: position,
                    soccerHistory: soccerHistory,
                    lessonHistory: lessonHistory,
                    majorFoot: majorFoot,
                },
                successFunc: setPostSuccess,
            });
        }
    };
    // 사진 등록 요청
    const handlePostPhoto = () => {
        const data = new FormData();
        const { photo } = basicInfoData;
        if (photo && postSuccess._id) {
            data.append('id', postSuccess._id);
            data.append('photo', photo);

            axios
                .post(`${process.env.REACT_APP_API_URL}/photo/student`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    // console.log(res, '사진 전송까지 완료!!');
                    handleNext();
                })
                .catch((err) => console.log(err));
        }
    };
    useEffect(() => {
        if (mutation.status === 'success') {
            handlePostPhoto();
        }
    }, [mutation.status]);

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

            {/* 태그 수정 */}
            <div className="flex items-center justify-end mt-4">
                <AbilityEditModal
                    tagEditState={tagEditState}
                    setTagEditState={setTagEditState}
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
                <div className="mt-1 mb-2">정신적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={mentalSkill}
                    func={setCheckMentalImporve}
                />
            </div>
            <div className="p-2 mt-6 border border-egGrey-default">
                <div className="mt-1 mb-2">신체적 능력 선택(3가지 이상)</div>
                <TagCard
                    tagList={physicalSkill}
                    func={setCheckPhysicalImporve}
                />
            </div>

            {/* 태그 수정 */}
            <div className="flex items-center justify-end mt-4">
                <AbilityEditModal
                    tagEditState={tagEditState}
                    setTagEditState={setTagEditState}
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
                        func={postClass}
                    />
                )}
            </div>
        </div>
    );
};

export default ResearchInfo;
