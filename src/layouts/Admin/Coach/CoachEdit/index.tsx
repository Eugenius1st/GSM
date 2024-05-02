// hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// api
import { requestGet, requestPatch } from 'api/basic';
// Cards
import EmptyCard from 'components/Cards/EmptyCard';
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
// Commons
import NavigateModal from 'components/Modals/NavigateModal';

export interface RequestBodyType {
    photo: string;
    name: string;
    gender: string;
    birth: string;
    lv: number;
    mobile: string;
    duty: string;
    license: string[];
}

export interface PatchDataType {
    requestUrl: string;
    data: RequestBodyType;
    successFunc?: (data: any) => void;
}

const CoachEdit = () => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);
    const { coachId } = useParams();
    const [curCoach, setCurCoach] = useState();
    const [role, setRole] = useState('admin');
    const [scope, setScope] = useState(['gsm']);
    const [photo, setPhoto] = useState('any-photo-url');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('성별');
    const [birth, setBirth] = useState('');
    const [defaultBirth, setDefaultBirth] = useState('');
    const [level, setLevel] = useState(1);
    const [mobile, setMobile] = useState('');
    const [duty, setDuty] = useState('');
    const [tempLicense, setTempLicense] = useState('');
    const [license, setLicense] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [soccerRecord, setSoccerRecord] = useState([{ record: '', startDate: '', endDate: '' }]);

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

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['coachEdit'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/admin/${coachId}`,
                successFunc: setCurCoach,
                // flagCheckFunc: setIsSearched,
            });
        },
        staleTime: 5 * 1000,

        // enabled: queryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });
    useEffect(() => {
        if (curCoach) {
            const { photo, name, gender, birth, lv, mobile, duty, license } = curCoach;
            setPhoto(photo);
            setName(name);
            setGender(gender);
            setBirth(birth);
            setDefaultBirth(birth);
            setLevel(lv);
            setMobile(mobile);
            setDuty(duty);
            setLicense(license);
        }
    }, [curCoach]);
    // PATCH 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, successFunc }: PatchDataType) => {
            return requestPatch({ requestUrl: requestUrl, data: data, successFunc: successFunc });
        },
    });

    const handleSubmit = () => {
        // PATCH 요청에 보낼 데이터
        const numberLevel = Number(level);
        const data = {
            photo: photo,
            name: name,
            gender: gender,
            birth: birth,
            lv: numberLevel,
            mobile: mobile,
            duty: duty,
            license: license,
        };
        mutation.mutate({
            requestUrl: `/admin/${coachId}`,
            data: data,
            successFunc: setIsSuccess,
        });
    };

    return (
        <div className="eg-regist-wrapper">
            <div className="flex items-center justify-start eg-title">
                <span> 관리자 등록</span>
            </div>
            <div className="relative">
                <ImageUploader
                    uploadCustomBtn={uploadBtn}
                    previewImgStyle="w-24 h-24 m-auto border-2 rounded-full border-egPurple-default object-cover"
                    previewBeforeIcon={
                        <div className="relative w-24 h-24 border-2 rounded-full border-egPurple-default bg-egGrey-semiLight">
                            <FaUser className="absolute bottom-[0.5px] w-20 h-20 rounded-[2.3rem] right-[7px] text-egBlack-light " />
                        </div>
                    }
                />
            </div>
            <form className="mt-16">
                {/* user personal info */}
                <div className="mt-8">
                    <label htmlFor="name">이름</label>
                    <input
                        id="name"
                        type="name"
                        placeholder="이름"
                        className={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="birth">생년월일</label>
                    <div className="my-1">
                        <DatePicker
                            defaultBirth={defaultBirth}
                            content={'생년월일'}
                            range="day"
                            customStyle={
                                'flex items-center py-1 h-10 my-1 border border-egGrey-default text-egGrey-default width-40'
                            }
                            func={setBirth}
                        />
                    </div>
                    <div className="my-1">성별</div>
                    <div className="relative mb-1">
                        <div
                            className={
                                gender === '성별'
                                    ? 'w-full p-2 border text-egGrey-default border-egGrey-default'
                                    : 'w-full p-2 border border-egGrey-default'
                            }
                        >
                            {gender === 'male' ? '남성' : gender === 'female' ? '여성' : '성별'}
                        </div>
                        <div className="absolute right-0 flex justify-end top-1">
                            <div
                                onClick={() => setGender('male')}
                                className={
                                    gender === 'male'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                남자
                            </div>
                            <div
                                onClick={() => setGender('female')}
                                className={
                                    gender === 'female'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                여자
                            </div>
                        </div>
                    </div>
                    <label htmlFor="phone">연락처</label>
                    <input
                        id="phone"
                        type="name"
                        placeholder="연락처"
                        className={inputStyle}
                        value={mobile}
                        onChange={(e) => handlePhoneNumberChange(e)}
                    />
                </div>

                {/* 등급 */}
                <div className="mt-8 mb-2">
                    <div className="mb-1">등급</div>
                    <CustomDropdown
                        placehorder="등급"
                        value={level}
                        formStyle="px-3 py-2 border border-egGrey-default text-egGrey-default flex flex-col"
                        itemList={[1, 2, 3, 4]}
                        inputStyle="px-3 py-2 border border-egGrey-default text-egGrey-default"
                        itemStyle=""
                        func={setLevel}
                    />
                    <div className="my-1">군필여부</div>
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
                    <div className="my-1">이력사항</div>
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
                    ))}
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
                    <NavigateModal
                        modalBtn={
                            <button
                                type="button"
                                className="w-full py-2 mt-10 rounded-md bg-egPurple-default text-egWhite-default"
                                onClick={handleSubmit}
                            >
                                등록하기
                            </button>
                        }
                        // modalTitle={'회원가입'}
                        modalContents={'수정이 완료되었습니다.'}
                        modalFooterActiveBtn={'확인'}
                        modalScrollStayFlag={true}
                        // modalFooterExitBtn={'취소'}
                        isSuccess={isSuccess}
                        navigateUrl={`/admin/coach/${coachId}`}
                    />
                </div>
            </form>
        </div>
    );
};

export default CoachEdit;
