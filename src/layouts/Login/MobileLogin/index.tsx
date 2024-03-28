// hooks
import React, { KeyboardEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilState } from 'recoil';
import { LoginAtomSelector } from 'atom/auth';
// Commons
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';

const MobileLogin = () => {
    const navigate = useNavigate();
    const [loginState, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [loginID, setLoginID] = useState('');
    const [loginPW, setLoginPW] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const loginHandler = (ID: string, PW: string) => {
        if (ID === 'user' && PW === '1111') {
            setLoginSelector('user');
            navigate('/user');
        } else if (ID === 'admin' && PW === '1111') {
            setLoginSelector('admin');
            navigate('/admin');
        } else {
            alert('아이디, 비밀번호를 확인하세요');
        }
    };
    const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            loginHandler(loginID, loginPW); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };
    return (
        <div className="eg-default-wrapper">
            <div className="w-full h-full px-10 pt-24 bg-white rounded-2xl">
                <div className="mb-4 font-semibold">WELCOM BACK</div>
                <div className="mb-8 text-sm">서비스 이용을 원하신다면, 로그인을 해주세요.</div>
                <div>
                    <div className="mb-4 ">
                        <EgInput
                            label="ID"
                            type="id"
                            placeholder="ID"
                            func={setLoginID}
                        />
                    </div>
                    <div className="mb-4">
                        <EgInput
                            label="PASSWORD"
                            type="password"
                            placeholder="PASSWORD"
                            func={setLoginPW}
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
                    func={() => loginHandler(loginID, loginPW)}
                    content="로그인"
                    width="full"
                    customStyle="py-3"
                />
            </div>
        </div>
    );
};

export default MobileLogin;
