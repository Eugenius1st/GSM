// hooks
import React, { KeyboardEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// recoil
import { AutoLoginSelector } from 'atom/auth';
import { useRecoilState } from 'recoil';
// api
import { loginPost, PostLoginType } from 'api/login';
// Common
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

export interface WebLoginType {
    loginAtom: any;
    setLoginSelector: any;
}

const WebLogin = ({ loginAtom, setLoginSelector }: WebLoginType) => {
    // const navigate = useNavigate();
    const [loginID, setLoginID] = useState('');
    const [loginPW, setLoginPW] = useState('');
    const [autoLogin, setAutoLogin] = useRecoilState(AutoLoginSelector);
    // POST 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, id, pw }: PostLoginType) => {
            return loginPost({
                requestUrl: requestUrl,
                id: id,
                pw: pw,
                successFunc: setLoginSelector,
            });
        },
    });
    const handleSubmit = () => {
        // POST 요청에 보낼 데이터
        mutation.mutate({
            requestUrl: '/auth/login',
            id: loginID,
            pw: loginPW,
            successFunc: setLoginSelector,
        });
    };
    const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
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
                        {/* <div
              onClick={() => setAutoLogin(!autoLogin)}
              className="flex items-center mb-2 w-fit"
            >
              <EgCheckBox checked={autoLogin} />
              <span>자동 로그인</span>
            </div> */}

                        <WhiteBtn
                            func={() => handleSubmit()}
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
