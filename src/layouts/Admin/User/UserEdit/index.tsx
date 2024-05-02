// hooks
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {} from '@tanstack/react-query';
// api
import { requestGet, requestPatch } from 'api/basic';
// User Regist Components
import TermsAgree from 'layouts/Admin/Regist/UserRegist//TermsAgree';
import BasicInfo from 'layouts/Admin/User/UserEdit/BasicInfo';
import AdditionalInfo from 'layouts/Admin/User/UserEdit/AdditionalInfo';
import ResearchInfo from 'layouts/Admin/User/UserEdit/ResearchInfo';
// icons
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { FiCheckSquare } from 'react-icons/fi';
import { LuPencilLine } from 'react-icons/lu';
import { FiUserCheck } from 'react-icons/fi';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// utils
import { classGroupMatcherByKor, classGroupMatcherByEng } from 'utility/standardConst';
interface skillType {
    _id: string;
    name: string;
    category: string;
}
const UserRegist = () => {
    const { userId } = useParams();
    const [curUser, setCurUser] = useState<any>();
    // basic 데이터
    const [photo, setPhoto] = useState('any-photo-url');
    const [name, setName] = useState('');
    const [defaultBirth, setDefaultBirth] = useState('');
    const [birth, setBirth] = useState('');
    const [defaultGender, setDefaultGender] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneFather, setPhoneFather] = useState('');
    const [phoneMother, setPhoneMother] = useState('');
    const [residence, setResidence] = useState('');
    const [residenceSpecific, setResidenceSpecific] = useState('');

    // additional 데이터
    const [height, setHeight] = useState<number | string>('');
    const [weight, setWeight] = useState<number | string>('');
    const [team, setTeam] = useState('');
    const [soccerHistory, setSoccerHistory] = useState('');
    const [lessonHistory, setLessonHistory] = useState('');
    const [classGroupName, setClassGroupName] = useState('');
    const [majorFoot, setMajorFoot] = useState('');
    const [position, setPosition] = useState<string[]>([]);
    const [defaultPosition, setDefaultPosition] = useState([]);

    // research 데이터
    const [curUserPros, setCurUserPros] = useState<any>();
    const [curUserImpro, setCurUserImpro] = useState<any>();

    const [technicalSkillPros, setTechnicalSkillPros] = useState<skillType[]>([]);
    const [mentalSkillPros, setMentalSkillPros] = useState<skillType[]>([]);
    const [physicalSkillPros, setPhysicalSkillPros] = useState<skillType[]>([]);
    const [technicalSkillImpro, setTechnicalSkillImpro] = useState<skillType[]>([]);
    const [mentalSkillImpro, setMentalSkillImpro] = useState<skillType[]>([]);
    const [physicalSkillImpro, setPhysicalSkillImpro] = useState<skillType[]>([]);

    // patch 요청
    const [patchCheckFlag, setPatchCheckFlag] = useState(false);

    const navigate = useNavigate();
    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['userEditInfo'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/student/${userId}`,
                successFunc: setCurUser,
            });
        },
        staleTime: 5 * 1000,
        // enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });

    useEffect(() => {
        if (data) {
            const categorizedProsData = data.improvements.reduce((acc: any, curr: any) => {
                if (!acc[curr.category]) {
                    acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
            }, {});

            const categorizedImproData = data.pros.reduce((acc: any, curr: any) => {
                if (!acc[curr.category]) {
                    acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
            }, {});

            if (categorizedProsData && categorizedImproData) {
                setCurUserImpro(categorizedImproData);
                setCurUserPros(categorizedProsData);
            }
        }

        // set basic user info
        if (curUser) {
            setPhoto(curUser.photo);
            setName(curUser.name);
            setDefaultBirth(curUser.birth);
            setBirth(curUser.birth);
            setDefaultGender(curUser.gender);
            setGender(curUser.gender);
            setPhone(curUser.phone);
            setPhoneFather(curUser.phoneFather);
            setPhoneMother(curUser.phoneMother);
            setResidence(curUser.residence);
            setResidenceSpecific(curUser.residenceSpecific);

            // set additional info
            setHeight(curUser.height);
            setWeight(curUser.weight);
            setTeam(curUser.team);
            setSoccerHistory(curUser.soccerHistory);
            setLessonHistory(curUser.lessonHistory);
            setClassGroupName(curUser.classGroupName);
            setMajorFoot(curUser.majorFoot);
            setPosition(curUser.position);
            setDefaultPosition(curUser.position);
        }
    }, [data, curUser]);
    useEffect(() => {
        // set reserach info
        if (curUserImpro && curUserPros) {
            setTechnicalSkillPros(curUserPros.technical);
            setMentalSkillPros(curUserPros.mental);
            setPhysicalSkillPros(curUserPros.physical);
            setTechnicalSkillImpro(curUserImpro.technical);
            setMentalSkillImpro(curUserImpro.mental);
            setPhysicalSkillImpro(curUserImpro.physical);
        }
    }, [curUserImpro, curUserPros]);

    function validateInputs() {
        const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
        // 각 필드의 유효성 검사
        if (
            !photo ||
            !name ||
            !phone ||
            !residence ||
            !residenceSpecific ||
            !birth ||
            !gender ||
            !height ||
            !weight ||
            !classGroupName ||
            !soccerHistory ||
            !lessonHistory ||
            !majorFoot
        ) {
            alert('모든 필수 항목을 입력해주세요.');
            return false;
        } else if (!phoneRegex.test(phone)) {
            alert('유효한 휴대폰 번호가 아닙니다.');
        } else if (!phoneRegex.test(phoneFather) && !phoneRegex.test(phoneMother)) {
            const todayYear = new Date().getFullYear();
            const userBirthYear = new Date(birth).getFullYear();
            const userAge = todayYear - userBirthYear;
            if (userAge <= 14) {
                alert('14세 이하의 경우, 부모님 중 적어도 한 분의 전화번호를 정확히 입력해주세요.');
                return false;
            }
        } else if (technicalSkillPros.length < 3 || mentalSkillPros.length < 3 || physicalSkillPros.length < 3) {
            alert('장점을 각각 3개 이상씩 선택하세요');
            return false;
        } else if (technicalSkillImpro.length < 3 || mentalSkillImpro.length < 3 || physicalSkillImpro.length < 3) {
            alert('개선 희망점을 각각 3개 이상씩 선택하세요');
            return false;
        }

        // 모든 조건을 통과하면 true 반환
        return true;
    }

    // patch 요청
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: any) => {
            return requestPatch({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    function patchStudent() {
        if (validateInputs()) {
            mutation.mutate({
                requestUrl: `/student/${userId}`,
                data: {
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
                    pros: [...technicalSkillPros, ...mentalSkillPros, ...physicalSkillPros],
                    improvements: [...technicalSkillImpro, ...mentalSkillImpro, ...physicalSkillImpro],
                    team: team,
                    position: position,
                    soccerHistory: soccerHistory,
                    lessonHistory: lessonHistory,
                    majorFoot: majorFoot,
                },
                flagCheckFunc: setPatchCheckFlag,
            });
        }
    }
    useEffect(() => {
        if (patchCheckFlag) {
            alert('수정 완료되었습니다');
            navigate(`/admin/user/${userId}`);
        }
    }, [patchCheckFlag]);
    return (
        <div className="eg-regist-wrapper">
            <div className="flex items-center justify-start pb-5 eg-title">
                <span>회원 정보 수정</span>
            </div>

            {data && curUser && (
                <BasicInfo
                    photo={photo}
                    setPhoto={setPhoto}
                    name={name}
                    setName={setName}
                    defaultBirth={defaultBirth}
                    setDefaultBirth={setDefaultBirth}
                    birth={birth}
                    setBirth={setBirth}
                    defaultGender={defaultGender}
                    setDefaultGender={setDefaultGender}
                    gender={gender}
                    setGender={setGender}
                    phone={phone}
                    setPhone={setPhone}
                    phoneFather={phoneFather}
                    setPhoneFather={setPhoneFather}
                    phoneMother={phoneMother}
                    setPhoneMother={setPhoneMother}
                    residence={residence}
                    setResidence={setResidence}
                    residenceSpecific={residenceSpecific}
                    setResidenceSpecific={setResidenceSpecific}
                />
            )}
            {curUser && (
                <AdditionalInfo
                    height={height}
                    setHeight={setHeight}
                    weight={weight}
                    setWeight={setWeight}
                    team={team}
                    setTeam={setTeam}
                    soccerHistory={soccerHistory}
                    setSoccerHistory={setSoccerHistory}
                    lessonHistory={lessonHistory}
                    setLessonHistory={setLessonHistory}
                    classGroupName={classGroupName}
                    setClassGroupName={setClassGroupName}
                    majorFoot={majorFoot}
                    setMajorFoot={setMajorFoot}
                    position={position}
                    setPosition={setPosition}
                    defaultPosition={defaultPosition}
                    setDefaultPosition={setDefaultPosition}
                />
            )}
            {curUser && curUserPros && (
                <ResearchInfo
                    technicalSkillPros={technicalSkillPros}
                    setTechnicalSkillPros={setTechnicalSkillPros}
                    mentalSkillPros={mentalSkillPros}
                    setMentalSkillPros={setMentalSkillPros}
                    physicalSkillPros={physicalSkillPros}
                    setPhysicalSkillPros={setPhysicalSkillPros}
                    technicalSkillImpro={technicalSkillImpro}
                    setTechnicalSkillImpro={setTechnicalSkillImpro}
                    mentalSkillImpro={mentalSkillImpro}
                    setMentalSkillImpro={setMentalSkillImpro}
                    physicalSkillImpro={physicalSkillImpro}
                    setPhysicalSkillImpro={setPhysicalSkillImpro}
                />
            )}
            <div className="flex justify-end mt-2">
                <WhiteBtn
                    content="취소"
                    func={() => navigate(-1)}
                />
                <PurpleBtn
                    content="수정"
                    func={patchStudent}
                />
            </div>
        </div>
    );
};

export default UserRegist;
