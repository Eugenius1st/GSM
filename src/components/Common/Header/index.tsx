// hooks
import { Link, useLocation } from 'react-router-dom';
// recoil
import { useRecoilState } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
import { IsTabletSelector } from 'atom/isTablet';

// Header Components
import WebHeader from 'components/Common/Header/WebHeader';
import MobileHeader from 'components/Common/Header/MobileHeader';
import { useEffect } from 'react';

const Header = () => {
    const location = useLocation().pathname;
    const [isMobile, setIsMobile] = useRecoilState<boolean>(IsMobileSelector);
    const [, setIsTablet] = useRecoilState<boolean>(IsTabletSelector);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth < 1400);
        }
        window.scrollTo(0, 0);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [location]);
    return <>{isMobile ? <MobileHeader /> : <WebHeader />}</>;
};

export default Header;
