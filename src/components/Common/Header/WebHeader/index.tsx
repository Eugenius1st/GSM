//hooks
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// recoil
import { useRecoilState } from 'recoil';
import { LoginAtomSelector, LoginStateSelector } from 'atom/auth';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { FaUserCircle } from 'react-icons/fa';
import { VscBellDot } from 'react-icons/vsc';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';
// Header Components
import SubTab from 'components/Common/Header/components/SubTab';
import LoginHeader from 'components/Common/Header/components/LoginHeader';

const WebHeader = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const locationList = location.split('/');
    // const [loginAtom, setLoginSelector] = useRecoilState(LoginAtomSelector);
    const [loginState, setStateSelector] = useRecoilState(LoginStateSelector);
    const tabActiveStyle = 'text-egPurple-default border-b-2 border-egPurple-default pb-1';
    const adminListItems = [
        { title: 'HOME', link: '/admin' },
        { title: '회원관리', link: '/admin/user' },
        { title: '코치관리', link: '/admin/coach' },
        { title: '수업관리', link: '/admin/class' },
        {
            title: '사용 등록',
            link: '/admin/regist',
            subTabs: [
                { title: '관리자 등록', link: '/admin/regist' },
                { title: '회원 등록', link: '/admin/regist/user' },
            ],
        },
        { title: '알림 및 안내', link: '/admin/notification/entire' },
    ];
    const [hoveredTab, setHoveredTab] = useState('');
    const tabHoverHandler = (tab: string) => {
        if (tab === '사용 등록') {
            setHoveredTab(tab);
        } else return;
    };
    // const handleLogout = () => {
    //     setLoginSelector('initial');
    //     setStateSelector('initial');
    //     navigate('/');
    // };

    return (
        <div className="fixed top-0 z-50 w-screen border-b-2 bg-egWhite-default">
            {loginState ? (
                <div>
                    {loginState === 'admin' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <Link to="/admin">
                                <div className="flex items-center">
                                    <img
                                        src={galloping_purple_logo}
                                        alt="galloping_purple_logo"
                                        className="inline w-10 h-10 mr-2 rounded-full"
                                    />
                                    <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                                </div>
                            </Link>

                            <ul className="grid grid-cols-6 gap-2 ">
                                {adminListItems.map((el, idx) => {
                                    const linkParts = el.link.split('/');
                                    const thirdPartOfLink = linkParts[2];
                                    return (
                                        <li
                                            key={idx}
                                            onMouseOver={() => tabHoverHandler(el.title)}
                                            onMouseLeave={() => setHoveredTab('')}
                                            className="relative"
                                        >
                                            <Link
                                                to={el.link}
                                                className={`${
                                                    locationList[2] === thirdPartOfLink
                                                        ? tabActiveStyle
                                                        : 'text-egBlack-semiLight'
                                                }`}
                                            >
                                                {el.title}
                                            </Link>
                                            {hoveredTab && el.subTabs && (
                                                <div className="absolute w-full h-24">
                                                    <SubTab
                                                        tabs={el.subTabs}
                                                        func={() => tabHoverHandler(el.title)}
                                                    />
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="flex items-centers">
                                <WhiteBtn
                                    content="Logout"
                                    func={() => navigate('logout')}
                                />
                            </div>
                        </div>
                    ) : loginState === 'user' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <Link to="/user">
                                <div className="flex items-center">
                                    <img
                                        src={galloping_purple_logo}
                                        alt="galloping_purple_logo"
                                        className="inline w-10 h-10 mr-2 rounded-full"
                                    />
                                    <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                                </div>
                            </Link>
                            <div className="flex items-centers">
                                <Link to="/user/alarm">
                                    <VscBellDot className="mr-2 w-7 h-7 text-egPurple-default" />
                                </Link>
                                <Link to="/user/mypage">
                                    <FaUserCircle className="w-7 h-7 text-egPurple-default" />
                                </Link>
                                {/* <span className="mr-2">홍길동</span> */}
                            </div>
                        </div>
                    ) : (
                        <LoginHeader />
                    )}
                </div>
            ) : (
                <LoginHeader />
            )}
        </div>
    );
};

export default WebHeader;
