// hook
import { useState, useEffect } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
// Common
import CustomDropdown from 'components/EgMaterials/CustomDropdown';
import RadioButton from 'components/Common/RadioButton';
import CheckboxGroup from 'components/Common/CheckboxGroup';
import Divider from 'components/Common/Divider';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// utils
import {
    soccerHistoryOptioins,
    lessonHistoryOptions,
    trainingCourseOptions,
    classGroupMatcherByKor,
    classGroupMatcherByEng,
    positionOptions,
    positionMatcherByEng,
} from 'utility/standardConst';

interface handleState {
    registStage: number;
    handleNext: () => void;
    handlePreview?: () => void;
    additionalInfoData: any;
    setAdditionalInfoData: (data: any) => void;
}

const AdditionalInfo = ({
    registStage,
    handleNext,
    handlePreview,
    additionalInfoData,
    setAdditionalInfoData,
}: handleState) => {
    // 웹 앱 구분
    let isMobile = useRecoilValue(IsMobileAtom);
    // 데이터

    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [team, setTeam] = useState('');
    const [soccerHistory, setSoccerHistory] = useState('');
    const [lessonHistory, setLessonHistory] = useState('');
    const [classGroupName, setClassGroupName] = useState('');
    const [majorFoot, setMajorFoot] = useState('');
    const [position, setPosition] = useState<string[]>([]);
    const [defaultPosition, setDefaultPosition] = useState([]);
    const inputStyle = 'w-full p-2 border border-egGrey-default mt-1 mb-3';

    // 포지션 데이터
    const handleCheckboxChange = (selectedOptions: string[]) => {
        setPosition(selectedOptions);
    };
    function stageSubmit() {
        const test = {
            height: height,
            weight: weight,
            classGroupName: classGroupMatcherByKor(classGroupName),
            team: team ? team : '없음',
            soccerHistory: soccerHistory,
            lessonHistory: lessonHistory,
            majorFoot: majorFoot,
            position: position,
        };
        if (!height || !weight || !classGroupName || !soccerHistory || !lessonHistory || !majorFoot) {
            console.log(test);
            alert('모든 필수 사항을 입력해주세요');
        } else {
            setAdditionalInfoData(test);
            handleNext();
        }
    }
    useEffect(() => {
        if (additionalInfoData) {
            setHeight(additionalInfoData.height);
            setWeight(additionalInfoData.weight);
            setTeam(additionalInfoData.team);
            setClassGroupName(classGroupMatcherByEng(additionalInfoData.classGroupName));
            setSoccerHistory(additionalInfoData.soccerHistory);
            setLessonHistory(additionalInfoData.lessonHistory);
            setMajorFoot(additionalInfoData.majorFoot);
            setPosition(additionalInfoData.position);
            setDefaultPosition(additionalInfoData.position);
        }
    }, []);

    return (
        <div className="max-w-lg p-2 m-auto">
            <form>
                <label htmlFor="height">키 *</label>
                <input
                    id="height"
                    type="number"
                    min="100"
                    max="220"
                    placeholder="키"
                    className={inputStyle}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <label htmlFor="weight">몸무게 *</label>
                <input
                    id="weight"
                    type="number"
                    placeholder="몸무게"
                    className={inputStyle}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <Divider />
                {/* 등록 교육 과정 */}
                <div className="my-1">갤로핑 희망 교육 과정 *</div>
                <CustomDropdown
                    placehorder="교육 과정"
                    formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col mb-3"
                    itemList={trainingCourseOptions}
                    inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                    itemStyle=""
                    func={setClassGroupName}
                    value={classGroupName}
                />

                <label htmlFor="team">소속팀</label>
                <input
                    id="team"
                    type="text"
                    placeholder="소속팀"
                    className={inputStyle}
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                />

                {/* 축구구력 */}
                <div className="mb-1">축구 구력 *</div>
                <CustomDropdown
                    placehorder="축구 구력"
                    formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col mb-3"
                    itemList={soccerHistoryOptioins}
                    inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                    itemStyle=""
                    func={setSoccerHistory}
                    value={soccerHistory}
                />
                {/* 레슨 경험 */}
                <div className="my-1">레슨 경험 *</div>
                <CustomDropdown
                    placehorder="레슨 경험"
                    formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col mb-3"
                    itemList={lessonHistoryOptions}
                    inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                    itemStyle=""
                    func={setLessonHistory}
                    value={lessonHistory}
                />
                {/* 주 발 */}
                <div className="my-1">주 발 *</div>
                <div className="relative w-full p-2 mt-1 mb-3 border border-egGrey-default">
                    <RadioButton
                        RadioBtnList={[
                            {
                                value: '오른발',
                                name: '오른발',
                            },
                            {
                                value: '왼발',
                                name: '왼발',
                            },
                        ]}
                        func={setMajorFoot}
                        defaultRadio={majorFoot}
                    />
                </div>
                <Divider />
                {/* 포지션 */}
                <div className="my-1">포지션(복수선택 가능)</div>
                <CheckboxGroup
                    options={positionOptions}
                    onChange={handleCheckboxChange}
                    defaultSelected={defaultPosition}
                />
                <div className="mt-3 text-egGrey-default">참고</div>
                <div className="w-full text-egGrey-default">
                    {positionOptions.map((option, idx) => (
                        <span>
                            {idx === positionOptions.length - 1
                                ? `${option}(${positionMatcherByEng(option)})`
                                : `${option}(${positionMatcherByEng(option)}), `}
                        </span>
                    ))}
                </div>
            </form>
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
                        func={stageSubmit}
                    />
                )}
                {registStage === 5 && (
                    <PurpleBtn
                        content={'완료'}
                        func={handleNext}
                        width="full"
                    />
                )}
            </div>
        </div>
    );
};

export default AdditionalInfo;
