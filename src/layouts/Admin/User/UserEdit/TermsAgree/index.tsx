// hooks
import { useEffect, useState } from 'react';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
// Common
import EgCheckBox from 'components/EgMaterials/CheckBox';
import Divideline from 'components/Common/Divideline';
import Divider from 'components/Common/Divider';
interface handleState {
    registStage: number;
    handleNext: () => void;
    handlePreview?: () => void;
    termsAgreeData: any;
    setTermsAgreeData: (data: any) => void;
}

const TermsAgree = ({ registStage, handleNext, handlePreview, termsAgreeData, setTermsAgreeData }: handleState) => {
    const [allState, setAllState] = useState(false);
    const [personalAgree, setPersonalAgree] = useState(false);
    const [usageAgree, setUsageAgree] = useState(false);
    const [marketingAgree, setMarketingAgree] = useState(false);
    const [infoAgree, setInfoAgree] = useState(false);

    function handleAllState() {
        setAllState(!allState);
        setPersonalAgree(!allState);
        setUsageAgree(!allState);
        setMarketingAgree(!allState);
        setInfoAgree(!allState);
    }
    function stageSubmit() {
        if (personalAgree && usageAgree) {
            const termsAgreeData = {
                personalAgree: personalAgree,
                usageAgree: usageAgree,
                marketingAgree: marketingAgree,
                infoAgree: infoAgree,
            };
            setTermsAgreeData(termsAgreeData);
            handleNext();
        } else {
            alert('필수항목에 동의해주세요');
        }
    }
    useEffect(() => {
        if (termsAgreeData) {
            setPersonalAgree(termsAgreeData.personalAgree);
            setUsageAgree(termsAgreeData.usageAgree);
            setMarketingAgree(termsAgreeData.marketingAgree);
            setInfoAgree(termsAgreeData.infoAgree);
        }
    }, []);
    return (
        <div>
            <div
                onClick={handleAllState}
                className="flex items-center"
            >
                <EgCheckBox checked={allState} />
                <div>전체 동의</div>
            </div>
            <Divideline />
            <div
                onClick={() => setPersonalAgree(!personalAgree)}
                className="flex items-center"
            >
                <EgCheckBox checked={personalAgree} />
                <div>개인정보 이용 동의 (필수)</div>
            </div>
            <div className="h-32 p-2 m-2 overflow-y-auto border rounded-lg border-egPurple-light">
                <div className="font-bold">약관 제목</div>
                <br />
                <div>
                    I'm so sorry but I love you 다 거짓말이야 몰랐어 이제야 알았어 네가 필요해 I'm so sorry but I love
                    you 날카로운 말 홧김에 나도 모르게 널 떠나보냈지만 I'm so sorry but I love you 다 거짓말이
                </div>
                <br />

                <div className="font-bold">1조 1항</div>
                <br />
                <div>
                    I'm so sorry but I love you 다 거짓말이야 몰랐어 이제야 알았어 네가 필요해 I'm so sorry but I love
                    you 날카로운 말 홧김에 나도 모르게 널 떠나보냈지만 I'm so sorry but I love you 다 거짓말이
                </div>
            </div>
            <div
                onClick={() => setUsageAgree(!usageAgree)}
                className="flex items-center"
            >
                <EgCheckBox checked={usageAgree} />
                <div>갤로핑싸커 GSM 이용약관 (필수)</div>
            </div>
            <div className="h-32 p-2 m-2 overflow-y-auto border rounded-lg border-egPurple-light">
                <div className="font-bold">약관 제목</div>
                <br />
                <div>
                    I'm so sorry but I love you 다 거짓말이야 몰랐어 이제야 알았어 네가 필요해 I'm so sorry but I love
                    you 날카로운 말 홧김에 나도 모르게 널 떠나보냈지만 I'm so sorry but I love you 다 거짓말이
                </div>
                <br />

                <div className="font-bold">1조 1항</div>
                <br />
                <div>
                    I'm so sorry but I love you 다 거짓말이야 몰랐어 이제야 알았어 네가 필요해 I'm so sorry but I love
                    you 날카로운 말 홧김에 나도 모르게 널 떠나보냈지만 I'm so sorry but I love you 다 거짓말이
                </div>
            </div>
            <div
                onClick={() => setMarketingAgree(!marketingAgree)}
                className="flex items-center"
            >
                <EgCheckBox checked={marketingAgree} />
                <div>마케팅 활용 동의 (선택)</div>
            </div>
            <div
                onClick={() => setInfoAgree(!infoAgree)}
                className="flex items-center"
            >
                <EgCheckBox checked={infoAgree} />
                <div>광고성 정보 수신 동의 (선택)</div>
            </div>

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

export default TermsAgree;
