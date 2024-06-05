// hook
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
// api
import { requestPost } from 'api/basic';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
// utility
import RegisterImageUploader from 'utility/RegisterImageUploader';
// Common
import RadioButton from 'components/Common/RadioButton';
import Divider from 'components/Common/Divider';
// Modals
import ResidenceSearchModal from 'components/Modals/ResidenceSearchModal';
// icons
import { FaCamera } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
// Material UI
import DatePicker from 'components/EgMaterials/DatePicker';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
interface handleState {
    registStage: number;
    handleNext: () => void;
    handlePreview?: () => void;
    basicInfoData: any;
    setBasicInfoData: (data: any) => void;
    selectedPhoto: File | null;
    setSelectedPhoto: (file: File | null) => void;
}

const BasicInfo = ({
    registStage,
    handleNext,
    handlePreview,
    basicInfoData,
    setBasicInfoData,
    selectedPhoto,
    setSelectedPhoto,
}: handleState) => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);
    // 데이터
    const [userID, setUserID] = useState('');
    const [userPW, setUserPW] = useState('');
    const [name, setName] = useState('');
    const [defaultBirth, setDefaultBirth] = useState('');
    const [birth, setBirth] = useState('');
    const [defaultGender, setDefaultGender] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneFather, setPhoneFather] = useState('');
    const [phoneMother, setPhoneMother] = useState('');

    const [defaultMajorPhone, setDefaultMajorPhone] = useState('');
    const [majorPhone, setMajorPhone] = useState('');

    const [residence, setResidence] = useState('');
    const [residenceSpecific, setResidenceSpecific] = useState('');

    const [idValid, setIdValid] = useState({ duplicate: 'initial' });
    const [isIdConfirm, setIsIdConfirm] = useState(false);

    const inputStyle = 'w-full p-2 border border-egGrey-default mt-1 mb-3';
    const uploadBtn = (
        <div className="absolute bottom-0 right-0 p-2 rounded-full bg-egPurple-default text-egWhite-default w-fit">
            <FaCamera />
        </div>
    );
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>, handlePhone?: (phone: string) => void) => {
        // 입력된 값에서 숫자만 추출하여 저장
        const cleaned = e.target.value.replace(/\D/g, '');
        // 정규식을 사용하여 전화번호 형식에 맞게 하이픈 추가
        const regex = /^(\d{2,3})(\d{3,4})(\d{4})$/;
        const formatted = cleaned.replace(regex, '$1-$2-$3');
        // 변경된 전화번호를 상태에 저장
        if (handlePhone) handlePhone(formatted);
    };

    function validateInputs() {
        // id 정규식
        const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{5,16}$/;
        // password 정규식
        const pwRegex = /^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{8,20}$/;
        const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
        // 각 필드의 유효성 검사
        if (!idRegex.test(userID)) {
            alert('ID는 5~16자의 영문 소문자, 숫자, 언더바(_)로만 이루어져야 합니다.');
            return false;
        } else if (idValid.duplicate !== 'inital' && idValid.duplicate) {
            alert('ID 중복 확인이 필요합니다.');
            return false;
        } else if (!pwRegex.test(userPW)) {
            alert('Password는 8~20자의 영문 대소문자, 숫자, 특수문자로 이루어져야 합니다.');
            return false;
        } else if (!name || !phone || !residence || !residenceSpecific || !birth || !gender) {
            alert('모든 필수 항목을 입력해주세요.'); // ??? || majorPhone
            return false;
        } else if (!phoneRegex.test(phone)) {
            alert('유효한 휴대폰 번호가 아닙니다.');
        } else if (!phoneRegex.test(phoneFather) && !phoneRegex.test(phoneMother)) {
            const todayYear = new Date().getFullYear();
            const userBirthYear = new Date(birth).getFullYear();
            const userAge = todayYear - userBirthYear;
            if (userAge <= 19) {
                alert('19세 이하의 경우, 부모님 중 적어도 한 분의 전화번호를 정확히 입력해주세요.');
                return false;
            }
        }

        // 모든 조건을 통과하면 true 반환
        return true;
    }

    // POST요청
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                successFunc: successFunc,
            });
        },
    });
    // ID 중복확인
    function handleDuplicate(e: any) {
        e.preventDefault();
        // id 정규식
        const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{5,16}$/;
        if (!idRegex.test(userID)) {
            alert('ID는 5~16자의 영문 소문자, 숫자가 포함되어야 하고, 언더바(_) 사용 가능합니다.');
            return false;
        } else if (userID) {
            setIsIdConfirm(true);
            // POST 요청에 보낼 데이터
            mutation.mutate({
                requestUrl: '/auth/isduplicate',
                data: {
                    id: userID,
                },
                successFunc: setIdValid,
            });
        }
    }
    useEffect(() => {
        if (idValid.duplicate !== 'initial' && isIdConfirm && !idValid.duplicate) alert('사용가능한 아이디입니다.');
        else if (idValid.duplicate !== 'initial' && isIdConfirm && idValid.duplicate) alert('중복된 아이디입니다.');
    }, [idValid.duplicate]);

    function stageSubmit() {
        if (validateInputs()) {
            const validData = {
                id: userID,
                photo: selectedPhoto,
                password: userPW,
                role: 'student',
                scope: ['gsm'],
                name: name,
                phone: phone,
                phoneFather: phoneFather,
                phoneMother: phoneMother,
                // ??? majorPhone: majorPhone,
                residence: residence,
                residenceSpecific: residenceSpecific,
                birth: birth,
                gender: gender,
            };
            setBasicInfoData(validData);
            handleNext();
        }
    }
    // 렌더링 atom 저장
    useEffect(() => {
        if (basicInfoData) {
            setUserID(basicInfoData.id);
            setUserPW(basicInfoData.password);
            setSelectedPhoto(basicInfoData.photo);
            setPhone(basicInfoData.phone);
            setName(basicInfoData.name);
            setPhone(basicInfoData.phone);
            setPhoneFather(basicInfoData.phoneFather);
            setPhoneMother(basicInfoData.phoneMother);
            setBirth(basicInfoData.birth);
            setDefaultBirth(basicInfoData.birth);
            setGender(basicInfoData.gender);
            setDefaultGender(basicInfoData.gender);
            setResidence(basicInfoData.residence);
            setResidenceSpecific(basicInfoData.residenceSpecific);
        }
    }, []);
    return (
        <div>
            <div className="relative">
                <RegisterImageUploader
                    type={'student'}
                    uploadCustomBtn={uploadBtn}
                    previewImgStyle="w-24 h-24 m-auto border-2 rounded-full border-egPurple-default object-cover"
                    selectedPhoto={selectedPhoto}
                    setSelectedPhoto={setSelectedPhoto}
                />
            </div>
            <form className="mt-16">
                {/* id, pw */}
                <div>
                    <label htmlFor="id">ID *</label>
                    <div className="relative">
                        <input
                            id="id"
                            type="id"
                            placeholder="ID"
                            className={inputStyle}
                            value={userID}
                            onChange={(e) => {
                                setUserID(e.target.value);
                                setIdValid({ duplicate: 'initial' });
                                setIsIdConfirm(false);
                            }}
                        />
                        <div className="absolute right-0 flex top-2">
                            <button
                                type="button"
                                onClick={(e) => handleDuplicate(e)}
                                className={
                                    isIdConfirm && !idValid.duplicate
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                중복확인
                            </button>
                        </div>
                    </div>
                    <label htmlFor="password">PASSWORD *</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="PASSWORD"
                        className={inputStyle}
                        value={userPW}
                        onChange={(e) => setUserPW(e.target.value)}
                    />
                </div>
                <Divider />
                {/* user personal info */}
                <div>
                    <label htmlFor="name">이름 *</label>
                    <input
                        id="name"
                        type="name"
                        placeholder="이름"
                        className={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="birth">생년월일 *</label>

                    <div className="my-1">
                        <DatePicker
                            defaultBirth={defaultBirth}
                            content={'생년월일'}
                            range="day"
                            customStyle={
                                'flex items-center py-1 h-11 my-1 border border-egGrey-default text-egGrey-default width-40'
                            }
                            func={setBirth}
                        />
                    </div>
                    <Divider />

                    <div>성별 *</div>
                    <div className="relative w-full p-2 mt-1 mb-3 border border-egGrey-default">
                        <RadioButton
                            RadioBtnList={[
                                {
                                    value: 'male',
                                    name: '남자',
                                },
                                {
                                    value: 'female',
                                    name: '여자',
                                },
                            ]}
                            func={setGender}
                            defaultRadio={defaultGender}
                        />
                    </div>
                    {/* 연락처 */}
                    <label htmlFor="phone">연락처 *</label>
                    <input
                        id="phone"
                        type="text"
                        maxLength={13}
                        placeholder="연락처"
                        className={inputStyle}
                        value={phone}
                        onChange={(e) => handlePhoneNumberChange(e, setPhone)}
                    />
                    {/* 부모 연락처 */}
                    <label>부모님 연락처 (20세 미만일 경우, 한 분 입력 필수)</label>
                    <div className="relative">
                        <input
                            id="phoneFather"
                            type="text"
                            maxLength={13}
                            placeholder="부 연락처"
                            className="w-full p-2 mt-1 border border-egGrey-default"
                            value={phoneFather}
                            onChange={(e) => handlePhoneNumberChange(e, setPhoneFather)}
                        />
                        <div className="absolute right-0 flex top-2">
                            <div
                                className={
                                    phoneFather
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                부
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            id="phoneMother"
                            type="text"
                            maxLength={13}
                            placeholder="모 연락처"
                            className="w-full mt-[-1.1px] p-2 border border-egGrey-default mb-4"
                            value={phoneMother}
                            onChange={(e) => handlePhoneNumberChange(e, setPhoneMother)}
                        />
                        <div className="absolute right-0 flex mb-1 top-[2px]">
                            <div
                                className={
                                    phoneMother
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                모
                            </div>
                        </div>
                    </div>

                    {/* 대표 연락처 */}
                    <div>대표 연락처(알림 수신) *</div>
                    <div className="relative w-full p-2 mt-1 mb-3 border border-egGrey-default">
                        <RadioButton
                            RadioBtnList={[
                                {
                                    value: '본인',
                                    name: '본인',
                                },
                                {
                                    value: '부',
                                    name: '부',
                                },
                                {
                                    value: '모',
                                    name: '모',
                                },
                            ]}
                            func={setMajorPhone}
                            defaultRadio={defaultMajorPhone}
                        />
                    </div>

                    <Divider />

                    {/* 주소 */}
                    <label htmlFor="address">주소 *</label>
                    <div className="relative">
                        <div className="w-full p-2 mt-1 border border-egGrey-default">
                            <div className={residence ? 'text-egBlack-default' : 'text-egGrey-default'}>
                                {residence ? `${residence}` : '주소'}
                            </div>
                            <div className="absolute right-[5px] top-[7px]">
                                <ResidenceSearchModal
                                    residence={residence}
                                    setResidence={setResidence}
                                />
                            </div>
                        </div>
                    </div>
                    <input
                        id="detail_address"
                        type="address"
                        placeholder="상세 주소"
                        className="w-full mt-[-1px] p-2 border border-egGrey-default"
                        value={residenceSpecific}
                        onChange={(e) => setResidenceSpecific(e.target.value)}
                    />
                </div>
            </form>
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
                        func={stageSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default BasicInfo;
