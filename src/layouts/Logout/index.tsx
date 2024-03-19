// hooks
import { useLocation } from 'react-router-dom';
// Logout Components
import WebLogout from 'layouts/Logout/WebLogout';
import MobileLogout from 'layouts/Logout/MobileLogout';
import { useState, useEffect } from 'react';

const Logout = () => {
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
    return <>{mobileView ? <MobileLogout /> : <WebLogout />}</>;
};

export default Logout;
