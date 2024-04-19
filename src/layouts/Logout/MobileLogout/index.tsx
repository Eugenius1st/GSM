// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilState } from 'recoil';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// Common
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';

const MobileLogout = () => {
    const navigate = useNavigate();
    const [autoLogin, setAutoLogin] = useState(false);
    const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [loginState, setStateSelector] = useRecoilState(LoginStateSelector);
    const handleLogout = () => {
        setLoginSelector('initial');
        setStateSelector('initial');
        navigate('/');
    };
    return (
        <div className="eg-default-wrapper">
            <div className="w-full h-full px-10 pt-24 bg-white rounded-2xl">
                <div className="mb-4 font-semibold">SEE YOU AGAIN</div>
                <div className="mb-8 text-sm">더 좋은 서비스를 제공하는 GSM 이 되겠습니다.</div>
                <div className="mt-16">
                    <PurpleBtn
                        func={() => handleLogout()}
                        content="로그아웃"
                        width="full"
                        customStyle="py-3"
                    />
                </div>
                <div className="mt-1">
                    <WhiteBtn
                        func={() => navigate(-1)}
                        content="아니오"
                        width="full"
                        customStyle="py-3"
                    />
                </div>
            </div>
        </div>
    );
};

export default MobileLogout;
