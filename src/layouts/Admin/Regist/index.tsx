// hook
import { useState, useEffect } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
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
// colors
import colors from 'assets/colors/palette';

const Regist = () => {
    // 웹 앱 구분
    const isMobile = useRecoilValue(IsMobileAtom);
    // 데이터
    const [gender, setGender] = useState('성별');
    const [soccerRecord, setSoccerRecord] = useState([{ record: '', startDate: '', endDate: '' }]);

    const { egGrey } = colors;
    const inputStyle = 'w-full p-2 border border-egGrey-default mt-[-0.9px]';
    const uploadBtn = (
        <div className="absolute bottom-0 right-0 p-2 rounded-full bg-egPurple-default text-egWhite-default w-fit">
            <FaCamera />
        </div>
    );
    const handleRecordDelete = (idx: number) => {
        const newArray = soccerRecord.filter((el, index) => index !== idx);
        setSoccerRecord(newArray);
    };
    return (
        <div className="eg-regist-wrapper">
            <div className="eg-title">관리자 등록</div>
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
                {/* id, pw */}
                <div>
                    <input
                        type="id"
                        placeholder="ID"
                        className={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className={inputStyle}
                    />
                </div>

                {/* user personal info */}
                <div className="mt-8 mb-2">
                    <input
                        type="name"
                        placeholder="이름"
                        className={inputStyle}
                    />
                    <input
                        type="name"
                        placeholder="생년월일"
                        className={inputStyle}
                    />
                    <div className="relative">
                        <div
                            className={
                                gender === '성별'
                                    ? 'w-full p-2 border text-egGrey-default border-egGrey-default mt-[-0.9px]'
                                    : 'w-full p-2 border border-egGrey-default mt-[-0.9px]'
                            }
                        >
                            {gender}
                        </div>
                        <div className="absolute right-0 flex justify-end top-1">
                            <div
                                onClick={() => setGender('남자')}
                                className={
                                    gender === '남자'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                남자
                            </div>
                            <div
                                onClick={() => setGender('여자')}
                                className={
                                    gender === '여자'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                여자
                            </div>
                        </div>
                    </div>
                    <input
                        type="name"
                        placeholder="연락처"
                        className={inputStyle}
                    />
                </div>

                {/* 등급 */}
                <div className="mt-8 mb-2">
                    <CustomDropdown
                        placehorder="등급"
                        formStyle="px-3 py-2 border border-egGrey-default text-egGrey-default mt-[-0.9px] flex flex-col"
                        itemList={['Level1', 'Level2', 'Level3', 'Level4']}
                        inputStyle="px-3 py-2 border border-egGrey-default text-egGrey-default mt-[-0.9px]"
                        itemStyle=""
                    />
                    <div className="px-3 py-2 border border-egGrey-default text-egGrey-default mt-[-0.9px]">
                        <div className="px-1 mb-2">군필여부</div>
                        <RadioButton
                            RadioBtnList={[
                                {
                                    checked: false,
                                    value: '군필',
                                    name: '군필',
                                },
                                {
                                    checked: false,
                                    value: '미필',
                                    name: '미필',
                                },
                                {
                                    checked: false,
                                    value: '면제/',
                                    name: '비대상',
                                },
                            ]}
                        />
                    </div>

                    {/* 직접 선택 및 입력 */}
                    {soccerRecord.map((el, idx) => (
                        <div
                            key={idx}
                            className={
                                isMobile
                                    ? 'pl-3 py-2 border border-egGrey-default text-egGrey-default mt-[-0.9px]'
                                    : 'pl-3 py-2 border border-egGrey-default text-egGrey-default mt-[-0.9px] flex justify-between items-center'
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
                                        isMobile={isMobile}
                                    />
                                    <DatePicker
                                        content={'종료날짜'}
                                        range="month"
                                        isMobile={isMobile}
                                    />
                                </div>
                                {idx < soccerRecord.length - 1 || soccerRecord.length === 3 ? (
                                    <CiSquareMinus
                                        onClick={() => soccerRecord.length <= 3 && handleRecordDelete(idx)}
                                        className={
                                            'w-8 h-8 mr-1 text-egGrey-default-semiLght hover:text-egGrey-default-default'
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
                                        className={'w-8 h-8 mr-1 text-egPurple-semiLght hover:text-egPurple-default'}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="pl-3 py-2 border border-egGrey-default text-egGrey-default mt-[-1px] flex justify-between">
                        <input
                            placeholder="자격증"
                            type="text"
                            maxLength={30}
                            className="w-full focus:outline-none text-egBlack-default"
                        />
                        <CiSquarePlus className="w-8 h-8 mr-1 text-egPurple-semiLght hover:text-egPurple-default" />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-10 rounded-md bg-egGrey-semiLight text-egPurple-default"
                >
                    등록하기
                </button>
            </form>
        </div>
    );
};

export default Regist;
