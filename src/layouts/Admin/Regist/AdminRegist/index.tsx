// hook
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// api
import { registPost } from 'api/regist';
import { requestPost } from 'api/basic';
// utility
import ImageUploader from 'utility/ImageUploader';
// Common
import RadioButton from 'components/Common/RadioButton';
import CustomDropdown from 'components/EgMaterials/CustomDropdown';
// Material UI
import DatePicker from 'components/EgMaterials/DatePicker';
// icons
import { FaCamera } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { CiSquarePlus } from 'react-icons/ci';
import { CiSquareMinus } from 'react-icons/ci';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// Alerts
import BasicAlert from 'components/Alerts/BasicAlert';
export interface RequestBodyType {
    id: string;
    password: string;
    role: string;
    scope: string[];
    // photo: string;
    name: string;
    gender: string;
    birth: string;
    lv: number;
    mobile: string;
    duty: string;
    license: string[];
}

export interface PostDataType {
    requestUrl: string;
    requestBody: RequestBodyType;
    successFunc?: (data: any) => void;
}

const AdminRegist = () => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);
    const navigate = useNavigate();
    const [isLoginAuth, setIsLoginAuth] = useRecoilState(LoginAtomSelector);
    const [isLoginStateAuth, setIsLoginStateAuth] = useRecoilState(LoginStateSelector);

    const [adminId, setAdminId] = useState('');
    const [adminPw, setAdminPw] = useState('');
    const [role, setRole] = useState('admin');
    const [scope, setScope] = useState(['gsm']);
    // const [photo, setPhoto] = useState('any-photo-url');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('성별');
    const [birth, setBirth] = useState('');
    const [level, setLevel] = useState(1);
    const [mobile, setMobile] = useState('');
    const [duty, setDuty] = useState('');
    const [tempLicense, setTempLicense] = useState('');
    const [license, setLicense] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isShow, setIsShow] = useState(true);
    const [soccerRecord, setSoccerRecord] = useState([{ record: '', startDate: '', endDate: '' }]);

    const [idValid, setIdValid] = useState({ duplicate: 'initial' });
    const [isIdConfirm, setIsIdConfirm] = useState(false);

    const inputStyle = 'w-full p-2 border border-egGrey-default my-1';
    const uploadBtn = (
        <div className="absolute bottom-0 right-0 p-2 rounded-full bg-egPurple-default text-egWhite-default w-fit">
            <FaCamera />
        </div>
    );
    const handleRecordDelete = (idx: number) => {
        const newArray = soccerRecord.filter((el, index) => index !== idx);
        setSoccerRecord(newArray);
    };
    const handleLicenseDelete = (idx: number) => {
        const newArray = license.filter((el, index) => index !== idx);
        setLicense(newArray);
        setTempLicense('');
    };
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 입력된 값에서 숫자만 추출하여 저장
        const cleaned = e.target.value.replace(/\D/g, '');
        // 정규식을 사용하여 전화번호 형식에 맞게 하이픈 추가
        const regex = /^(\d{2,3})(\d{3,4})(\d{4})$/;
        const formatted = cleaned.replace(regex, '$1-$2-$3');
        // 변경된 전화번호를 상태에 저장
        setMobile(formatted);
    };
    function validateInputs() {
        const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{5,16}$/;
        const pwRegex = /^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?]{8,20}$/;
        const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
        // 각 필드의 유효성 검사
        if (!idRegex.test(adminId)) {
            alert('ID는 5~16자의 영문 소문자, 숫자, 언더바(_)로만 이루어져야 합니다.');
            return false;
        } else if (idValid.duplicate !== 'inital' && idValid.duplicate) {
            alert('ID 중복 확인이 필요합니다.');
            return false;
        } else if (!pwRegex.test(adminPw)) {
            alert('Password는 8~20자의 영문 대소문자, 숫자, 특수문자로 이루어져야 합니다.');
            return false;
        } else if (!name || !mobile || !birth || !gender || !level || !duty) {
            alert('모든 필수 항목을 입력해주세요.');
            return false;
        } else if (!phoneRegex.test(mobile)) {
            alert('유효한 휴대폰 번호가 아닙니다.');
        }
        // 모든 조건을 통과하면 true 반환
        return true;
    }

    // POST 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc, flagCheckFunc }: any) => {
            return requestPost({
                requestUrl: requestUrl,
                data: data,
                successFunc: successFunc,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    useEffect(() => {
        if (idValid.duplicate !== 'initial' && isIdConfirm && !idValid.duplicate) alert('사용가능한 아이디입니다.');
        else if (idValid.duplicate !== 'initial' && isIdConfirm && idValid.duplicate) alert('중복된 아이디입니다.');
    }, [idValid.duplicate]);
    function handleDuplicate() {
        // id 정규식
        const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{5,16}$/;
        if (!idRegex.test(adminId)) {
            alert('ID는 5~16자의 영문 소문자, 숫자가 포함되어야 하고, 언더바(_) 사용 가능합니다.');
            return false;
        } else if (adminId) {
            setIsIdConfirm(true);
            // POST 요청에 보낼 데이터
            mutation.mutate({
                requestUrl: '/auth/isduplicate',
                data: {
                    id: adminId,
                },
                successFunc: setIdValid,
            });
        }
    }
    const handleSubmit = () => {
        // POST 요청에 보낼 데이터
        if (validateInputs()) {
            const numberLevel = Number(level);
            const requestBody = {
                id: adminId,
                password: adminPw,
                role: role,
                scope: scope,
                // photo: photo,
                name: name,
                gender: gender,
                birth: birth,
                lv: numberLevel,
                mobile: mobile,
                duty: duty,
                license: license,
            };
            mutation.mutate({
                requestUrl: '/auth/signup/admin',
                data: requestBody,
                flagCheckFunc: setIsSuccess,
            });
        }
    };
    const alertFooterActiveFunc = () => {
        navigate('/admin');
        setIsShow(false);
    };
    return (
        <div className="eg-regist-wrapper">
            {isShow && isSuccess && (
                <BasicAlert
                    alertContents="관리자 등록이 완료되었습니다"
                    alertFooterActiveFunc={alertFooterActiveFunc}
                    alertFooterActiveBtn="확인"
                />
            )}
            <div className="flex items-center justify-start eg-title">
                <span> 관리자 등록</span>
            </div>
            <div className="relative">
                {adminId && (
                    <ImageUploader
                        type={'admin'}
                        uploadedId={adminId}
                        uploadCustomBtn={uploadBtn}
                        previewImgStyle="w-24 h-24 m-auto border-2 rounded-full border-egPurple-default object-cover"
                        // defaultPhoto={photo}
                    />
                )}
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
                            value={adminId}
                            onChange={(e) => {
                                setAdminId(e.target.value);
                                setIdValid({ duplicate: 'initial' });
                                setIsIdConfirm(false);
                            }}
                        />
                        <div className="absolute right-0 flex top-2">
                            <div
                                onClick={handleDuplicate}
                                className={
                                    isIdConfirm && !idValid.duplicate
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                중복확인
                            </div>
                        </div>
                    </div>
                    <label htmlFor="password">PASSWORD *</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="PASSWORD"
                        className={inputStyle}
                        value={adminPw}
                        onChange={(e) => setAdminPw(e.target.value)}
                    />
                </div>

                {/* user personal info */}
                <div className="mt-8">
                    <label htmlFor="name">이름 *</label>
                    <input
                        id="name"
                        type="name"
                        placeholder="이름"
                        className={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        />
                    </div>
                    <label htmlFor="birth">생년월일 *</label>

                    <div className="my-1">
                        <DatePicker
                            // defaultBirth={defaultBirth}
                            content={'생년월일'}
                            range="day"
                            customStyle={
                                'flex items-center py-1 h-11 mt-1 mb-3 border border-egGrey-default text-egGrey-default width-40'
                            }
                            func={setBirth}
                        />
                    </div>
                    <label htmlFor="phone">연락처 *</label>
                    <input
                        id="phone"
                        type="name"
                        maxLength={13}
                        placeholder="연락처"
                        className={inputStyle}
                        value={mobile}
                        onChange={(e) => handlePhoneNumberChange(e)}
                    />
                </div>

                {/* 등급 */}
                <div className="mt-8 mb-2">
                    <div className="mb-1">등급 *</div>
                    <CustomDropdown
                        placehorder="등급"
                        formStyle="px-3 py-2 border border-egGrey-default text-egGrey-default flex flex-col"
                        value={level}
                        itemList={[1, 2, 3, 4]}
                        inputStyle="px-3 py-2 border border-egGrey-default text-egGrey-default"
                        itemStyle=""
                        func={setLevel}
                    />
                    <div className="my-1">군필여부 *</div>
                    <div className="px-3 py-2 border border-egGrey-default text-egGrey-default">
                        <RadioButton
                            RadioBtnList={[
                                {
                                    value: '군필',
                                    name: '군필',
                                },
                                {
                                    value: '미필',
                                    name: '미필',
                                },
                                {
                                    value: '비대상',
                                    name: '비대상',
                                },
                            ]}
                            func={setDuty}
                        />
                    </div>

                    {/* 직접 선택 및 입력 */}
                    {/* <div className="my-1">이력사항</div>
                    {soccerRecord.map((el, idx) => (
                        <div
                            key={idx}
                            className={
                                isMobile
                                    ? 'pl-3 py-2 border border-egGrey-default text-egGrey-default mt-[-1px]'
                                    : 'pl-3 py-2 border border-egGrey-default text-egGrey-default flex justify-between items-center'
                            }
                        >
                            <input
                                placeholder="이력사항"
                                type="text"
                                maxLength={20}
                                className="focus:outline-none text-egBlack-default"
                            />
                            <div className={isMobile ? 'flex items-center mt-2 justify-between' : 'flex items-center'}>
                                <div className="flex">
                                    <DatePicker
                                        content={'시작날짜'}
                                        range="month"
                                        customStyle={
                                            'flex rounded-md items-center py-1 pr-1 mr-1 border border-egGrey-default text-egGrey-default width-40'
                                        }
                                        isMobile={isMobile}
                                    />
                                    <DatePicker
                                        content={'종료날짜'}
                                        range="month"
                                        customStyle={
                                            'flex rounded-md items-center py-1 pr-1 mr-1 border border-egGrey-default text-egGrey-default width-40'
                                        }
                                        isMobile={isMobile}
                                    />
                                </div>
                                {idx < soccerRecord.length - 1 || soccerRecord.length === 3 ? (
                                    <CiSquareMinus
                                        onClick={() => soccerRecord.length <= 3 && handleRecordDelete(idx)}
                                        className={
                                            'w-8 h-8 mr-1 text-egGrey-default-semiLight hover:text-egGrey-default-default'
                                        }
                                    />
                                ) : (
                                    <CiSquarePlus
                                        onClick={() =>
                                            soccerRecord.length <= 3 &&
                                            setSoccerRecord([
                                                ...soccerRecord,
                                                { record: '', startDate: '', endDate: '' },
                                            ])
                                        }
                                        className={'w-8 h-8 mr-1 text-egPurple-semiLight hover:text-egPurple-default'}
                                    />
                                )}
                            </div>
                        </div>
                    ))} */}
                    <div className="my-1">자격증</div>
                    {license.length < 3 && (
                        <div
                            className={
                                isMobile
                                    ? 'mt-[-1px] flex justify-between pl-3 py-1 border border-egGrey-default text-egGrey-default'
                                    : 'flex mt-[-1px] justify-between pl-3 py-1 border border-egGrey-default text-egGrey-default'
                            }
                        >
                            <input
                                placeholder={license.length < 3 ? '자격증은 3개까지 등록 가능합니다' : '자격증'}
                                type="text"
                                maxLength={20}
                                className="w-full focus:outline-none text-egBlack-default"
                                value={license.length > 3 ? '' : tempLicense}
                                onChange={(e) => license.length < 3 && setTempLicense(e.target.value)}
                            />

                            <div className={isMobile ? 'flex items-center justify-between' : 'flex items-center'}>
                                <div className="flex">
                                    <CiSquarePlus
                                        onClick={() => {
                                            if (license.length < 3 && tempLicense) {
                                                setLicense([...license, tempLicense]);
                                                setTempLicense('');
                                            }
                                        }}
                                        className={'w-8 h-8 mr-1 text-egPurple-semiLight hover:text-egPurple-default'}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {license.map((el, idx) => (
                        <div
                            key={idx}
                            className={
                                isMobile
                                    ? 'mt-[-1px] flex justify-between pl-3 py-1 border border-egGrey-default text-egBlack-default'
                                    : 'flex mt-[-1px] justify-between pl-3 py-1 border border-egGrey-default text-egBlack-default'
                            }
                        >
                            <div>{license[idx]}</div>
                            <div className={isMobile ? 'flex items-center justify-between' : 'flex items-center'}>
                                {license[idx] ? (
                                    <div className="flex">
                                        <CiSquareMinus
                                            onClick={() => license.length <= 3 && handleLicenseDelete(idx)}
                                            className={
                                                'w-8 h-8 mr-1 text-egGrey-default hover:text-egGrey-default-default'
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <CiSquarePlus
                                            onClick={() => {
                                                if (license.length < 3 && tempLicense) {
                                                    setLicense([...license, tempLicense]);
                                                    setTempLicense('');
                                                }
                                            }}
                                            className={
                                                'w-8 h-8 mr-1 text-egPurple-semiLight hover:text-egPurple-default'
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <PurpleBtn
                        customStyle={
                            'w-full py-2 mt-8 rounded-md text-egWhite-default text-center bg-egPurple-default text-egWhite-default'
                        }
                        content={'관리자 등록'}
                        func={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default AdminRegist;
