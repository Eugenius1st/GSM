// hook
import { useState } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { IsMobileAtom } from 'atom/isMobile';
// Common
import CustomDropdown from 'components/EgMaterials/CustomDropdown';

const AdditionalInfo = () => {
    // 웹 앱 구분
    const isMobile = useRecoilValue(IsMobileAtom);
    // 데이터
    const [mainFoot, setMainFoot] = useState('주 발');
    const [soccerRecord, setSoccerRecord] = useState([{ record: '', startDate: '', endDate: '' }]);
    const inputStyle = 'w-full p-2 border border-egGrey-default mt-1 mb-3';

    return (
        <div className="max-w-lg p-2 m-auto">
            <form>
                <label htmlFor="height">키</label>
                <input
                    id="height"
                    type="number"
                    placeholder="키"
                    className={inputStyle}
                />
                <label htmlFor="weight">몸무게</label>
                <input
                    id="weight"
                    type="number"
                    placeholder="몸무게"
                    className={inputStyle}
                />
                <label htmlFor="team">소속팀</label>
                <input
                    id="team"
                    type="text"
                    placeholder="소속팀"
                    className={inputStyle}
                />

                {/* 축구구력 */}
                <div className="mb-1">축구 구력</div>
                <CustomDropdown
                    placehorder="축구 구력"
                    formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col mb-3"
                    itemList={['처음', '1년 미만', '1~3년', '3~5년', '5년 이상', '기타']}
                    inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                    itemStyle=""
                />
                {/* 레슨 경험 */}
                <div className="mb-1">레슨 경험</div>
                <CustomDropdown
                    placehorder="레슨 경험"
                    formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col mb-3"
                    itemList={['없음', '6개월 미만', '6개월~1년', '1~3년', '3~5년', '기타']}
                    inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                    itemStyle=""
                />
                {/* 포지션 */}
                <div className="mb-1">포지션</div>
                <CustomDropdown
                    placehorder="포지션"
                    formStyle="py-2 px-1 border border-egGrey-default text-egGrey-default flex flex-col mb-3"
                    itemList={[
                        'GK (골키퍼)',
                        'CB (중앙 수비수)',
                        'LWB (왼쪽 수비수)',
                        'RWB (오른쪽 수비수)',
                        'CDM (수비형 미드필더)',
                        'CAM (공격형 미드필더)',
                        'CM (중앙 미드필더)',
                        'LM (왼쪽 미드필더)',
                        'RM (오른쪽 미드필더)',
                        'ST (공격수)',
                    ]}
                    inputStyle="py-2 px-1 border border-egGrey-default text-egGrey-default"
                    itemStyle=""
                />
                {/* 주 발유진 */}
                <div className="my-1">주 발</div>
                <div className="relative mb-1">
                    <div
                        className={
                            mainFoot === '주 발'
                                ? 'w-full p-2 border text-egGrey-default border-egGrey-default'
                                : 'w-full p-2 border border-egGrey-default'
                        }
                    >
                        {mainFoot}
                    </div>
                    <div className="absolute right-0 flex justify-end top-1">
                        <div
                            onClick={() => setMainFoot('왼발')}
                            className={
                                mainFoot === '왼발'
                                    ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                    : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                            }
                        >
                            왼발
                        </div>
                        <div
                            onClick={() => setMainFoot('오른발')}
                            className={
                                mainFoot === '오른발'
                                    ? 'px-3 py-1 mr-1 border rounded-md border-egPurple-default text-egPurple-default'
                                    : 'px-3 py-1 mr-1 border rounded-md border-egGrey-default text-egGrey-default'
                            }
                        >
                            오른발
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdditionalInfo;
