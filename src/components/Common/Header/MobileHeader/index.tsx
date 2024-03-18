//hooks
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
// Temporary Drawer
import TemporaryDrawer from 'components/Common/Header/MobileHeader/TemporaryDrawer';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';
// icons
import { FaUserCircle } from 'react-icons/fa';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const MobileHeader = () => {
    const location = useLocation().pathname;
    const locationList = location.split('/');
    const [isLogin, setIsLogin] = useState(true);
    const curLocation = locationList[2];
    const tabActiveStyle = 'text-egPurple-default border-b-2 border-egPurple-default pb-1';

    return (
        <div className="fixed top-0 z-50 w-screen border-b-2 bg-egWhite-default">
            {isLogin ? (
                <div>
                    {locationList[1] === 'admin' ? (
                        <div className="flex items-center justify-between max-w-screen-xl p-2 m-auto ">
                            <TemporaryDrawer />
                            <div className="flex">
                                {/* <span className="mr-2">홍길동 님</span> */}
                                <FaUserCircle className="w-7 h-7 text-egPurple-default" />
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

export default MobileHeader;
