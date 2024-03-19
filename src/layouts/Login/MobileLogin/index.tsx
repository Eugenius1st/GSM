// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Commons
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';

const MobileLogin = () => {
    const navigate = useNavigate();
    const [autoLogin, setAutoLogin] = useState(false);
    return (
        <div className="eg-admin-wrapper">
            <div className="w-full h-full px-10 pt-24 bg-white rounded-2xl">
                <div className="mb-4 font-semibold">WELCOM BACK</div>
                <div className="mb-8 text-sm">서비스 이용을 원하신다면, 로그인을 해주세요.</div>
                <div>
                    <div className="mb-4 ">
                        <EgInput
                            label="ID"
                            placeholder="ID"
                        />
                    </div>
                    <div className="mb-4">
                        <EgInput
                            label="PASSWORD"
                            placeholder="PASSWORD"
                        />
                    </div>
                </div>
                <div
                    onClick={() => setAutoLogin(!autoLogin)}
                    className="flex items-center mb-2 w-fit"
                >
                    <EgCheckBox checked={autoLogin} />
                    <span>자동 로그인</span>
                </div>

                <WhiteBtn
                    func={() => navigate('/admin')}
                    content="로그인"
                    width="full"
                    style="py-3"
                />
            </div>
        </div>
    );
};

export default MobileLogin;
