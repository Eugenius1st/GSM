//hooks
import { Link, useLocation } from 'react-router-dom';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';

// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const Header = () => {
    const location = useLocation().pathname;
    const locationList = location.split('/');
    const curLocation = locationList[2];
    return (
        <div className="fixed top-0 z-50 w-screen border-b-2 bg-egWhite-default">
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
                            <li>
                                <Link
                                    to="/admin"
                                    className={`${!curLocation && 'text-egPurple-default'}`}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/user"
                                    className={`${curLocation === 'user' && 'text-egPurple-default'}`}
                                >
                                    회원관리
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/coach"
                                    className={`${curLocation === 'coach' && 'text-egPurple-default'}`}
                                >
                                    코치관리
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/class"
                                    className={`${curLocation === 'class' && 'text-egPurple-default'}`}
                                >
                                    수업관리
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/notification"
                                    className={`${curLocation === 'notification' && 'text-egPurple-default'}`}
                                >
                                    알림 및 안내
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <WhiteBtn content="SignUp" />
                        <PurpleBtn content="Login" />
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
                    <div>
                        <WhiteBtn content="SignUp" />
                        <PurpleBtn content="Login" />
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
    );
};

export default Header;
