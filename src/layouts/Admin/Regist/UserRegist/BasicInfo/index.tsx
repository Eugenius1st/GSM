// hook
import { useState, useEffect } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
// utility
import ImageUploader from 'utility/ImageUploader';
// Commons
import Divider from 'components/Common/Divider';
import Divideline from 'components/Common/Divideline';
// icons
import { FaCamera } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
// colors
import colors from 'assets/colors/palette';

const BasicInfo = () => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);
    // 데이터
    const [gender, setGender] = useState('성별');
    const [parents, setParents] = useState('');
    const [soccerRecord, setSoccerRecord] = useState([{ record: '', startDate: '', endDate: '' }]);

    const { egGrey } = colors;
    const inputStyle = 'w-full p-2 border border-egGrey-default mt-1 mb-3';
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
        <div>
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
                    <label htmlFor="id">ID</label>
                    <input
                        id="id"
                        type="id"
                        placeholder="ID"
                        className={inputStyle}
                    />
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="PASSWORD"
                        className={inputStyle}
                    />
                </div>
                <Divider />
                {/* user personal info */}
                <div>
                    <label htmlFor="name">이름</label>
                    <input
                        id="name"
                        type="name"
                        placeholder="이름"
                        className={inputStyle}
                    />

                    <label htmlFor="birth">생년월일</label>
                    <input
                        id="birth"
                        type="birth"
                        placeholder="생년월일"
                        className={inputStyle}
                    />
                    <div>성별</div>
                    <div className={inputStyle}>
                        <div className={gender === '성별' ? 'w-full text-egGrey-default' : 'w-full'}>{gender}</div>
                        <div className="absolute right-0 flex justify-end top-1">
                            <button
                                onClick={() => setGender('남자')}
                                className={
                                    gender === '남자'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                남자
                            </button>
                            <button
                                onClick={() => setGender('여자')}
                                className={
                                    gender === '여자'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                여자
                            </button>
                        </div>
                    </div>
                    {/* 연락처 */}
                    <label htmlFor="phone">연락처</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="연락처"
                        className={inputStyle}
                    />
                    {/* 부모 연락처 */}
                    <label htmlFor="parents_phone">부모 연락처</label>
                    <div className="relative">
                        <input
                            id="parents_phone"
                            type="text"
                            placeholder="부모 연락처"
                            className={inputStyle}
                        />
                        <div className="absolute right-0 flex mb-1 top-2">
                            <button
                                onClick={() => setParents('부')}
                                className={
                                    parents === '부'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                부
                            </button>
                            <button
                                onClick={() => setParents('모')}
                                className={
                                    parents === '모'
                                        ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                        : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                                }
                            >
                                모
                            </button>
                        </div>
                    </div>
                    {/* 주소 */}
                    <label htmlFor="address">주소</label>
                    <input
                        id="address"
                        type="address"
                        placeholder="주소"
                        className="w-full p-2 mt-1 border border-egGrey-default"
                    />
                    <input
                        id="detail_address"
                        type="address"
                        placeholder="상세 주소"
                        className="w-full mt-[-1px] p-2 border border-egGrey-default"
                    />
                </div>
            </form>
        </div>
    );
};

export default BasicInfo;
