// hooks
import React, { KeyboardEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilState } from 'recoil';
import { LoginAtomSelector } from 'atom/auth';
// Common
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const WebLogin = () => {
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
        <div className="w-screen h-screen bg-top bg-cover bg-login-bg z-[0] relative">
            <div className="fixed z-0 w-screen h-screen bg-black opacity-30"></div>
            <div className="relative h-screen eg-login-wrapper">
                <div className="absolute z-10 top-80 left-[-6rem]">
                    <div className="flex items-center mb-16">
                        <img
                            className="z-20 w-24 h-24 mr-4 rounded-full "
                            src={galloping_purple_logo}
                            alt="galloping_purple_logo"
                        />
                        <div className="font-bold text-7xl text-egWhite-default">GSM</div>
                    </div>
                    <div className="mb-10 text-4xl font-semibold text-egWhite-default">
                        <span className="text-egPurple-default">G</span>alloping
                        <span className="ml-2 text-egPurple-default">S</span>occer
                        <span className="ml-2 text-egPurple-default">M</span>anagement
                    </div>
                    <div className="mb-16 w-96 text-egWhite-default">
                        Galloping Soccer Management is the best management to manage elite players and coaches.
                    </div>
                    <div className="flex">
                        <div className="w-16 mr-2 border-b-4 border-egWhite-default"></div>
                        <div className="w-16 mr-2 border-b-4 border-egGrey-default"></div>
                        <div className="w-16 mr-2 border-b-4 border-egGrey-default"></div>
                    </div>
                </div>
                <div
                    onKeyDown={handleOnKeyPress}
                    className="absolute bottom-0 right-[-10rem] w-2/4 h-4/5 z-10"
                >
                    <div className="w-full h-full px-10 pt-24 bg-white rounded-2xl">
                        <div className="mb-4 font-semibold">WELCOM BACK</div>
                        <div className="mb-8">서비스 이용을 원하신다면, 로그인을 해주세요.</div>
                        <div>
                            <div className="mb-4">
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
                            // enterPress={handleOnKeyPress}
                            content="로그인"
                            width="full"
                            customStyle="py-3"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebLogin;
