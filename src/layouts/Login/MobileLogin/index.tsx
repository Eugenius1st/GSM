// hooks
import React, { KeyboardEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
export interface WebLoginType {
    loginAtom: any;
    setLoginSelector: any;
}
const MobileLogin = ({ loginAtom, setLoginSelector }: WebLoginType) => {
    // const navigate = useNavigate();
    const [loginID, setLoginID] = useState('');
    const [loginPW, setLoginPW] = useState('');
    const [autoLogin, setAutoLogin] = useRecoilState(AutoLoginSelector);

    // POST 요청을 보낼 함수 정의
    const mutation = useMutation({
        mutationFn: ({ requestUrl, id, pw }: PostLoginType) => {
            return loginPost({ requestUrl: requestUrl, id: id, pw: pw, successFunc: setLoginSelector });
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
        <div className="eg-default-wrapper">
            <div
                className="w-full h-full px-10 pt-24 bg-white rounded-2xl"
                onKeyDown={handleOnKeyPress}
            >
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
                {/* <div
                    onClick={() => setAutoLogin(!autoLogin)}
                    className="flex items-center mb-2 w-fit"
                >
                    <EgCheckBox checked={autoLogin} />
                    <span>자동 로그인</span>
                </div> */}

                <WhiteBtn
                    func={() => handleSubmit()}
                    content="로그인"
                    width="full"
                    customStyle="py-3"
                />
            </div>
        </div>
    );
};

export default MobileLogin;
