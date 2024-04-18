// hooks
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// api
import { decode } from 'api/decode';

import { IsTabletSelector } from 'atom/isTablet';
// Login Components
import WebLogin from 'layouts/Login/WebLogin';
import MobileLogin from 'layouts/Login/MobileLogin';
import { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const isTablet = useRecoilValue(IsTabletSelector);
    const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [loginState, setStateSelector] = useRecoilState(LoginStateSelector);
    const [tempUserInfo, setTempUserInfo] = useState<any>('');
    useEffect(() => {
        if (!(loginAtom === 'initial')) {
            const newUserInfo = decode(loginAtom.accessToken);
            setTempUserInfo(newUserInfo);
        }
    }, [loginAtom]);
    useEffect(() => {
        // admin 의 키값인 lv 이 tempUser에 있는 경우, admin으로
        if (tempUserInfo && tempUserInfo.lv) {
            setStateSelector('admin');
            navigate('/admin');
        } else if (tempUserInfo && !tempUserInfo.lv) {
            setStateSelector('user');
            navigate('/user');
        } else {
            return;
        }
    }, [tempUserInfo]);
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
