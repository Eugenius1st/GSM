// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Commons
import EgInput from 'components/EgMaterials/EgInput';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';
import CustomBtn from 'components/Buttons/CustomBtn';
// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const WebLogout = () => {
    const navigate = useNavigate();
    const [autoLogin, setAutoLogin] = useState(false);

    return (
        <div className="w-screen h-screen bg-top bg-cover bg-login-bg z-[0] relative">
            <div className="fixed z-0 w-screen h-screen bg-black opacity-30"></div>
            <div className="relative h-screen eg-login-wrapper">
                <div className="absolute z-10 top-80 left-[-6rem]">
                    <div className="flex items-center mb-16">
                        <img
                            className="z-20 w-24 h-24 mr-4 rounded-full "
                            src={galloping_purple_logo}
                            alt="galloping_purple_logo"
                        />
                        <div className="font-bold text-7xl text-egWhite-default">GSM</div>
                    </div>
                    <div className="mb-10 text-4xl font-semibold text-egWhite-default">
                        <span className="text-egPurple-default">G</span>alloping
                        <span className="ml-2 text-egPurple-default">S</span>occer
                        <span className="ml-2 text-egPurple-default">M</span>anagement
                    </div>
                    <div className="mb-16 w-96 text-egWhite-default">
                        Galloping Soccer Management is the best management to manage elite players and coaches.
                    </div>
                    <div className="flex">
                        <div className="w-16 mr-2 border-b-4 border-egWhite-default"></div>
                        <div className="w-16 mr-2 border-b-4 border-egGrey-default"></div>
                        <div className="w-16 mr-2 border-b-4 border-egGrey-default"></div>
                    </div>
                </div>
                <div className="absolute bottom-0 right-[-10rem] w-2/4 h-4/5 z-10">
                    <div className="w-full h-full px-10 pt-24 bg-white rounded-2xl">
                        <div className="mb-4 font-semibold">SEE YOU AGAIN</div>
                        <div className="mb-8">더 좋은 서비스를 제공하는 GSM 이 되겠습니다.</div>
                        <div className="mt-16">
                            <CustomBtn
                                func={() => navigate('/')}
                                content="로그아웃"
                                customStyle="px-4 py-3 m-1 rounded-md text-egPurple-default bg-egPurple-light hover:text-egWhite-default hover:bg-egPurple-default w-full active:bg-egPurple-default active:text-egWhite-default"
                            />
                        </div>
                        <div className="mt-1">
                            <WhiteBtn
                                // func={() => navigate.goBack()}
                                content="아니오"
                                width="full"
                                customStyle="py-3"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebLogout;
