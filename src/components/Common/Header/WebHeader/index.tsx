//hooks
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { FaUserCircle } from 'react-icons/fa';
import { VscBellDot } from 'react-icons/vsc';

// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const WebHeader = () => {
    const location = useLocation().pathname;
    const locationList = location.split('/');
    const [isLogin, setIsLogin] = useState(true);
    const tabActiveStyle = 'text-egPurple-default border-b-2 border-egPurple-default pb-1';
    const adminListItems = [
        { title: 'HOME', link: '/admin' },
        { title: '회원관리', link: '/admin/user' },
        { title: '코치관리', link: '/admin/coach' },
        { title: '수업관리', link: '/admin/class' },
        { title: '알림 및 안내', link: '/admin/notification' },
    ];
    return (
        <div className="fixed top-0 z-50 w-screen border-b-2 bg-egWhite-default">
            {isLogin ? (
                <div>
                    {locationList[1] === 'admin' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <Link to="/admin">
                                <div className="flex items-center">
                                    <img
                                        src={galloping_purple_logo}
                                        className="inline w-10 h-10 mr-2 rounded-full"
                                    />
                                    <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                                </div>
                            </Link>

                            <div>
                                <ul className="grid grid-cols-5 gap-2">
                                    {adminListItems.map((el, idx) => {
                                        const linkParts = el.link.split('/');
                                        const thirdPartOfLink = linkParts[2];
                                        return (
                                            <li key={idx}>
                                                <Link
                                                    to={el.link}
                                                    className={`${
                                                        locationList[2] === thirdPartOfLink
                                                            ? tabActiveStyle
                                                            : 'text-egBlack-semiLght'
                                                    }`}
                                                >
                                                    {el.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="flex items-centers">
                                <FaUserCircle className="w-7 h-7 text-egPurple-default" />
                                {/* <span className="mr-2">홍길동</span> */}
                            </div>
                        </div>
                    ) : locationList[1] === 'user' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <div className="flex items-center">
                                <img
                                    src={galloping_purple_logo}
                                    className="inline w-10 h-10 mr-2 rounded-full"
                                />
                                <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                            </div>

                            <div>
                                <ul className="grid grid-cols-5 gap-2">
                                    <li>
                                        <Link to="/">HOME</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/user">회원관리</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/coach">코치관리</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/class">수업관리</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin">알림 및 안내</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-centers">
                                <VscBellDot className="mr-2 w-7 h-7 text-egPurple-default" />
                                <FaUserCircle className="w-7 h-7 text-egPurple-default" />
                                {/* <span className="mr-2">홍길동</span> */}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <div className="flex items-center">
                                <img
                                    src={galloping_purple_logo}
                                    className="inline w-10 h-10 mr-2 rounded-full"
                                />
                                <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                            </div>

                            <div>
                                <WhiteBtn content="SignUp" />
                                <PurpleBtn content="Login" />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                    <Link to="/admin">
                        <div className="flex items-center">
                            <img
                                src={galloping_purple_logo}
                                className="inline w-10 h-10 mr-2 rounded-full"
                            />
                            <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                        </div>
                    </Link>

                    <div>
                        <WhiteBtn content="SignUp" />
                        <PurpleBtn content="Login" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebHeader;
