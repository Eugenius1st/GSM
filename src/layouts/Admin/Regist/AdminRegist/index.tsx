// hook
import { useState } from 'react';
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

const AdminRegist = () => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);
    // 데이터
    const [adminId, setAdminId] = useState('');
    const [adminPw, setAdminPw] = useState('');
    const [role, setRole] = useState('admin');
    const [scope, setScope] = useState(['gsm']);
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('성별');
    const [birth, setBirth] = useState('');
    const [level, setLevel] = useState(1);
    const [mobile, setMobile] = useState('');
    const [duty, setDuty] = useState('');
    const [license, setLicense] = useState([]);

    const [soccerRecord, setSoccerRecord] = useState([{ record: '', startDate: '', endDate: '' }]);
    console.log(
        {
            id: adminId,
            password: adminPw,
            role: role,
            scope: scope,
            photo: photo,
            name: name,
            gender: gender,
            birth: birth,
            lv: level,
            mobile: mobile,
            duty: duty,
            license: license,
        },
        'soccerRecord는왜안해?',
        soccerRecord
    );
    const { egGrey } = colors;
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
                {/* id, pw */}
                <div>
                    <label htmlFor="id">ID</label>
                    <input
                        id="id"
                        type="id"
                        placeholder="ID"
                        className={inputStyle}
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                    />
                    <label htmlFor="password">PASSWORD</label>
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
                    <div className={inputStyle}>
                        <DatePicker
                            content={'시작날짜'}
                            range="month"
                            isMobile={isMobile}
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
                            {gender}
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
                        value={adminPw}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                {/* 등급 */}
                <div className="mt-8 mb-2">
                    <div className="mb-1">등급</div>
                    <CustomDropdown
                        placehorder="등급"
                        formStyle="px-3 py-2 border border-egGrey-default text-egGrey-default flex flex-col"
                        itemList={[1, 2, 3, 4]}
                        inputStyle="px-3 py-2 border border-egGrey-default text-egGrey-default"
                        itemStyle=""
                    />
                    <div className="my-1">군필여부</div>
                    <div className="px-3 py-2 border border-egGrey-default text-egGrey-default">
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
                                    value: '면제',
                                    name: '비대상',
                                },
                            ]}
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
                    <div className="my-1">자격증</div>
                    <div className="pl-3 py-2 border border-egGrey-default text-egGrey-default mt-[-1px] flex justify-between">
                        <input
                            id="cetrificate"
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

export default AdminRegist;
