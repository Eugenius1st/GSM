// hooks
import { useLocation } from 'react-router-dom';
// Login Components
import WebLogin from 'layouts/Login/WebLogin';
import MobileLogin from 'layouts/Login/MobileLogin';
import { useState, useEffect } from 'react';

const Login = () => {
    const location = useLocation().pathname;
    const [mobileView, setMobileView] = useState(false);
    useEffect(() => {
        function handleMobileView() {
            setMobileView(window.innerWidth < 1400);
        }
        window.addEventListener('resize', handleMobileView);
        handleMobileView();
        return () => window.removeEventListener('resize', handleMobileView);
    }, [location]);
    return <>{mobileView ? <MobileLogin /> : <WebLogin />}</>;
};

export default Login;
