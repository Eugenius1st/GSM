// hooks
import { useState } from 'react';
// Commons
import EgCheckBox from 'components/EgMaterials/CheckBox';
import Divideline from 'components/Common/Divideline';
import Divider from 'components/Common/Divider';
const TermsAgree = () => {
    const [allState, setAllState] = useState(false);
    function handleAllState() {
        setAllState(!allState);
    }
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
                onClick={handleAllState}
                className="flex items-center"
            >
                <EgCheckBox checked={allState} />
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
                onClick={handleAllState}
                className="flex items-center"
            >
                <EgCheckBox checked={allState} />
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
                onClick={handleAllState}
                className="flex items-center"
            >
                <EgCheckBox checked={allState} />
                <div>마케팅 활용 동의 (선택)</div>
            </div>
            <div
                onClick={handleAllState}
                className="flex items-center"
            >
                <EgCheckBox checked={allState} />
                <div>광고성 정보 수신 동의 (선택)</div>
            </div>
            <Divider />
        </div>
    );
};

export default TermsAgree;
