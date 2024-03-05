//hooks
import { Link } from 'react-router-dom';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
import WhiteBtn from 'components/Buttons/WhiteBtn';

// images
import galloping_purple_logo from 'assets/logo/galloping_purple_logo.jpg';

const Header = () => {
    return (
        <div className="fixed top-0 flex justify-center w-screen border border-b-2 bg-egWhite-default border-egBlack-light">
            <head className="flex items-center justify-between w-8/12 p-2 ">
                <div>
                    <img
                        src={galloping_purple_logo}
                        className="inline w-10 h-10 mr-2 rounded-full"
                    />
                    <span className="text-lg font-bold">GSM</span>
                </div>

                <div>
                    <ul className="grid grid-cols-5 gap-2">
                        <li>
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/admin/user-management">회원관리</Link>
                        </li>
                        <li>
                            <Link to="/admin/coach-management">코치관리</Link>
                        </li>
                        <li>
                            <Link to="/admin">수업관리</Link>
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
            </head>
        </div>
    );
};

export default Header;
