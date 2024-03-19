// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Commons
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';

const MobileLogout = () => {
    const navigate = useNavigate();
    const [autoLogin, setAutoLogin] = useState(false);
    return (
        <div className="eg-admin-wrapper">
            <div className="w-full h-full px-10 pt-24 bg-white rounded-2xl">
                <div className="mb-4 font-semibold">SEE YOU AGAIN</div>
                <div className="mb-8 text-sm">더 좋은 서비스를 제공하는 GSM 이 되겠습니다.</div>
                <div className="mt-16">
                    <PurpleBtn
                        func={() => navigate('/')}
                        content="로그아웃"
                        width="full"
                        style="py-3"
                    />
                </div>
                <div className="mt-1">
                    <WhiteBtn
                        // func={() => navigate.goBack()}
                        content="아니오"
                        width="full"
                        style="py-3"
                    />
                </div>
            </div>
        </div>
    );
};

export default MobileLogout;
