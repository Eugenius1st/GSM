// hooks
import { useLocation } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import { IsTabletSelector } from 'atom/isTablet';
// Logout Components
import WebLogout from 'layouts/Logout/WebLogout';
import MobileLogout from 'layouts/Logout/MobileLogout';
import { useState, useEffect } from 'react';

const Logout = () => {
    const location = useLocation().pathname;
    const isTablet = useRecoilValue(IsTabletSelector);
    return <>{isTablet ? <MobileLogout /> : <WebLogout />}</>;
};

export default Logout;
