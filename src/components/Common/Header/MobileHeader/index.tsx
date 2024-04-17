//hooks
import { Link, useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import { LoginStateSelector } from 'atom/auth';
// Temporary Drawer
import TemporaryDrawer from 'components/Common/Header/MobileHeader/TemporaryDrawer';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { FaUserCircle } from 'react-icons/fa';
import { VscBellDot } from 'react-icons/vsc';

// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const MobileHeader = () => {
    const loginState = useRecoilValue(LoginStateSelector);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 z-50 w-screen border-b-2 bg-egWhite-default">
            {loginState ? (
                <div>
                    {loginState === 'admin' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <TemporaryDrawer />
                            <div className="flex">
                                {/* <span className="mr-2">홍길동 님</span> */}
                                <FaUserCircle className="w-7 h-7 text-egPurple-default" />
                            </div>
                        </div>
                    ) : loginState === 'user' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <Link
                                to="/user"
                                className="flex"
                            >
                                <img
                                    src={galloping_purple_logo}
                                    alt="galloping_purple_logo"
                                    className="inline w-10 h-10 mr-2 rounded-full"
                                />
                                <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                            </Link>
                            <div className="flex items-centers">
                                <Link to="/user/alarm">
                                    <VscBellDot className="mr-2 w-7 h-7 text-egPurple-default" />
                                </Link>
                                <Link to="/user/mypage">
                                    <FaUserCircle className="w-7 h-7 text-egPurple-default" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <div className="flex items-center">
                                <img
                                    src={galloping_purple_logo}
                                    alt="galloping_purple_logo"
                                    className="inline w-10 h-10 mr-2 rounded-full"
                                />
                                <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                            </div>

                            <div>
                                <PurpleBtn
                                    content="Login"
                                    func={() => navigate('/')}
                                />
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
                                alt="galloping_purple_logo"
                                className="inline w-10 h-10 mr-2 rounded-full"
                            />
                            <h1 className="text-lg font-bold text-egPurple-default">GSM</h1>
                        </div>
                    </Link>

                    <div>
                        <PurpleBtn
                            content="Login"
                            func={() => navigate('/')}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileHeader;
