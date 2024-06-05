// hook
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
// api
import { requestPost } from 'api/basic';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
// utility
import ImageUploader from 'utility/ImageUploader';
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
import dayjs from 'dayjs';

interface handleState {
    userId: string;
    // photo: string;
    // setPhoto: (data: string) => void;
    name: string;
    setName: (data: string) => void;
    defaultBirth: string;
    setDefaultBirth: (data: string) => void;
    birth: string;
    setBirth: (data: string) => void;
    defaultGender: string;
    setDefaultGender: (data: string) => void;
    gender: string;
    setGender: (data: string) => void;
    phone: string;
    setPhone: (data: string) => void;
    phoneFather: string;
    setPhoneFather: (data: string) => void;
    phoneMother: string;
    setPhoneMother: (data: string) => void;
    defaultMajorPhone: string;
    setDefaultMajorPhone: (data: string) => void;
    majorPhone: string;
    setMajorPhone: (data: string) => void;

    residence: string;
    setResidence: (data: string) => void;
    residenceSpecific: string;
    setResidenceSpecific: (data: string) => void;
}

const BasicInfo = ({
    userId,
    name,
    setName,
    defaultBirth,
    setDefaultBirth,
    birth,
    setBirth,
    defaultGender,
    setDefaultGender,
    gender,
    setGender,
    phone,
    setPhone,
    phoneFather,
    setPhoneFather,
    phoneMother,
    setPhoneMother,

    defaultMajorPhone,
    setDefaultMajorPhone,
    majorPhone,
    setMajorPhone,

    residence,
    setResidence,
    residenceSpecific,
    setResidenceSpecific,
}: handleState) => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);

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

    return (
        <div>
            <div className="relative">
                <ImageUploader
                    type={'student'}
                    uploadedId={userId}
                    uploadCustomBtn={uploadBtn}
                    previewImgStyle="w-24 h-24 m-auto border-2 rounded-full border-egPurple-default object-cover"
                />
            </div>
            <form className="mt-16">
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
                    <label>부모님 연락처 (14세 이하일 경우, 한 분 입력 필수)</label>
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
                <Divider />
            </form>
        </div>
    );
};

export default BasicInfo;
