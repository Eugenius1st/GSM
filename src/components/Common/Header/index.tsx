// hooks
import { Link, useLocation } from 'react-router-dom';
// Header Components
import WebHeader from 'components/Common/Header/WebHeader';
import MobileHeader from 'components/Common/Header/MobileHeader';
import { useState, useEffect } from 'react';

const Header = () => {
    const location = useLocation().pathname;
    const [miniSideNav, setMiniSidenav] = useState(false);
    useEffect(() => {
        function handleMiniSidenav() {
            setMiniSidenav(window.innerWidth < 768);
        }
        window.addEventListener('resize', handleMiniSidenav);
        handleMiniSidenav();
        return () => window.removeEventListener('resize', handleMiniSidenav);
    }, [location]);
    return <>{miniSideNav ? <MobileHeader /> : <WebHeader />}</>;
};

export default Header;
