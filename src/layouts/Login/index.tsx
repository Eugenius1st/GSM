// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// api
import { decode } from 'api/decode';

import { IsTabletSelector } from 'atom/isTablet';
// Login Components
import WebLogin from 'layouts/Login/WebLogin';
import MobileLogin from 'layouts/Login/MobileLogin';
import { useEffect } from 'react';

const Login = () => {
    const isTablet = useRecoilValue(IsTabletSelector);
    const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [loginState, setStateSelector] = useRecoilState(LoginStateSelector);
    let userInfo;
    useEffect(() => {
        if (loginAtom) {
            userInfo = decode(loginAtom.accessToken);
        }
    }, [loginAtom]);
    console.log(userInfo);

    return (
        <>
            {isTablet ? (
                <MobileLogin
                    loginAtom={loginAtom}
                    setLoginSelector={setLoginSelector}
                />
            ) : (
                <WebLogin
                    loginAtom={loginAtom}
                    setLoginSelector={setLoginSelector}
                />
            )}
        </>
    );
};

export default Login;
