// recoil
import { useRecoilValue } from 'recoil';
import { IsTabletSelector } from 'atom/isTablet';
// Login Components
import WebLogin from 'layouts/Login/WebLogin';
import MobileLogin from 'layouts/Login/MobileLogin';

const Login = () => {
    const isTablet = useRecoilValue(IsTabletSelector);
    return <>{isTablet ? <MobileLogin /> : <WebLogin />}</>;
};

export default Login;
